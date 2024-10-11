import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'


const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className='events-page'>
            <h1>Upcoming Events</h1>
            <div className='events-list'>
                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            id={event.id}
                        />
                    ))
                ) : (
                    <p>No events scheduled at this time.</p>
                )}
            </div>
        </div>
    )
}

export default Events