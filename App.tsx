import { useState, useEffect } from 'react';
import { SwipeScreen } from './components/SwipeScreen';
import { HousingScreen } from './components/HousingScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AccountTypeScreen } from './components/AccountTypeScreen';
import { CreateListingScreen } from './components/CreateListingScreen';
import { BoostScreen } from './components/BoostScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Plus, Home, TrendingUp } from 'lucide-react';

type UserType = 'tenant' | 'tenant_with_housing' | 'landlord';
type AppScreen = 'swipe' | 'housing' | 'services' | 'dashboard' | 'profile' | 'create_listing' | 'boost';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppScreen>('swipe');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showAccountTypeSelection, setShowAccountTypeSelection] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [boostData, setBoostData] = useState<{
    housingId: string;
    housingTitle: string;
    currentStats: { views: number; clicks: number; applications: number };
  } | null>(null);

  const onboardingSteps = [
    {
      emoji: '🏠',
      title: 'Bienvenue sur ColocMatch',
      description: 'L\'application qui révolutionne la recherche de colocation',
      gradient: 'brand-gradient-1',
      color: 'text-white'
    },
    {
      emoji: '💕',
      title: 'Trouvez votre coloc idéal',
      description: 'Swipez et matchez avec des personnes qui partagent vos valeurs',
      gradient: 'brand-gradient-2',
      color: 'text-white'
    },
    {
      emoji: '🔍',
      title: 'Découvrez des logements',
      description: 'Parcourez une sélection de logements adaptés à la colocation',
      gradient: 'brand-gradient-3',
      color: 'text-white'
    },
    {
      emoji: '✨',
      title: 'Gérez votre colocation',
      description: 'Organisez vos dépenses, tâches et communications facilement',
      gradient: 'brand-gradient-1',
      color: 'text-white'
    }
  ];

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setShowOnboarding(false);
      setShowAccountTypeSelection(true);
    }
  };

  const handleOnboardingSkip = () => {
    setShowOnboarding(false);
    setShowAccountTypeSelection(true);
  };

  const handleAccountTypeSelected = (type: UserType) => {
    setUserType(type);
    setShowAccountTypeSelection(false);
    localStorage.setItem('colocmatch_onboarded', 'true');
    localStorage.setItem('colocmatch_user_type', type);
  };

  const handleCreateListing = () => {
    setActiveTab('create_listing');
  };

  const handleBoostListing = (housingId: string, title: string, stats: any) => {
    setBoostData({
      housingId,
      housingTitle: title,
      currentStats: stats
    });
    setActiveTab('boost');
  };

  const handleBoostPurchased = (planId: string) => {
    console.log('Boost purchased:', planId);
    setActiveTab('housing');
    setBoostData(null);
  };

  const handleListingCreated = () => {
    setActiveTab('housing');
  };

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('colocmatch_onboarded');
    const savedUserType = localStorage.getItem('colocmatch_user_type') as UserType;
    
    if (hasSeenOnboarding && savedUserType) {
      setShowOnboarding(false);
      setShowAccountTypeSelection(false);
      setUserType(savedUserType);
    } else if (hasSeenOnboarding) {
      setShowOnboarding(false);
      setShowAccountTypeSelection(true);
    }
  }, []);

  // Show onboarding
  if (showOnboarding) {
    const currentStep = onboardingSteps[onboardingStep];
    
    return (
      <div className="h-screen flex flex-col">
        <div className={`flex-1 ${currentStep.gradient} flex items-center justify-center p-6 relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full" />
            <div className="absolute top-32 right-16 w-16 h-16 bg-white/15 rounded-full" />
            <div className="absolute bottom-24 left-20 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute bottom-40 right-8 w-12 h-12 bg-white/25 rounded-full" />
          </div>
          
          <Card className="w-full max-w-sm glass-effect shadow-2xl relative z-10">
            <CardContent className="p-8 text-center">
              <div className="text-7xl mb-6 animate-bounce">{currentStep.emoji}</div>
              <h1 className={`text-2xl font-bold ${currentStep.color} mb-4`}>
                {currentStep.title}
              </h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {currentStep.description}
              </p>
              
              <div className="flex gap-2 justify-center mb-8">
                {onboardingSteps.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === onboardingStep 
                        ? 'bg-gray-800 w-6' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleOnboardingNext}
                  className={`w-full ${currentStep.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
                >
                  {onboardingStep === onboardingSteps.length - 1 ? 'Choisir mon profil' : 'Suivant'}
                </Button>
                
                <Button 
                  variant="ghost" 
                  onClick={handleOnboardingSkip}
                  className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  Passer l'introduction
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show account type selection
  if (showAccountTypeSelection) {
    return <AccountTypeScreen onAccountTypeSelected={handleAccountTypeSelected} />;
  }

  // Show specific screens
  if (activeTab === 'create_listing' && userType && (userType === 'tenant_with_housing' || userType === 'landlord')) {
    return (
      <CreateListingScreen
        userType={userType}
        onBack={() => setActiveTab('housing')}
        onListingCreated={handleListingCreated}
      />
    );
  }

  if (activeTab === 'boost' && boostData) {
    return (
      <BoostScreen
        housingId={boostData.housingId}
        housingTitle={boostData.housingTitle}
        currentStats={boostData.currentStats}
        onBack={() => setActiveTab('housing')}
        onBoostPurchased={handleBoostPurchased}
      />
    );
  }

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'swipe':
        return { 
          title: 'Découvrir', 
          subtitle: userType === 'tenant' ? 'Trouvez votre coloc idéal' : 'Parcourez les profils',
          gradient: 'brand-gradient-2'
        };
      case 'housing':
        return { 
          title: 'Logements', 
          subtitle: userType === 'tenant' ? 'Trouvez votre futur chez-vous' : 'Gérez vos annonces',
          gradient: 'brand-gradient-3'
        };
      case 'services':
        return { 
          title: 'Services', 
          subtitle: 'Tous vos besoins en un clic',
          gradient: 'brand-gradient-1'
        };
      case 'dashboard':
        return { 
          title: 'Gestion', 
          subtitle: 'Organisez votre colocation',
          gradient: 'brand-gradient-3'
        };
      case 'profile':
        return { 
          title: 'Profil', 
          subtitle: 'Gérez votre compte',
          gradient: 'brand-gradient-2'
        };
      default:
        return { 
          title: 'ColocMatch', 
          subtitle: 'Votre assistant colocation',
          gradient: 'brand-gradient-1'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'swipe':
        return <SwipeScreen />;
      case 'housing':
        return (
          <HousingScreen 
            userType={userType}
            onCreateListing={handleCreateListing}
            onBoostListing={handleBoostListing}
          />
        );
      case 'services':
        return <ServicesScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'profile':
        return <ProfileScreen userType={userType} />;
      default:
        return <SwipeScreen />;
    }
  };

  const getUserTypeBadge = () => {
    switch (userType) {
      case 'tenant':
        return { text: '👥 Colocataire', color: 'brand-gradient-2' };
      case 'tenant_with_housing':
        return { text: '🏠 Avec logement', color: 'brand-gradient-1' };
      case 'landlord':
        return { text: '🏢 Propriétaire', color: 'brand-gradient-3' };
      default:
        return { text: '✨ Premium', color: 'brand-gradient-2' };
    }
  };

  const userBadge = getUserTypeBadge();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Enhanced header with user type */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-lg flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${headerInfo.gradient} flex items-center justify-center shadow-xl animate-float`}>
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">{headerInfo.title}</h1>
                <p className="text-sm text-gray-600">{headerInfo.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Quick action buttons for non-tenant users */}
              {(userType === 'tenant_with_housing' || userType === 'landlord') && activeTab === 'housing' && (
                <Button 
                  size="sm" 
                  onClick={handleCreateListing}
                  className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Publier
                </Button>
              )}
              
              <Badge className={`${userBadge.color} text-white shadow-lg font-semibold px-3 py-1 rounded-xl`}>
                {userBadge.text}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50/50 via-white to-blue-50/50">
        {renderActiveScreen()}
      </div>

      {/* Enhanced Bottom Navigation with conditional tabs */}
      <div className="flex-shrink-0">
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userType={userType}
        />
      </div>
    </div>
  );
}