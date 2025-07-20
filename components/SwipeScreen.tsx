import { useState } from 'react';
import { Heart, X, MessageCircle, Zap, MapPin, Euro, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { mockUsers } from '../data/mockData';
import type { User } from '../types';

export function SwipeScreen() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [swipeCount, setSwipeCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [matches, setMatches] = useState<User[]>([]);
  const [showMatch, setShowMatch] = useState<User | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentUser = mockUsers[currentUserIndex];

  const handleSwipe = async (liked: boolean) => {
    setIsAnimating(true);
    
    // Simulate swipe animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (liked && Math.random() > 0.4) {
      // Higher match probability for demo
      setMatches([...matches, currentUser]);
      setShowMatch(currentUser);
      setTimeout(() => setShowMatch(null), 3000);
    }

    const newSwipeCount = swipeCount + 1;
    setSwipeCount(newSwipeCount);

    // Show ad every 5 swipes
    if (newSwipeCount % 5 === 0) {
      setShowAd(true);
      setTimeout(() => setShowAd(false), 4000);
    }

    if (currentUserIndex < mockUsers.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
    } else {
      setCurrentUserIndex(0);
    }
    
    setIsAnimating(false);
  };

  if (showAd) {
    return (
      <div className="h-full relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 brand-gradient-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-sm glass-effect shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-2xl brand-gradient-3 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                ColocMatch Premium
              </h2>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Débloquez des fonctionnalités exclusives : likes illimités, super likes, et filtres avancés !
              </p>
              <div className="space-y-2">
                <Button className="w-full brand-gradient-2 text-white shadow-lg">
                  <Star className="w-4 h-4 mr-2" />
                  Essayer 7 jours gratuits
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-500 text-sm"
                  onClick={() => setShowAd(false)}
                >
                  Continuer gratuitement
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (showMatch) {
    return (
      <div className="h-full relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="absolute inset-0 brand-gradient-2 flex items-center justify-center p-6">
          <Card className="w-full max-w-sm glass-effect shadow-2xl animate-pulse">
            <div className="p-6 text-center">
              <div className="text-4xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                C'est un match !
              </h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={showMatch.photo} 
                    alt="Votre photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
                <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={showMatch.photo} 
                    alt={showMatch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Vous et <span className="font-semibold">{showMatch.name}</span> vous êtes likés mutuellement !
              </p>
              <Button className="w-full brand-gradient-1 text-white shadow-lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Envoyer un message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-center">
          <div className="text-4xl mb-3">🏠</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Plus de profils disponibles !</h3>
          <p className="text-sm text-gray-600 mb-4">Revenez plus tard pour découvrir de nouveaux colocs</p>
          <Button 
            className="brand-gradient-1 text-white"
            onClick={() => setCurrentUserIndex(0)}
          >
            Recommencer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Compact stats header */}
      <div className="p-4 pb-2">
        <div className="flex justify-center items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{matches.length}</div>
            <div className="text-xs text-gray-500">Matchs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{currentUserIndex + 1}</div>
            <div className="text-xs text-gray-500">Vus</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{mockUsers.length}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>

      {/* Optimized card container */}
      <div className="flex-1 px-4 pb-4 flex items-center justify-center">
        <div className="w-full max-w-sm">
          {/* Card Stack Effect */}
          <div className="relative">
            {/* Background card */}
            <Card className="absolute inset-0 transform rotate-1 scale-95 opacity-20 bg-white shadow-lg" />
            
            {/* Main card - Optimized height */}
            <Card className={`relative overflow-hidden bg-white shadow-2xl transition-transform duration-300 ${
              isAnimating ? 'scale-95' : 'scale-100'
            }`} style={{ height: '480px' }}>
              <div className="h-full flex flex-col">
                {/* Photo section - 65% of card */}
                <div className="relative" style={{ height: '65%' }}>
                  <img 
                    src={currentUser.photo} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Online indicator */}
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-white text-xs font-medium">En ligne</span>
                    </div>
                  </div>
                  
                  {/* Basic info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold text-white">
                        {currentUser.name}, {currentUser.age}
                      </h2>
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {currentUser.city}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Euro className="w-3 h-3 text-white/80" />
                      <span className="text-white/90 text-sm">
                        Budget max : {currentUser.budget}€/mois
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Info section - 35% of card */}
                <div className="p-4 bg-white flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">
                    {currentUser.description}
                  </p>
                  
                  {/* Preferences tags - compact */}
                  <div className="flex flex-wrap gap-1">
                    {!currentUser.preferences.smoker && (
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200 px-2 py-1">
                        Non-fumeur
                      </Badge>
                    )}
                    {currentUser.preferences.pets && (
                      <Badge variant="secondary" className="text-xs bg-orange-50 text-orange-700 border-orange-200 px-2 py-1">
                        🐕 Animaux
                      </Badge>
                    )}
                    {currentUser.preferences.homeWorking && (
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-2 py-1">
                        💻 Télétravail
                      </Badge>
                    )}
                    {currentUser.preferences.partyPerson && (
                      <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200 px-2 py-1">
                        🎉 Sociable
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Compact action buttons */}
      <div className="p-4 pt-2">
        <div className="flex justify-center items-center gap-6 mb-3">
          <Button 
            size="lg"
            variant="outline"
            className="w-14 h-14 rounded-full border-2 border-red-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={() => handleSwipe(false)}
          >
            <X className="w-6 h-6 text-red-500" />
          </Button>
          
          <Button 
            size="lg"
            className="w-16 h-16 rounded-full brand-gradient-2 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => handleSwipe(true)}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>
        
        {/* Compact progress indicator */}
        <div className="text-center">
          <span className="text-sm text-gray-500">
            {currentUserIndex + 1} / {mockUsers.length}
          </span>
        </div>
      </div>
    </div>
  );
}
