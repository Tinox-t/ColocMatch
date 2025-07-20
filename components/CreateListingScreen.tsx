import { useState } from 'react';
import { Camera, MapPin, Euro, Users, Home, Zap, ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

interface CreateListingScreenProps {
  userType: 'tenant_with_housing' | 'landlord';
  onBack: () => void;
  onListingCreated: () => void;
}

export function CreateListingScreen({ userType, onBack, onListingCreated }: CreateListingScreenProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    price: '',
    charges: '',
    bedrooms: '',
    surface: '',
    roommatesNeeded: '',
    furnished: false,
    photos: [] as string[]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const mockPhotos = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  ];

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPhoto = () => {
    if (formData.photos.length < 5) {
      const newPhoto = mockPhotos[formData.photos.length % mockPhotos.length];
      updateField('photos', [...formData.photos, newPhoto]);
    }
  };

  const removePhoto = (index: number) => {
    updateField('photos', formData.photos.filter((_, i) => i !== index));
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.address && formData.city;
      case 2:
        return formData.price && formData.bedrooms && formData.surface && formData.roommatesNeeded;
      case 3:
        return formData.photos.length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // Simulate API call
    console.log('Creating listing:', formData);
    onListingCreated();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-1 flex items-center justify-center">
          <Home className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Décrivez votre logement</h2>
        <p className="text-gray-600">Commençons par les informations de base</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Titre de l'annonce *</label>
          <Input
            placeholder="Ex: Appartement 3 pièces avec balcon"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            className="bg-gray-50"
          />
        </div>

        <div>
          <label className="block mb-2">Description *</label>
          <Textarea
            placeholder="Décrivez votre logement, ses atouts, l'ambiance recherchée..."
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={4}
            className="bg-gray-50"
          />
        </div>

        <div>
          <label className="block mb-2">Adresse complète *</label>
          <Input
            placeholder="Ex: 15 rue de la Paix, 75001 Paris"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            className="bg-gray-50"
          />
          <p className="text-sm text-gray-500 mt-1">L'adresse exacte ne sera visible qu'après contact</p>
        </div>

        <div>
          <label className="block mb-2">Ville *</label>
          <Select value={formData.city} onValueChange={(value) => updateField('city', value)}>
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paris">Paris</SelectItem>
              <SelectItem value="Lyon">Lyon</SelectItem>
              <SelectItem value="Marseille">Marseille</SelectItem>
              <SelectItem value="Toulouse">Toulouse</SelectItem>
              <SelectItem value="Nice">Nice</SelectItem>
              <SelectItem value="Nantes">Nantes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-3 flex items-center justify-center">
          <Euro className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Détails financiers</h2>
        <p className="text-gray-600">Précisez le loyer et les caractéristiques</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Loyer mensuel *</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="1200"
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              className="bg-gray-50 pr-8"
            />
            <Euro className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block mb-2">Charges mensuelles</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="150"
              value={formData.charges}
              onChange={(e) => updateField('charges', e.target.value)}
              className="bg-gray-50 pr-8"
            />
            <Euro className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Nombre de chambres *</label>
          <Select value={formData.bedrooms} onValueChange={(value) => updateField('bedrooms', value)}>
            <SelectTrigger className="bg-gray-50">
              <SelectValue placeholder="Chambres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 chambre</SelectItem>
              <SelectItem value="2">2 chambres</SelectItem>
              <SelectItem value="3">3 chambres</SelectItem>
              <SelectItem value="4">4 chambres</SelectItem>
              <SelectItem value="5">5+ chambres</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-2">Surface (m²) *</label>
          <Input
            type="number"
            placeholder="65"
            value={formData.surface}
            onChange={(e) => updateField('surface', e.target.value)}
            className="bg-gray-50"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Nombre de colocataires recherchés *</label>
        <Select value={formData.roommatesNeeded} onValueChange={(value) => updateField('roommatesNeeded', value)}>
          <SelectTrigger className="bg-gray-50">
            <SelectValue placeholder="Colocataires recherchés" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 colocataire</SelectItem>
            <SelectItem value="2">2 colocataires</SelectItem>
            <SelectItem value="3">3 colocataires</SelectItem>
            <SelectItem value="4">4+ colocataires</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">Logement meublé</h4>
          <p className="text-sm text-gray-600">Le logement est-il déjà meublé ?</p>
        </div>
        <Switch
          checked={formData.furnished}
          onCheckedChange={(checked) => updateField('furnished', checked)}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-2 flex items-center justify-center">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Photos du logement</h2>
        <p className="text-gray-600">Ajoutez des photos pour attirer plus de candidats</p>
      </div>

      {/* Photo upload area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="font-medium text-gray-900 mb-2">Ajoutez vos photos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Les annonces avec photos reçoivent 5x plus de candidatures
        </p>
        <Button onClick={addPhoto} className="brand-gradient-1 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une photo
        </Button>
      </div>

      {/* Photo grid */}
      {formData.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {formData.photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              {index === 0 && (
                <Badge className="absolute bottom-2 left-2 bg-blue-500 text-white">
                  Photo principale
                </Badge>
              )}
            </div>
          ))}
        </div>
      )}

      {formData.photos.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {formData.photos.length}/5 photos ajoutées
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-gray-900">Publier une annonce</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-sm text-gray-600">Étape {currentStep} sur {totalSteps}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <div 
                className="brand-gradient-1 h-1 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-4">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Précédent
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceedToNext()}
              className={`${currentStep === 1 ? 'w-full' : 'flex-1'} ${
                canProceedToNext() 
                  ? 'brand-gradient-1 text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              Suivant
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceedToNext()}
              className={`flex-1 ${
                canProceedToNext() 
                  ? 'brand-gradient-2 text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              Publier l'annonce
            </Button>
          )}
        </div>

        {currentStep === totalSteps && canProceedToNext() && (
          <div className="text-center">
            <Button
              variant="outline"
              className="brand-gradient-3 text-white border-transparent"
            >
              <Zap className="w-4 h-4 mr-2" />
              Booster cette annonce
            </Button>
            <p className="text-xs text-gray-500 mt-2">Optionnel : augmentez votre visibilité</p>
          </div>
        )}
      </div>
    </div>
  );
}