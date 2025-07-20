export interface User {
  id: string;
  name: string;
  age: number;
  photo: string;
  description: string;
  preferences: {
    smoker: boolean;
    pets: boolean;
    homeWorking: boolean;
    partyPerson: boolean;
  };
  budget: number;
  city: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  type: 'tenant' | 'tenant_with_housing' | 'landlord';
  age?: number;
  photo?: string;
  description?: string;
  preferences?: {
    smoker: boolean;
    pets: boolean;
    homeWorking: boolean;
    partyPerson: boolean;
  };
  budget?: number;
  city: string;
  createdAt: string;
}

export interface Housing {
  id: string;
  title: string;
  description: string;
  price: number;
  charges?: number;
  city: string;
  address?: string;
  bedrooms: number;
  furnished: boolean;
  sponsored: boolean;
  surface: number;
  photos: string[];
  ownerId: string;
  ownerType: 'tenant_with_housing' | 'landlord';
  roommatesNeeded: number;
  boosted?: {
    isActive: boolean;
    expiresAt: string;
    plan: 'boost_3_days' | 'boost_7_days' | 'boost_14_days';
  };
  stats?: {
    views: number;
    clicks: number;
    applications: number;
  };
}

export interface BoostPlan {
  id: string;
  name: string;
  duration: number; // in days
  price: number;
  description: string;
  features: string[];
}

export interface BoostPurchase {
  id: string;
  housingId: string;
  planId: string;
  purchasedAt: string;
  expiresAt: string;
  amount: number;
  status: 'active' | 'expired';
}

export interface PartnerService {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'insurance' | 'internet' | 'moving' | 'utilities';
  color: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  participants: string[];
  date: string;
  category: 'rent' | 'utilities' | 'groceries' | 'other';
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  completed: boolean;
  dueDate: string;
  category: 'cleaning' | 'trash' | 'maintenance' | 'shopping';
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  description: string;
}
