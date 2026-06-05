// src/controllers/horarios.controller.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getHorarios = async (req, res, next) => {
  try {
    const horarios = await prisma.horario.findMany({ orderBy: { dayOrder: 'asc' } })
    res.json(horarios)
  } catch (err) { next(err) }
}

export const upsertHorario = async (req, res, next) => {
  try {
    const { day, dayOrder, openTime, closeTime, isClosed, basePrice } = req.body
    const horario = await prisma.horario.upsert({
      where: { id: Number(req.params.id || 0) },
      update: { openTime, closeTime, isClosed, basePrice },
      create: { day, dayOrder, openTime, closeTime, isClosed: isClosed || false, basePrice: basePrice || 10000 }
    })
    res.json(horario)
  } catch (err) { next(err) }
}

export const seedHorarios = async (req, res, next) => {
  try {
    const dias = [
      { day: 'Lunes', dayOrder: 1, openTime: '09:00', closeTime: '17:00', isClosed: false },
      { day: 'Martes', dayOrder: 2, openTime: '09:00', closeTime: '17:00', isClosed: false },
      { day: 'Miércoles', dayOrder: 3, openTime: '09:00', closeTime: '17:00', isClosed: false },
      { day: 'Jueves', dayOrder: 4, openTime: '09:00', closeTime: '17:00', isClosed: false },
      { day: 'Viernes', dayOrder: 5, openTime: '09:00', closeTime: '19:00', isClosed: false },
      { day: 'Sábado', dayOrder: 6, openTime: '10:00', closeTime: '18:00', isClosed: false },
      { day: 'Domingo', dayOrder: 7, openTime: '10:00', closeTime: '14:00', isClosed: false },
    ]
    await prisma.horario.createMany({ data: dias, skipDuplicates: true })
    res.json({ message: 'Horarios inicializados' })
  } catch (err) { next(err) }
}
