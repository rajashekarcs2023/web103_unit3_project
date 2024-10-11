import { pool } from '../config/database.js'

export const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getLocationById = async (req, res) => {
    const locationId = req.params.id
    try {
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId])
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Location not found' })
        } else {
            res.json(result.rows[0])
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}