// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

// ─── Login admin (solo para administradores) ──────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' })
    }
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' })

    const token = signToken(user)
    const { password: _, ...safeUser } = user
    res.json({ user: safeUser, token })
  } catch (err) { next(err) }
}

// ─── Registro anónimo para niños (sin email ni contraseña) ───────────────
// Crea un "visitante" temporal identificado solo por nombre y edad.
// Retorna un token JWT de corta duración (24h) para que pueda subir imágenes.
export const anonymousRegister = async (req, res, next) => {
  try {
    const { name, age } = req.body
    if (!name) {
      return res.status(400).json({ error: 'El nombre es requerido' })
    }

    // Generamos un email interno único para no violar el UNIQUE constraint
    const internalEmail = `anon_${Date.now()}_${Math.random().toString(36).slice(2)}@mamb.local`
    const internalPassword = await bcrypt.hash(Math.random().toString(36), 8)

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: internalEmail,
        password: internalPassword,
        role: 'USER',
        // Guardamos la edad en metadata si quieres agregarla luego al schema
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })

    // Token de 24 horas para visitantes
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name, isAnon: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(201).json({
      user: { ...user, isAnon: true, age: age || null },
      token
    })
  } catch (err) { next(err) }
}

// ─── Me (perfil del usuario autenticado) ─────────────────────────────────
export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    })
    res.json(user)
  } catch (err) { next(err) }
}
