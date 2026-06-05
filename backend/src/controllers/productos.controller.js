// src/controllers/productos.controller.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getProductos = async (req, res, next) => {
  try {
    const { category } = req.query
    const where = { isActive: true }
    if (category) where.category = category
    const productos = await prisma.producto.findMany({ where, orderBy: { name: 'asc' } })
    res.json(productos)
  } catch (err) { next(err) }
}

export const getProducto = async (req, res, next) => {
  try {
    const p = await prisma.producto.findUnique({ where: { id: Number(req.params.id) } })
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(p)
  } catch (err) { next(err) }
}

export const createProducto = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'name, price y category son requeridos' })
    }
    const p = await prisma.producto.create({
      data: { name, description, price: Number(price), stock: Number(stock || 0), category, imageUrl }
    })
    res.status(201).json(p)
  } catch (err) { next(err) }
}

export const updateProducto = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = { ...req.body }
    if (data.price) data.price = Number(data.price)
    if (data.stock !== undefined) data.stock = Number(data.stock)
    const p = await prisma.producto.update({ where: { id }, data })
    res.json(p)
  } catch (err) { next(err) }
}

export const deleteProducto = async (req, res, next) => {
  try {
    await prisma.producto.update({
      where: { id: Number(req.params.id) },
      data: { isActive: false }
    })
    res.json({ message: 'Producto desactivado' })
  } catch (err) { next(err) }
}
