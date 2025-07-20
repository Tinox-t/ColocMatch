import { useState } from 'react';
import { Heart, Filter, MapPin, Users, Home, Star, Wifi, Car, Zap, Search, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { mockHousings } from '../data/mockData';
import type { Housing } from '../types';

interface HousingScreenProps {
  userType?: 'tenant' | 'tenant_with_housing' | 'landlord' | null;
  onCreateListing?: () => void;
  onBoostListing?: (housingId: string, title: string, stats: any) => void;
}

export function HousingScreen({ userType, onCreateListing, onBoostListing }: HousingScreenProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    city: '',
    maxPrice: '',
    bedrooms: '',
    furnished: ''
  });

  const filteredHousings = mockHousings.filter(housing => {
    if (filters.city && !housing.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.maxPrice && housing.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms && housing.bedrooms !== parseInt(filters.bedrooms)) return false;
    if (filters.furnished && housing.furnished !== (filters.furnished === 'true')) return false;
    return true;
  });

  const sortedHousings = [...filteredHousings].sort((a, b) => 
    b.sponsored ? 1 : a.sponsored ? -1 : 0
  );

  const toggleFavorite = (housingId: string) => {
    setFavorites(prev => 
      prev.includes(housingId) 
        ? prev.filter(id => id !== housingId)
        : [...prev, housingId]
    );
  };

  const clearFilters = () => {
    setFilters({ city: '', maxPrice: '', bedrooms: '', furnished: '' });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced search header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 sticky top-0 z-10 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Rechercher par ville, quartier..."
                value={filters.city}
                onChange={(e) => setFilters({...filters, city: e.target.value})}
                className="pl-10 bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-200 rounded-xl shadow-sm"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`border-gray-200 rounded-xl shadow-sm ${hasActiveFilters ? 'border-blue-400 bg-blue-50' : 'bg-white/70'}`}
                >
                  <Filter className={`w-4 h-4 ${hasActiveFilters ? 'text-blue-600' : 'text-gray-600'}`} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtres de recherche
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prix maximum</label>
                    <Select value={filters.maxPrice} onValueChange={(value) => setFilters({...filters, maxPrice: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="800">Jusqu'à 800€</SelectItem>
                        <SelectItem value="1000">Jusqu'à 1000€</SelectItem>
                        <SelectItem value="1200">Jusqu'à 1200€</SelectItem>
                        <SelectItem value="1500">Jusqu'à 1500€</SelectItem>
                        <SelectItem value="2000">Jusqu'à 2000€</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de chambres</label>
                    <Select value={filters.bedrooms} onValueChange={(value) => setFilters({...filters, bedrooms: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 chambre</SelectItem>
                        <SelectItem value="2">2 chambres</SelectItem>
                        <SelectItem value="3">3 chambres</SelectItem>
                        <SelectItem value="4">4+ chambres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Ameublement</label>
                    <Select value={filters.furnished} onValueChange={(value) => setFilters({...filters, furnished: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Peu importe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Meublé</SelectItem>
                        <SelectItem value="false">Non meublé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Réinitialiser les filtres
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {hasActiveFilters && (
            <div className="text-sm text-gray-600">
              {filteredHousings.length} logement{filteredHousings.length > 1 ? 's' : ''} trouvé{filteredHousings.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Housing list */}
      <div className="p-4 space-y-6 pb-6">
        {sortedHousings.map((housing) => (
          <Card key={housing.id} className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0">
            {/* Boost badge */}
            {housing.sponsored && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg font-semibold">
                  <Zap className="w-3 h-3 mr-1" />
                  Boosté
                </Badge>
              </div>
            )}
            
            {/* Favorite button */}
            <button
              onClick={() => toggleFavorite(housing.id)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/40 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Heart className={`w-5 h-5 ${favorites.includes(housing.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </button>

            {/* Photo */}
            <div className="aspect-[4/3] relative">
              <img 
                src={housing.photos[0]} 
                alt={housing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Photo count indicator */}
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-black/50 text-white backdrop-blur-md font-medium shadow-lg">
                  📷 {housing.photos.length}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{housing.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{housing.city}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold brand-gradient-3 bg-clip-text text-transparent">
                    {housing.price}€
                  </div>
                  <div className="text-sm text-gray-500">par mois</div>
                </div>
              </div>
              
              {/* Key info */}
              <div className="grid grid-cols-3 gap-4 mb-4 py-3 bg-slate-50 rounded-xl px-4">
                <div className="text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                  <div className="text-sm font-medium">{housing.bedrooms}</div>
                  <div className="text-xs text-gray-500">chambres</div>
                </div>
                <div className="text-center">
                  <Home className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                  <div className="text-sm font-medium">{housing.surface}m²</div>
                  <div className="text-xs text-gray-500">surface</div>
                </div>
                <div className="text-center">
                  <Star className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                  <div className="text-sm font-medium">4.8</div>
                  <div className="text-xs text-gray-500">note</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {housing.description}
              </p>

              {/* Features and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {housing.furnished && (
                    <Badge variant="secondary" className="text-xs bg-sky-50 text-sky-700 border-sky-200 font-medium">
                      🏠 Meublé
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                    <Wifi className="w-3 h-3 mr-1" />
                    Fibre
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-violet-50 text-violet-700 border-violet-200 font-medium">
                    <Car className="w-3 h-3 mr-1" />
                    Parking
                  </Badge>
                </div>
                
                {userType === 'tenant' ? (
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
                    Visiter
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {housing.boosted?.isActive ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onBoostListing?.(housing.id, housing.title, housing.stats || { views: 0, clicks: 0, applications: 0 })}
                        className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-lg"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Actif
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onBoostListing?.(housing.id, housing.title, housing.stats || { views: 0, clicks: 0, applications: 0 })}
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Booster
                      </Button>
                    )}
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
                      Gérer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedHousings.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-1 flex items-center justify-center">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun logement trouvé</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
            <Button 
              onClick={clearFilters}
              className="brand-gradient-1 text-white"
            >
              Voir tous les logements
            </Button>
          </div>
        )}

        {/* CTA Banner - Only show for tenant users */}
        {userType === 'tenant' && (
          <Card className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">🏡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Vous avez un logement ?</h3>
              <p className="text-indigo-100 mb-4">
                Publiez votre annonce et trouvez vos futurs colocataires rapidement
              </p>
              <Button variant="secondary" className="bg-white text-violet-600 hover:bg-violet-50 rounded-xl shadow-lg">
                Publier une annonce
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick create button for property owners */}
        {(userType === 'tenant_with_housing' || userType === 'landlord') && sortedHousings.length === 0 && (
          <Card className="bg-white shadow-lg rounded-2xl border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Home className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune annonce pour le moment</h3>
              <p className="text-gray-600 mb-6">
                Créez votre première annonce pour commencer à recevoir des candidatures
              </p>
              <Button 
                onClick={onCreateListing}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer ma première annonce
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}