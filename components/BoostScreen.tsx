import { useState } from 'react';
import { Zap, ArrowLeft, Crown, TrendingUp, Eye, Users, CreditCard, Check, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { boostPlans } from '../data/mockData';
import type { BoostPlan } from '../types';

interface BoostScreenProps {
  housingId: string;
  housingTitle: string;
  currentStats: {
    views: number;
    clicks: number;
    applications: number;
  };
  onBack: () => void;
  onBoostPurchased: (planId: string) => void;
}

export function BoostScreen({ housingId, housingTitle, currentStats, onBack, onBoostPurchased }: BoostScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<BoostPlan | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePlanSelect = (plan: BoostPlan) => {
    setSelectedPlan(plan);
  };

  const handlePurchase = async () => {
    if (!selectedPlan) return;
    
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    onBoostPurchased(selectedPlan.id);
  };

  const getRecommendedBadge = (planId: string) => {
    if (planId === 'boost_7_days') {
      return (
        <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white shadow-lg">
          <Crown className="w-3 h-3 mr-1" />
          Recommandé
        </Badge>
      );
    }
    if (planId === 'pack_3_boosts') {
      return (
        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white shadow-lg">
          <Star className="w-3 h-3 mr-1" />
          Meilleur prix
        </Badge>
      );
    }
    return null;
  };

  if (showPayment && selectedPlan) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setShowPayment(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-gray-900">Paiement sécurisé</h1>
            <p className="text-sm text-gray-600">{selectedPlan.name}</p>
          </div>
        </div>

        {/* Payment content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Order summary */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Récapitulatif de commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Logement</span>
                <span className="font-medium">{housingTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formule</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durée</span>
                <span className="font-medium">{selectedPlan.duration} jours</span>
              </div>
              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{selectedPlan.price.toFixed(2)}€</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment method */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Méthode de paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CB</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Carte bancaire</div>
                    <div className="text-sm text-gray-600">Paiement sécurisé par Stripe</div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>

              {/* Mock payment form */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom sur la carte</label>
                    <input 
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date d'expiration</label>
                    <input 
                      type="text" 
                      placeholder="MM/AA"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Numéro de carte</label>
                  <input 
                    type="text" 
                    placeholder="**** **** **** 1234"
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security info */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-green-800">
                Paiement 100% sécurisé
              </span>
            </div>
          </div>
        </div>

        {/* Payment button */}
        <div className="p-6 bg-white border-t border-gray-100">
          <Button
            onClick={handlePurchase}
            disabled={processing}
            className="w-full h-12 brand-gradient-2 text-white shadow-lg"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Traitement en cours...
              </div>
            ) : (
              `Payer ${selectedPlan.price.toFixed(2)}€`
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">Booster mon annonce</h1>
          <p className="text-sm text-gray-600">{housingTitle}</p>
        </div>
        <Zap className="w-6 h-6 text-yellow-500" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Current stats */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Statistiques actuelles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentStats.views}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Eye className="w-3 h-3" />
                  Vues
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentStats.clicks}</div>
                <div className="text-sm text-gray-600">Clics</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentStats.applications}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Users className="w-3 h-3" />
                  Candidatures
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold text-gray-900 mb-2">Pourquoi booster votre annonce ?</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">+500%</div>
                <div className="text-sm text-gray-600">de visibilité</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">3x</div>
                <div className="text-sm text-gray-600">plus de candidatures</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Boost plans */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Choisissez votre formule</h3>
          
          {boostPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedPlan?.id === plan.id 
                  ? 'ring-2 ring-yellow-500 shadow-lg scale-[1.02] bg-yellow-50' 
                  : 'hover:shadow-md hover:scale-[1.01] bg-white'
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              {getRecommendedBadge(plan.id)}
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900">{plan.name}</h4>
                      {plan.id === 'pack_3_boosts' && (
                        <Badge className="bg-green-100 text-green-700 text-xs">-30%</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{plan.price.toFixed(2)}€</div>
                    {plan.id === 'pack_3_boosts' && (
                      <div className="text-sm text-gray-500 line-through">17,97€</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {selectedPlan?.id === plan.id && (
                  <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Formule sélectionnée</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust signals */}
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-600">✅ Paiement sécurisé • 🔄 Remboursement sous 48h • 📞 Support 7j/7</div>
          <div className="text-xs text-gray-500">Plus de 10,000 annonces boostées avec succès</div>
        </div>
      </div>

      {/* Continue button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <Button
          onClick={() => setShowPayment(true)}
          disabled={!selectedPlan}
          className={`w-full h-12 ${
            selectedPlan 
              ? 'brand-gradient-2 text-white shadow-lg hover:shadow-xl' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {selectedPlan ? `Continuer avec ${selectedPlan.name}` : 'Sélectionnez une formule'}
        </Button>
      </div>
    </div>
  );
}