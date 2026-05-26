// src/routes/horarios.routes.js
import { Router } from 'express'
import { getHorarios, upsertHorario, seedHorarios } from '../controllers/horarios.controller.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()
router.get('/', getHorarios)
router.put('/:id', authenticate, requireAdmin, upsertHorario)
router.post('/seed', authenticate, requireAdmin, seedHorarios)
export default router
