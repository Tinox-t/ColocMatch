import { User, Housing, PartnerService, Expense, Task, BoostPlan, UserProfile } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Emma',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    description: 'Étudiante en master marketing, j\'aime cuisiner et les soirées tranquilles entre amis !',
    preferences: {
      smoker: false,
      pets: true,
      homeWorking: true,
      partyPerson: false
    },
    budget: 600,
    city: 'Paris'
  },
  {
    id: '2',
    name: 'Lucas',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Développeur web en freelance, passionné de jeux vidéo et de cuisine asiatique.',
    preferences: {
      smoker: false,
      pets: false,
      homeWorking: true,
      partyPerson: true
    },
    budget: 800,
    city: 'Lyon'
  },
  {
    id: '3',
    name: 'Sophie',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    description: 'Architecte junior, j\'adore décorer et créer des espaces cosy. Non-fumeuse !',
    preferences: {
      smoker: false,
      pets: true,
      homeWorking: false,
      partyPerson: false
    },
    budget: 700,
    city: 'Toulouse'
  },
  {
    id: '4',
    name: 'Thomas',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    description: 'Ingénieur informatique, j\'aime le sport et les sorties culturelles. Très organisé !',
    preferences: {
      smoker: false,
      pets: false,
      homeWorking: true,
      partyPerson: false
    },
    budget: 750,
    city: 'Paris'
  },
  {
    id: '5',
    name: 'Léa',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    description: 'Journaliste freelance, passionnée de voyages et de photographie. J\'aime partager mes expériences !',
    preferences: {
      smoker: false,
      pets: true,
      homeWorking: true,
      partyPerson: true
    },
    budget: 650,
    city: 'Lyon'
  },
  {
    id: '6',
    name: 'Antoine',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    description: 'Chef cuisinier, j\'adore préparer de bons petits plats et découvrir de nouveaux restaurants.',
    preferences: {
      smoker: false,
      pets: false,
      homeWorking: false,
      partyPerson: true
    },
    budget: 900,
    city: 'Paris'
  },
  {
    id: '7',
    name: 'Camille',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    description: 'Étudiante en médecine, calme et studieuse. J\'aime le yoga et la lecture.',
    preferences: {
      smoker: false,
      pets: true,
      homeWorking: false,
      partyPerson: false
    },
    budget: 550,
    city: 'Toulouse'
  },
  {
    id: '8',
    name: 'Maxime',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    description: 'Consultant en marketing, j\'aime le networking et découvrir de nouveaux endroits branchés.',
    preferences: {
      smoker: false,
      pets: false,
      homeWorking: true,
      partyPerson: true
    },
    budget: 850,
    city: 'Paris'
  }
];

export const mockHousings: Housing[] = [
  {
    id: '1',
    title: 'Appartement 3 pièces - Centre ville',
    description: 'Bel appartement lumineux avec balcon, proche des transports.',
    price: 1200,
    charges: 150,
    city: 'Paris',
    address: '15 Rue de Rivoli, 75001 Paris',
    bedrooms: 2,
    furnished: true,
    sponsored: true,
    surface: 65,
    photos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    ownerId: 'landlord_1',
    ownerType: 'landlord',
    roommatesNeeded: 1,
    boosted: {
      isActive: true,
      expiresAt: '2025-01-25T00:00:00Z',
      plan: 'boost_7_days'
    },
    stats: {
      views: 156,
      clicks: 23,
      applications: 8
    }
  },
  {
    id: '2',
    title: 'Maison avec jardin - Quartier résidentiel',
    description: 'Maison individuelle avec jardin, parking inclus.',
    price: 1500,
    charges: 200,
    city: 'Lyon',
    address: '42 Avenue des Frères Lumière, 69008 Lyon',
    bedrooms: 3,
    furnished: false,
    sponsored: false,
    surface: 90,
    photos: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'],
    ownerId: 'tenant_with_housing_1',
    ownerType: 'tenant_with_housing',
    roommatesNeeded: 2,
    stats: {
      views: 89,
      clicks: 12,
      applications: 4
    }
  },
  {
    id: '3',
    title: 'Loft moderne - Proche universités',
    description: 'Loft rénové avec cuisine équipée, idéal étudiants.',
    price: 900,
    charges: 100,
    city: 'Toulouse',
    address: '8 Rue des Études, 31000 Toulouse',
    bedrooms: 2,
    furnished: true,
    sponsored: true,
    surface: 55,
    photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
    ownerId: 'landlord_2',
    ownerType: 'landlord',
    roommatesNeeded: 1,
    boosted: {
      isActive: true,
      expiresAt: '2025-01-30T00:00:00Z',
      plan: 'boost_14_days'
    },
    stats: {
      views: 234,
      clicks: 45,
      applications: 15
    }
  }
];

