// src/routes/eventos.routes.js
import { Router } from 'express'
import { getEventos, getEvento, createEvento, updateEvento, deleteEvento } from '../controllers/eventos.controller.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()
router.get('/', getEventos)
router.get('/:id', getEvento)
router.post('/', authenticate, requireAdmin, createEvento)
router.put('/:id', authenticate, requireAdmin, updateEvento)
router.delete('/:id', authenticate, requireAdmin, deleteEvento)
export default router
