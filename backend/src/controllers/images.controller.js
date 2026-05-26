import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

const CF_BASE = `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run`

// Paso 1: LLaVA describe el dibujo — imagen enviada como binario raw
async function describeDrawing(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath)

  // Según la doc oficial: el body puede ser directamente el binario de la imagen
  // con Content-Type del tipo de imagen. El prompt va como query param.
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

// Paso 2: Cloudflare genera la imagen artística con esa descripción
async function generateArtFromDescription(description, artworkName) {
  const subject = description
    ? `based on a child's drawing of: ${description}`
    : 'a colorful scene'

  const titlePart = artworkName ? `, titled "${artworkName}"` : ''

  const prompt = `Colombian Caribbean expressionist painting${titlePart}, ${subject}. Warm tropical colors, bold brushstrokes in the style of Alvaro Cepeda Samudio, vibrant oranges yellows and reds, folk art from Barranquilla, museum quality, colorful and joyful`

  const response = await fetch(`${CF_BASE}/@cf/stabilityai/stable-diffusion-xl-base-1.0`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CF_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      num_steps: 20,
      guidance: 7.5,
      width: 1024,
      height: 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Cloudflare SD error ${response.status}: ${err}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const outputName = `generated_${Date.now()}.png`
  fs.writeFileSync(path.join('uploads', outputName), buffer)
  return outputName
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió imagen' })

    const { artworkName, authorName, authorAge } = req.body
    const originalUrl = `/uploads/${req.file.filename}`

    let generatedUrl = null
    try {
      console.log('🔍 Analizando dibujo con LLaVA...')
      const description = await describeDrawing(req.file.path)
      console.log('📝 LLaVA describió:', description)

      console.log('🎨 Generando imagen artística...')
      const generatedFilename = await generateArtFromDescription(description, artworkName)
      generatedUrl = `/uploads/${generatedFilename}`
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