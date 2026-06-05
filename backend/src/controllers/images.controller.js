import { PrismaClient } from '@prisma/client'
import { uploadToR2 } from '../lib/r2.js'

const prisma = new PrismaClient()
const CF_BASE = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run`

async function describeDrawing(imageBuffer) {
  const url = new URL(`${CF_BASE}/@cf/llava-hf/llava-1.5-7b-hf`)
  url.searchParams.set('prompt', "Describe in one sentence what the main subject of this child's drawing is.")
  url.searchParams.set('max_tokens', '100')

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CF_TOKEN}`,
      'Content-Type': 'image/jpeg',
    },
    body: imageBuffer,
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`LLaVA error ${response.status}: ${err}`)
  }

  const data = await response.json()
  return data?.result?.description || data?.result?.response || ''
}

async function generateArtFromDescription(description, artworkName) {
  const subject = description ? `based on a child's drawing of: ${description}` : 'a colorful scene'
  const titlePart = artworkName ? `, titled "${artworkName}"` : ''
  const prompt = `Colombian Caribbean expressionist painting${titlePart}, ${subject}. Warm tropical colors, bold brushstrokes in the style of Alvaro Cepeda Samudio, vibrant oranges yellows and reds, folk art from Barranquilla, museum quality, colorful and joyful`

  const response = await fetch(`${CF_BASE}/@cf/stabilityai/stable-diffusion-xl-base-1.0`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, num_steps: 20, guidance: 7.5, width: 1024, height: 1024 }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Cloudflare SD error ${response.status}: ${err}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió imagen' })

    const { artworkName, authorName, authorAge } = req.body

    // Subir imagen original a R2
    const originalFilename = `originals/${Date.now()}_${req.file.originalname}`
    const originalUrl = await uploadToR2(req.file.buffer, originalFilename, req.file.mimetype)

    let generatedUrl = null
    try {
      console.log('🔍 Analizando dibujo con LLaVA...')
      const description = await describeDrawing(req.file.buffer)
      console.log('📝 LLaVA describió:', description)

      console.log('🎨 Generando imagen artística...')
      const generatedBuffer = await generateArtFromDescription(description, artworkName)
      
      // Subir imagen generada a R2
      const generatedFilename = `generated/${Date.now()}.png`
      generatedUrl = await uploadToR2(generatedBuffer, generatedFilename, 'image/png')
      console.log('✅ Imagen generada:', generatedUrl)
    } catch (aiErr) {
      console.error('Error IA:', aiErr.message)
    }

    const image = await prisma.image.create({
      data: {
        userId: req.user.id,
        originalUrl,
        generatedUrl,
        artworkName: artworkName || null,
        authorName: authorName || null,
        authorAge: authorAge ? parseInt(authorAge) : null,
        isPublic: true,
      }
    })

    res.status(201).json(image)
  } catch (err) { next(err) }
}

export async function getGallery(req, res, next) {
  try {
    const images = await prisma.image.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        originalUrl: true,
        generatedUrl: true,
        artworkName: true,
        authorName: true,
        authorAge: true,
        createdAt: true,
      }
    })
    res.json(images)
  } catch (err) { next(err) }
}
