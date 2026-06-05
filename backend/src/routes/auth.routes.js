// src/routes/auth.routes.js
import { Router } from 'express'
import { login, anonymousRegister, me } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// Solo login (para admin) y registro anónimo (para visitantes kids)
router.post('/login', login)
router.post('/anonymous', anonymousRegister)   // ← nuevo endpoint
router.get('/me', authenticate, me)

export default router
