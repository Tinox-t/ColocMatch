import { useState } from 'react';
import { Camera, MapPin, Euro, Settings, Heart, Home, Star, Eye, EyeOff, Edit3, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';

interface ProfileScreenProps {
  userType?: 'tenant' | 'tenant_with_housing' | 'landlord' | null;
}

export function ProfileScreen({ userType }: ProfileScreenProps) {
  const [profile, setProfile] = useState({
    name: 'Marie Dubois',
    age: 23,
    city: 'Lyon',
    budget: 700,
    description: 'Étudiante en commerce international, j\'aime cuisiner et découvrir de nouveaux endroits !',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    preferences: {
      smoker: false,
      pets: true,
      homeWorking: true,
      partyPerson: false,
      profileVisible: true,
      profilePaused: false
    },
    lifestyle: {
      cleanliness: 80,
      socialLevel: 60,
      noiseLevel: 30,
      guestsFrequency: 40
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    likes: 47,
    matches: 12,
    favoritedHousings: 8,
    profileViews: 156
  };

  const updateProfile = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const getVisibilityStatus = () => {
    if (profile.preferences.profilePaused) return { text: 'Profil en pause', color: 'bg-yellow-100 text-yellow-700', icon: EyeOff };
    if (!profile.preferences.profileVisible) return { text: 'Profil masqué', color: 'bg-gray-100 text-gray-700', icon: EyeOff };
    return { text: 'Profil actif', color: 'bg-green-100 text-green-700', icon: Eye };
  };

  const visibilityStatus = getVisibilityStatus();

  return (
    <div className="min-h-full bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="p-4 space-y-6 pb-6">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="profile" className="data-[state=active]:brand-gradient-2 data-[state=active]:text-white">
              Profil
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:brand-gradient-1 data-[state=active]:text-white">
              Préférences
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:brand-gradient-3 data-[state=active]:text-white">
              Activité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            {/* Profile header */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={profile.photo} />
                        <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <button className="absolute -bottom-2 -right-2 p-2 brand-gradient-2 text-white rounded-full hover:shadow-lg transition-shadow">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{profile.name}, {profile.age}</h2>
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {profile.city}
                      </div>
                      <Badge className={`${visibilityStatus.color} flex items-center gap-1`}>
                        <visibilityStatus.icon className="w-3 h-3" />
                        {visibilityStatus.text}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={isEditing ? 'brand-gradient-3 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Sauvegarder' : 'Modifier'}
                  </Button>
                </div>

                {/* Profile visibility controls */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Profil visible</h4>
                      <p className="text-xs text-gray-600">Apparaît dans les recherches</p>
                    </div>
                    <Switch 
                      checked={profile.preferences.profileVisible && !profile.preferences.profilePaused}
                      onCheckedChange={(checked) => {
                        updateProfile('preferences.profileVisible', checked);
                        if (checked) updateProfile('preferences.profilePaused', false);
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Mettre en pause</h4>
                      <p className="text-xs text-gray-600">Temporairement invisible</p>
                    </div>
                    <Switch 
                      checked={profile.preferences.profilePaused}
                      onCheckedChange={(checked) => {
                        updateProfile('preferences.profilePaused', checked);
                        if (checked) updateProfile('preferences.profileVisible', false);
                      }}
                    />
                  </div>
                </div>

                {/* Profile stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Vues', value: stats.profileViews, icon: '👁️' },
                    { label: 'Likes', value: stats.likes, icon: '❤️' },
                    { label: 'Matchs', value: stats.matches, icon: '⭐' },
                    { label: 'Favoris', value: stats.favoritedHousings, icon: '🏠' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profile form */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-2">Nom complet</label>
                    <Input 
                      value={profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Âge</label>
                    <Input 
                      type="number"
                      value={profile.age}
                      onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-2">Ville recherchée</label>
                    <Input 
                      value={profile.city}
                      onChange={(e) => updateProfile('city', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Budget maximum</label>
                    <div className="relative">
                      <Input 
                        type="number"
                        value={profile.budget}
                        onChange={(e) => updateProfile('budget', parseInt(e.target.value))}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-gray-50' : ''}
                      />
                      <Euro className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Description</label>
                  <Textarea 
                    value={profile.description}
                    onChange={(e) => updateProfile('description', e.target.value)}
                    rows={3}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                    placeholder="Parlez un peu de vous, vos passions, votre mode de vie..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle preferences */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Style de vie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'cleanliness', label: 'Propreté', icon: '🧹', description: 'À quel point êtes-vous ordonné(e) ?' },
                  { key: 'socialLevel', label: 'Sociabilité', icon: '🎉', description: 'Aimez-vous recevoir des amis ?' },
                  { key: 'noiseLevel', label: 'Tolérance au bruit', icon: '🔊', description: 'Supportez-vous le bruit ?' },
                  { key: 'guestsFrequency', label: 'Fréquence d\'invités', icon: '👥', description: 'Combien d\'invités recevez-vous ?' }
                ].map((item) => (
                  <div key={item.key}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {profile.lifestyle[item.key as keyof typeof profile.lifestyle]}%
                      </span>
                    </div>
                    <Slider
                      value={[profile.lifestyle[item.key as keyof typeof profile.lifestyle]]}
                      onValueChange={(value) => updateProfile(`lifestyle.${item.key}`, value[0])}
                      max={100}
                      step={10}
                      disabled={!isEditing}
                      className="mb-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Préférences de colocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'smoker', label: 'Fumeur', description: 'Je fume ou j\'accepte les fumeurs', icon: '🚬' },
                  { key: 'pets', label: 'Animaux', description: 'J\'ai ou j\'accepte les animaux de compagnie', icon: '🐕' },
                  { key: 'homeWorking', label: 'Télétravail', description: 'Je travaille souvent depuis chez moi', icon: '💻' },
                  { key: 'partyPerson', label: 'Fêtard', description: 'J\'aime organiser des soirées', icon: '🎉' }
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{pref.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{pref.label}</h4>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={profile.preferences[pref.key as keyof typeof profile.preferences] as boolean}
                      onCheckedChange={(checked) => updateProfile(`preferences.${pref.key}`, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-red-600">Zone de danger</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Supprimer mon compte</h4>
                  <p className="text-sm text-red-700 mb-4">
                    Cette action est irréversible. Toutes vos données seront supprimées définitivement.
                  </p>
                  <Button variant="destructive" className="w-full">
                    Supprimer définitivement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {/* Enhanced stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Vues du profil', value: stats.profileViews, icon: Eye, color: 'bg-blue-100 text-blue-600' },
                { label: 'Likes donnés', value: stats.likes, icon: Heart, color: 'bg-pink-100 text-pink-600' },
                { label: 'Matchs obtenus', value: stats.matches, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
                { label: 'Logements favoris', value: stats.favoritedHousings, icon: Home, color: 'bg-green-100 text-green-600' }
              ].map((stat, index) => (
                <Card key={index} className="bg-white shadow-sm">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent activity */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: 'Match avec Lucas', time: 'Il y a 2 heures', icon: '⭐', color: 'bg-yellow-50 border-yellow-200' },
                  { action: 'Logement ajouté aux favoris', time: 'Hier', icon: '🏠', color: 'bg-green-50 border-green-200' },
                  { action: 'Profil consulté par Emma', time: 'Il y a 2 jours', icon: '👁️', color: 'bg-blue-50 border-blue-200' },
                  { action: 'Like envoyé à Sophie', time: 'Il y a 3 jours', icon: '❤️', color: 'bg-pink-50 border-pink-200' },
                  { action: 'Profil mis à jour', time: 'Il y a 5 jours', icon: '✏️', color: 'bg-gray-50 border-gray-200' }
                ].map((activity, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${activity.color}`}>
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Profile boost CTA */}
            <Card className="brand-gradient-2 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="text-xl font-semibold text-white mb-2">Boostez votre profil</h3>
                <p className="text-pink-100 mb-4">
                  Obtenez 10x plus de vues et de matchs avec ColocMatch Premium
                </p>
                <Button variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50">
                  <Star className="w-4 h-4 mr-2" />
                  Découvrir Premium
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}