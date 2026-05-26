import { Router } from 'express'
import { uploadImage, getGallery } from '../controllers/images.controller.js'
import { authenticate } from '../middleware/auth.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
})

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

const router = Router()
router.post('/upload', authenticate, upload.single('image'), uploadImage)
router.get('/gallery', getGallery)

export default router