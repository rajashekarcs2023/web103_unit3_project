import { pool } from './database.js'
import './dotenv.js'

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

const locationsData = [
    {
        name: 'Echo Lounge',
        address: '551 Flat Shoals Ave SE',
        city: 'Atlanta',
        state: 'GA',
        zip: '30316',
        image: 'https://example.com/echo_lounge.jpg'
    },
    {
        name: 'House of Blues',
        address: '329 N Dearborn St',
        city: 'Chicago',
        state: 'IL',
        zip: '60654',
        image: 'https://example.com/house_of_blues.jpg'
    },
    {
        name: 'The Pavilion',
        address: '1126 Queens Hwy',
        city: 'Long Beach',
        state: 'CA',
        zip: '90802',
        image: 'https://example.com/pavilion.jpg'
    },
    {
        name: 'American Airlines Arena',
        address: '601 Biscayne Blvd',
        city: 'Miami',
        state: 'FL',
        zip: '33132',
        image: 'https://example.com/aa_arena.jpg'
    }
]

const eventsData = [
    {
        title: 'Rock Concert',
        date: '2023-08-15',
        time: '20:00:00',
        location_id: 1,
        image: 'https://example.com/rock_concert.jpg'
    },
    {
        title: 'Jazz Night',
        date: '2023-09-01',
        time: '19:30:00',
        location_id: 2,
        image: 'https://example.com/jazz_night.jpg'
    },
    {
        title: 'EDM Festival',
        date: '2023-09-15',
        time: '18:00:00',
        location_id: 3,
        image: 'https://example.com/edm_festival.jpg'
    },
    {
        title: 'Pop Extravaganza',
        date: '2023-10-01',
        time: '19:00:00',
        location_id: 4,
        image: 'https://example.com/pop_extravaganza.jpg'
    }
]



async function insertLocations() {
    for (const location of locationsData) {
        try {
            const result = await pool.query(
                `INSERT INTO locations (name, address, city, state, zip, image)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (name) DO NOTHING
                RETURNING id`,
                [location.name, location.address, location.city, location.state, location.zip, location.image]
            )
            console.log(`Inserted location: ${location.name}`, result.rows[0])
        } catch (error) {
            console.error(`Error inserting location ${location.name}:`, error)
        }
    }
    console.log('Locations data insertion attempt completed')
}

async function insertEvents() {
    for (const event of eventsData) {
        try {
            const result = await pool.query(
                `INSERT INTO events (title, date, time, location_id, image)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (title, date) DO NOTHING
                RETURNING id`,
                [event.title, event.date, event.time, event.location_id, event.image]
            )
            console.log(`Inserted event: ${event.title}`, result.rows[0])
        } catch (error) {
            console.error(`Error inserting event ${event.title}:`, error)
        }
    }
    console.log('Events data insertion attempt completed')
}

async function verifyData() {
    const locationCount = await pool.query('SELECT COUNT(*) FROM locations')
    const eventCount = await pool.query('SELECT COUNT(*) FROM events')
    console.log(`Locations in database: ${locationCount.rows[0].count}`)
    console.log(`Events in database: ${eventCount.rows[0].count}`)
}

async function resetDatabase() {
    try {
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)
        console.log('Database tables created successfully')

        await insertLocations()
        await insertEvents()
        await verifyData()
    } catch (error) {
        console.error('Error resetting database:', error)
    } finally {
        await pool.end()
    }
}