export const boostPlans: BoostPlan[] = [
  {
    id: 'boost_3_days',
    name: 'Boost 3 jours',
    duration: 3,
    price: 2.99,
    description: 'Mettez en avant votre annonce pendant 3 jours',
    features: [
      'Affichage prioritaire',
      'Badge "Mis en avant"',
      'Statistiques détaillées',
      '+300% de visibilité'
    ]
  },
  {
    id: 'boost_7_days',
    name: 'Boost 7 jours',
    duration: 7,
    price: 5.99,
    description: 'Mettez en avant votre annonce pendant 1 semaine',
    features: [
      'Affichage prioritaire',
      'Badge "Mis en avant"',
      'Statistiques détaillées',
      '+500% de visibilité',
      'Support prioritaire'
    ]
  },
  {
    id: 'boost_14_days',
    name: 'Boost 14 jours',
    duration: 14,
    price: 9.99,
    description: 'Mettez en avant votre annonce pendant 2 semaines',
    features: [
      'Affichage prioritaire',
      'Badge "Mis en avant"',
      'Statistiques détaillées',
      '+700% de visibilité',
      'Support prioritaire',
      'Garantie de résultat'
    ]
  },
  {
    id: 'pack_3_boosts',
    name: 'Pack 3 boosts',
    duration: 7,
    price: 13.99,
    description: 'Économisez avec ce pack de 3 boosts de 7 jours',
    features: [
      '3 boosts de 7 jours',
      'Utilisables quand vous voulez',
      'Économie de 30%',
      'Toutes les fonctionnalités Premium'
    ]
  }
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user_1',
    name: 'Marie Dubois',
    email: 'marie@example.com',
    type: 'tenant',
    age: 23,
    city: 'Lyon',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'tenant_with_housing_1',
    name: 'Pierre Martin',
    email: 'pierre@example.com',
    type: 'tenant_with_housing',
    age: 26,
    city: 'Lyon',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'landlord_1',
    name: 'Sophie Landlord',
    email: 'sophie@example.com',
    type: 'landlord',
    city: 'Paris',
    createdAt: '2025-01-01T00:00:00Z'
  }
];

export const mockServices: PartnerService[] = [
  {
    id: '1',
    name: 'AssuranceHabitat+',
    description: 'Assurance habitation adaptée à la colocation',
    icon: 'Shield',
    category: 'insurance',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: '2',
    name: 'FibreMax',
    description: 'Internet ultra-haut débit pour colocs',
    icon: 'Wifi',
    category: 'internet',
    color: 'bg-green-100 text-green-600'
  },
  {
    id: '3',
    name: 'MoveFast',
    description: 'Déménagement simple et économique',
    icon: 'Truck',
    category: 'moving',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: '4',
    name: 'ÉnergieVerte',
    description: 'Électricité et gaz écologiques',
    icon: 'Zap',
    category: 'utilities',
    color: 'bg-emerald-100 text-emerald-600'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Loyer Janvier',
    amount: 1200,
    paidBy: 'Emma',
    participants: ['Emma', 'Lucas'],
    date: '2025-01-01',
    category: 'rent'
  },
  {
    id: '2',
    title: 'Courses supermarché',
    amount: 85,
    paidBy: 'Lucas',
    participants: ['Emma', 'Lucas'],
    date: '2025-01-15',
    category: 'groceries'
  },
  {
    id: '3',
    title: 'Facture électricité',
    amount: 120,
    paidBy: 'Emma',
    participants: ['Emma', 'Lucas'],
    date: '2025-01-10',
    category: 'utilities'
  },
  {
    id: '4',
    title: 'Internet Fibre',
    amount: 35,
    paidBy: 'Lucas',
    participants: ['Emma', 'Lucas'],
    date: '2025-01-05',
    category: 'utilities'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Sortir les poubelles',
    assignedTo: 'Emma',
    completed: false,
    dueDate: '2025-01-22',
    category: 'trash'
  },
  {
    id: '2',
    title: 'Nettoyer la salle de bain',
    assignedTo: 'Lucas',
    completed: true,
    dueDate: '2025-01-20',
    category: 'cleaning'
  },
  {
    id: '3',
    title: 'Aspirateur salon',
    assignedTo: 'Emma',
    completed: false,
    dueDate: '2025-01-25',
    category: 'cleaning'
  },
  {
    id: '4',
    title: 'Courses semaine',
    assignedTo: 'Lucas',
    completed: false,
    dueDate: '2025-01-24',
    category: 'shopping'
  },
  {
    id: '5',
    title: 'Réparation robinet cuisine',
    assignedTo: 'Emma',
    completed: false,
    dueDate: '2025-01-26',
    category: 'maintenance'
  }
];
