
export type Role = 'Client' | 'Artist' | 'Technician' | 'Venue' | 'Agency' | 'ServiceProvider' | 'Visitor';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  availableRoles: Role[]; // List of roles this user can switch between
  avatarUrl?: string;
}

export interface BaseEntity {
  id: string;
  title: string; // Name for pros, Event Name for events
  imageUrl: string;
  category: string;
  rating?: number;
  location?: string;
  price?: string | number;
  tags?: string[];
  verified?: boolean;
}

export interface ProfessionalEntity extends BaseEntity {
  profession: string;
  hourlyRate?: number;
  // Extended Details
  bio?: string;
  specialties?: string[];
  media?: { type: 'image' | 'video'; url: string; thumbnail?: string }[];
  equipment?: string;
  hasEquipment?: boolean;
  reviews?: Review[];
  priceRange?: string;
  responseTime?: string;
  cancellationPolicy?: string;
  socials?: { instagram?: string; youtube?: string; website?: string; soundcloud?: string };
  availability?: string[];
}

export interface Review {
  id: number;
  type: 'manual' | 'screenshot';
  name: string;
  quote?: string;
  photo?: string;
  screenshot?: string;
  rating?: number;
  date?: string;
}

export interface FAQ {
  id: number;
  q: string;
  a: string;
}

export interface EventEntity extends BaseEntity {
  date: string;
  description: string;
  // Extended Details
  media?: { type: 'image' | 'video'; url: string; thumbnail?: string }[];
  organizer?: { name: string; role: string; avatar: string };
  lineup?: ProfessionalEntity[];
  features?: string[]; // "What's included"
  testimonials?: Review[];
  faqs?: FAQ[];
  isIndoor?: boolean;
}

// New Types for Opportunities
export interface OpportunityEntity {
  id: string;
  title: string;
  clientName: string;
  date: string;
  location: string;
  budget: string;
  type: string; // e.g., Private Party, Festival
  requiredRoles: string[]; // e.g., ['DJ', 'Photographer']
  description: string;
  deadline: string;
  status: 'Open' | 'Closed';
}

// New Types for Bookings
export type BookingStatus = 'pending' | 'confirmed' | 'declined' | 'completed';

export interface BookingRequest {
  id: string;
  clientName: string;
  clientAvatar?: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  price: string;
  status: BookingStatus;
  type: string; // e.g. 'Performance', 'Rental'
  message?: string;
}

// New Types for Content
export interface ContentItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: string;
  category: 'Podcast' | 'Live Set' | 'Vlog' | 'Radio';
  channel: string; // e.g., 'The Happy Cast'
  date: string;
  isLive?: boolean;
}

export type ListingType = 'events' | 'artists' | 'technicians' | 'venues' | 'agencies';

export interface NavItem {
  id: string;
  label: string;
  icon: any; // Using lucide-react types broadly
  path?: string;
  type?: 'primary' | 'utility';
}
