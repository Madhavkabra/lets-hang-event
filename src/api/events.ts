import type { EventFormData } from '../store/eventAtoms';

// Base API configuration
const API_BASE_URL = '/api'; // This would be your real API base URL

// Simulated API delay (remove in production)
const simulateDelay = (ms: number = 300) => 
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * POST /api/events/draft
 * Save event as draft
 */
export const saveDraftAPI = async (eventData: EventFormData): Promise<{ success: boolean; draftId: string }> => {
  console.log('💾 API Call: POST /api/events/draft', {
    endpoint: `${API_BASE_URL}/events/draft`,
    body: {
      ...eventData,
      // Redact sensitive data in logs if needed
      phoneNumber: eventData.phoneNumber ? '***' : null,
    },
    timestamp: new Date().toISOString(),
  });

  try {
    // Simulate API delay
    await simulateDelay(500);

    // Mock implementation - generate fake draft ID
    const draftId = `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('✅ API Response: POST /api/events/draft', {
      success: true,
      draftId,
      timestamp: new Date().toISOString(),
    });

    // Mock: Save to localStorage for demo
    localStorage.setItem('eventDraft', JSON.stringify(eventData));
    localStorage.setItem('draftId', draftId);

    return { success: true, draftId };

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/events/draft`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(eventData),
    // });
    // if (!response.ok) throw new Error('Failed to save draft');
    // return await response.json();
    
  } catch (error) {
    console.error('❌ API Error: POST /api/events/draft', error);
    throw error;
  }
};

/**
 * POST /api/events
 * Create/publish event
 */
export const createEventAPI = async (eventData: EventFormData): Promise<{ success: boolean; eventId: string; eventUrl: string }> => {
  console.log('🚀 API Call: POST /api/events', {
    endpoint: `${API_BASE_URL}/events`,
    body: {
      ...eventData,
      // Show full data structure for debugging
      hasPreviewImage: !!eventData.previewImage,
      hasBackgroundImage: !!eventData.backgroundImage,
      phoneNumber: eventData.phoneNumber ? '***' : null,
    },
    timestamp: new Date().toISOString(),
  });

  try {
    // Simulate API delay
    await simulateDelay(800);

    // Mock implementation - generate fake event ID
    const eventId = `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const eventUrl = `https://letshang.com/events/${eventId}`;

    console.log('✅ API Response: POST /api/events', {
      success: true,
      eventId,
      eventUrl,
      timestamp: new Date().toISOString(),
    });

    return { success: true, eventId, eventUrl };

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/events`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(eventData),
    // });
    // if (!response.ok) throw new Error('Failed to create event');
    // return await response.json();
    
  } catch (error) {
    console.error('❌ API Error: POST /api/events', error);
    throw error;
  }
};

/**
 * GET /api/events/draft/:draftId
 * Load draft by ID
 */
export const loadDraftAPI = async (draftId: string): Promise<EventFormData | null> => {
  console.log('📥 API Call: GET /api/events/draft/:draftId', {
    endpoint: `${API_BASE_URL}/events/draft/${draftId}`,
    params: { draftId },
    timestamp: new Date().toISOString(),
  });

  try {
    // Simulate API delay
    await simulateDelay(400);

    // Mock implementation - load from localStorage
    const savedDraft = localStorage.getItem('eventDraft');
    const savedDraftId = localStorage.getItem('draftId');

    if (savedDraftId === draftId && savedDraft) {
      const draftData = JSON.parse(savedDraft);
      
      console.log('✅ API Response: GET /api/events/draft/:draftId', {
        found: true,
        draftId,
        timestamp: new Date().toISOString(),
      });

      return draftData;
    }

    console.log('⚠️ API Response: GET /api/events/draft/:draftId', {
      found: false,
      draftId,
      timestamp: new Date().toISOString(),
    });

    return null;

    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/events/draft/${draftId}`);
    // if (!response.ok) throw new Error('Failed to load draft');
    // return await response.json();
    
  } catch (error) {
    console.error('❌ API Error: GET /api/events/draft/:draftId', error);
    throw error;
  }
};

