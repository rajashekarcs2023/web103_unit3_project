import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const LocationsAPI = {
  getAllLocations: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/locations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all locations:', error);
      throw error;
    }
  },

  getLocationById: async (locationId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/locations/${locationId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location ${locationId}:`, error);
      throw error;
    }
  }
};

export default LocationsAPI;