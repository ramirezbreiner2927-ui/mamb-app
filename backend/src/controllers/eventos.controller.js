// src/controllers/eventos.controller.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getEventos = async (req, res, next) => {
  try {
    const { type, from, to } = req.query
    const where = { isActive: true }
    if (type) where.type = type
    if (from || to) {
      where.date = {}
      if (from) where.date.gte = new Date(from)
      if (to) where.date.lte = new Date(to)
    }
    const eventos = await prisma.evento.findMany({
      where,
      orderBy: { date: 'asc' }
    })
    res.json(eventos)
  } catch (err) { next(err) }
}

export const getEvento = async (req, res, next) => {
  try {
    const evento = await prisma.evento.findUnique({
      where: { id: Number(req.params.id) }
    })
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' })
    res.json(evento)
  } catch (err) { next(err) }
}

export const createEvento = async (req, res, next) => {
  try {
    const { title, description, date, type, recurrence, price, capacity, imageUrl } = req.body
    if (!title || !date || !type) {
      return res.status(400).json({ error: 'title, date y type son requeridos' })
    }
    const evento = await prisma.evento.create({
      data: { title, description, date: new Date(date), type, recurrence, price, capacity, imageUrl }
    })
    res.status(201).json(evento)
  } catch (err) { next(err) }
}

export const updateEvento = async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const data = { ...req.body }
    if (data.date) data.date = new Date(data.date)
    const evento = await prisma.evento.update({ where: { id }, data })
    res.json(evento)
  } catch (err) { next(err) }
}

export const deleteEvento = async (req, res, next) => {
  try {
    await prisma.evento.update({
      where: { id: Number(req.params.id) },
      data: { isActive: false }
    })
    res.json({ message: 'Evento desactivado correctamente' })
  } catch (err) { next(err) }
}
