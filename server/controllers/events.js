import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventsByLocation = async (req, res) => {
    const locationId = req.params.locationId
    try {
        const result = await pool.query('SELECT * FROM events WHERE location_id = $1', [locationId])
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    const eventId = req.params.id
    try {
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [eventId])
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Event not found' })
        } else {
            res.json(result.rows[0])
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}