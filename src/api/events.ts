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
    timestamp: new Date().toISOString(),
  });

  console.log('📦 FULL PAYLOAD DATA:', {
    eventName: eventData.eventName,
    phoneNumber: eventData.phoneNumber,
    dateTime: eventData.dateTime,
    location: eventData.location,
    costPerPerson: eventData.costPerPerson,
    description: eventData.description,
    capacity: eventData.capacity,
    privacy: eventData.privacy,
    links: eventData.links,
    announcements: eventData.announcements,
    photoGallery: eventData.photoGallery ? {
      count: eventData.photoGallery.length,
      images: eventData.photoGallery.map((img, i) => ({
        index: i,
        size: img.length,
        preview: img.substring(0, 50) + '...',
      }))
    } : null,
    previewImage: eventData.previewImage ? {
      size: eventData.previewImage.length,
      type: eventData.previewImage.substring(0, 30),
      preview: eventData.previewImage.substring(0, 100) + '...',
    } : null,
    backgroundImage: eventData.backgroundImage ? {
      size: eventData.backgroundImage.length,
      type: eventData.backgroundImage.substring(0, 30),
      preview: eventData.backgroundImage.substring(0, 100) + '...',
    } : null,
  });

  console.log('📋 RAW EVENT DATA (Complete):', eventData);

  // Display summary in table format
  console.table({
    'Event Name': eventData.eventName || '(empty)',
    'Phone Number': eventData.phoneNumber || '(empty)',
    'Date & Time': eventData.dateTime || '(empty)',
    'Location': eventData.location || '(empty)',
    'Cost Per Person': eventData.costPerPerson || '(empty)',
    'Description': eventData.description ? `${eventData.description.substring(0, 50)}...` : '(empty)',
    'Capacity': eventData.capacity || '(not set)',
    'Privacy': eventData.privacy ? `${eventData.privacy.substring(0, 50)}...` : '(not set)',
    'Links Count': eventData.links?.length || 0,
    'Announcements Count': eventData.announcements?.length || 0,
    'Photo Gallery Count': eventData.photoGallery?.length || 0,
    'Has Preview Image': !!eventData.previewImage,
    'Has Background Image': !!eventData.backgroundImage,
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

