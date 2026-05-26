// src/routes/productos.routes.js
import { Router } from 'express'
import { getProductos, getProducto, createProducto, updateProducto, deleteProducto } from '../controllers/productos.controller.js'
import { authenticate, requireAdmin } from '../middleware/auth.js'

const router = Router()
router.get('/', getProductos)
router.get('/:id', getProducto)
router.post('/', authenticate, requireAdmin, createProducto)
router.put('/:id', authenticate, requireAdmin, updateProducto)
router.delete('/:id', authenticate, requireAdmin, deleteProducto)
export default router
