import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'
import './config/dotenv.js'

// Import routes
import eventsRouter from './routes/events.js'
import locationsRouter from './routes/locations.js'

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve(__dirname, '..', 'client', 'public', 'party.png')))
} else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve(__dirname, 'public', 'party.png')))
    app.use(express.static('public'))
}

// API routes
app.use('/api/events', eventsRouter)
app.use('/api/locations', locationsRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})