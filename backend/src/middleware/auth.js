// src/middleware/auth.js
import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Solo administradores' })
  }
  next()
}
