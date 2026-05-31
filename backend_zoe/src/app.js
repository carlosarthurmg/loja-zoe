import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import favoriteRoutes from './routes/favorites.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/favorites', favoriteRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Loja Zoe funcionando! ✦' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})