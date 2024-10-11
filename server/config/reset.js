import { pool } from './database.js'

const createLocationsTable = `
    CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        zip VARCHAR(20) NOT NULL,
        image VARCHAR(255)
    )
`

const createEventsTable = `
    CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        location_id INTEGER REFERENCES locations(id),
        image VARCHAR(255)
    )
`

async function resetDatabase() {
    try {
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)
        console.log('Database tables created successfully')
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        await pool.end()
    }
}

resetDatabase()