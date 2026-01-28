import { atom } from 'recoil';

export interface EventFormData {
  // Event details
  eventName: string;
  phoneNumber: string;
  dateTime: string;
  location: string;
  costPerPerson: string;
  description: string;
  
  // Images
  previewImage: string | null;
  backgroundImage: string | null;
  
  // Optional fields
  capacity?: string;
  photoGallery?: string[];
  links?: string[];
  privacy?: string;
  announcements?: string[];
}

export const eventFormState = atom<EventFormData>({
  key: 'eventFormState',
  default: {
    eventName: '',
    phoneNumber: '',
    dateTime: '',
    location: '',
    costPerPerson: '',
    description: '',
    previewImage: null,
    backgroundImage: null,
  },
});

