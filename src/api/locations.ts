import { mockLocations } from '../data/mockLocations';

// Base API configuration
const API_BASE_URL = '/api'; // This would be your real API base URL

// Simulated API delay (remove in production)
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * GET /api/locations/search
 * Search locations by query string
 */
export const searchLocationsAPI = async (query: string): Promise<string[]> => {
  console.log('🔍 API Call: GET /api/locations/search', {
    endpoint: `${API_BASE_URL}/locations/search`,
    params: { query },
    timestamp: new Date().toISOString(),
  });

  try {
    // Simulate API delay
    await simulateDelay(300);

    // Mock implementation - filter locations
    const results = mockLocations.filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);

    console.log('✅ API Response: GET /api/locations/search', {
      resultsCount: results.length,
      results: results.slice(0, 3), // Log first 3 for brevity
      timestamp: new Date().toISOString(),
    });

    return results;

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/locations/search?q=${encodeURIComponent(query)}`);
    // if (!response.ok) throw new Error('Failed to search locations');
    // return await response.json();
    
  } catch (error) {
    console.error('❌ API Error: GET /api/locations/search', error);
    throw error;
  }
};

/**
 * POST /api/locations/reverse-geocode
 * Convert coordinates to address
 */
export const reverseGeocodeAPI = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  console.log('🌍 API Call: POST /api/locations/reverse-geocode', {
    endpoint: `${API_BASE_URL}/locations/reverse-geocode`,
    body: { latitude, longitude },
    timestamp: new Date().toISOString(),
  });

  try {
    // Simulate API delay
    await simulateDelay(500);

    // Mock implementation - return coordinates as string
    const locationString = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

    console.log('✅ API Response: POST /api/locations/reverse-geocode', {
      location: locationString,
      timestamp: new Date().toISOString(),
    });

    return locationString;

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/locations/reverse-geocode`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ latitude, longitude }),
    // });
    // if (!response.ok) throw new Error('Failed to reverse geocode');
    // const data = await response.json();
    // return data.address;
    
  } catch (error) {
    console.error('❌ API Error: POST /api/locations/reverse-geocode', error);
    throw error;
  }
};

