import express from 'express'
import itemsRouter from './entities/items/router.js'
import {errorHandler, notFound} from './errors.js'

export const app = express()

// 1. Logger
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

// 2. Parser de JSON
app.use(express.json())

// 3. Rotas
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date() })
})

app.use('/api/items', itemsRouter)

// 4. Fallback 404 em JSON 
app.use((req, res, next) => next(notFound(`no route for ${req.method} ${req.originalUrl}`)))
app.use(errorHandler)
