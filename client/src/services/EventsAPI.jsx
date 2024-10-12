import axios from 'axios';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const EventsAPI = {
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw error;
    }
  },

  getEventsByLocation: async (locationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/location/${locationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events for location ${locationId}:`, error);
      throw error;
    }
  },

  getEventById: async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${eventId}:`, error);
      throw error;
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${eventId}:`, error);
      throw error;
    }
  },

  deleteEvent: async (eventId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error);
      throw error;
    }
  }
};

export default EventsAPI;