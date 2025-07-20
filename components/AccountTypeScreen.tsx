import { useState } from 'react';
import { User, Home, Building, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface AccountTypeOption {
  id: string;
  type: 'tenant' | 'tenant_with_housing' | 'landlord';
  title: string;
  description: string;
  features: string[];
  icon: any;
  gradient: string;
  illustration: string;
}

interface AccountTypeScreenProps {
  onAccountTypeSelected: (type: 'tenant' | 'tenant_with_housing' | 'landlord') => void;
}

export function AccountTypeScreen({ onAccountTypeSelected }: AccountTypeScreenProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const accountTypes: AccountTypeOption[] = [
    {
      id: 'tenant',
      type: 'tenant',
      title: 'Colocataire',
      description: 'Je cherche un colocataire et un logement ensemble',
      features: [
        'Système de swipe pour matcher',
        'Recherche de logement à deux',
        'Messagerie intégrée',
        'Gestion de colocation'
      ],
      icon: User,
      gradient: 'brand-gradient-2',
      illustration: '👥'
    },
    {
      id: 'tenant_with_housing',
      type: 'tenant_with_housing',
      title: 'Colocataire avec logement',
      description: 'J\'ai déjà un logement et je cherche un colocataire',
      features: [
        'Publication de votre logement',
        'Boost payant des annonces',
        'Réception de candidatures',
        'Outils de gestion'
      ],
      icon: Home,
      gradient: 'brand-gradient-1',
      illustration: '🏠'
    },
    {
      id: 'landlord',
      type: 'landlord',
      title: 'Propriétaire (Bailleur)',
      description: 'Je loue des logements en colocation',
      features: [
        'Gestion multi-logements',
        'Interface propriétaire',
        'Statistiques avancées',
        'Support prioritaire'
      ],
      icon: Building,
      gradient: 'brand-gradient-3',
      illustration: '🏢'
    }
  ];

  const handleTypeSelect = (type: AccountTypeOption) => {
    setSelectedType(type.id);
  };

  const handleContinue = () => {
    if (selectedType) {
      const selectedOption = accountTypes.find(t => t.id === selectedType);
      if (selectedOption) {
        onAccountTypeSelected(selectedOption.type);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-1 flex items-center justify-center shadow-lg">
            <span className="text-3xl">🎯</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Choisissez votre profil
          </h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            Sélectionnez le type de compte qui correspond le mieux à votre situation
          </p>
        </div>

        {/* Account types */}
        <div className="space-y-4 mb-8">
          {accountTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <Card 
                key={type.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-violet-500 shadow-lg scale-[1.02]' 
                    : 'hover:scale-[1.01] border-gray-200'
                }`}
                onClick={() => handleTypeSelect(type)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon and illustration */}
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-14 h-14 rounded-2xl ${type.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-2xl">{type.illustration}</div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {type.title}
                        </h3>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {type.description}
                      </p>
                      
                      {/* Features */}
                      <div className="space-y-2">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 transition-colors ${
                      isSelected ? 'text-violet-500' : 'text-gray-400'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Popular choice badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium text-yellow-800">
              Le plus populaire : Colocataire
            </span>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <Button 
          onClick={handleContinue}
          disabled={!selectedType}
          className={`w-full h-12 ${
            selectedType 
              ? 'brand-gradient-2 text-white shadow-lg hover:shadow-xl transition-all duration-200' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {selectedType ? 'Continuer' : 'Sélectionnez un type de compte'}
        </Button>
        
        {selectedType && (
          <p className="text-center text-sm text-gray-500 mt-3">
            Vous pourrez modifier ce choix plus tard dans votre profil
          </p>
        )}
      </div>
    </div>
  );
}