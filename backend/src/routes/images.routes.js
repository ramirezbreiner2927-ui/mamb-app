import { Router } from 'express'
import { uploadImage, getGallery } from '../controllers/images.controller.js'
import { authenticate } from '../middleware/auth.js'
import multer from 'multer'

const upload = multer({ 
  storage: multer.memoryStorage(), 
  limits: { fileSize: 10 * 1024 * 1024 } 
})

const router = Router()
router.post('/upload', authenticate, upload.single('image'), uploadImage)
router.get('/gallery', getGallery)
export default router
