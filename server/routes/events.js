import express from 'express'
import { getAllEvents, getEventsByLocation, getEventById } from '../controllers/events.js'

const router = express.Router()

router.get('/', getAllEvents)
router.get('/location/:locationId', getEventsByLocation)
router.get('/:id', getEventById)

export default router