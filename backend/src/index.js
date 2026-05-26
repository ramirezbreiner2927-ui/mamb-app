// src/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import eventosRoutes from './routes/eventos.routes.js'
import horariosRoutes from './routes/horarios.routes.js'
import productosRoutes from './routes/productos.routes.js'
import imagesRoutes from './routes/images.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/eventos', eventosRoutes)
app.use('/api/horarios', horariosRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/images', imagesRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', museum: 'MAMB Barranquilla', timestamp: new Date() })
})

// Error handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🏛️  MAMB API running on http://localhost:${PORT}`)
})
