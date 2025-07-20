import { Shield, Wifi, Truck, Zap, ExternalLink, Star, ChevronRight, Gift, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockServices } from '../data/mockData';

const iconMap = {
  Shield,
  Wifi, 
  Truck,
  Zap
};

const serviceOffers = [
  {
    id: 'insurance_special',
    title: '3 mois d\'assurance offerts',
    description: 'Souscrivez avant le 31 janvier',
    discount: '-40%',
    service: 'AssuranceHabitat+'
  },
  {
    id: 'internet_promo',
    title: 'Installation gratuite',
    description: 'Fibre optique sous 48h',
    discount: 'Gratuit',
    service: 'FibreMax'
  }
];

export function ServicesScreen() {
  return (
    <div className="min-h-full bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="p-6 space-y-6 pb-6">
        {/* Hero section */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-1 flex items-center justify-center">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Services partenaires</h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            Tous les services essentiels pour votre colocation avec des tarifs négociés
          </p>
        </div>

        {/* Special offers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Gift className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Offres limitées</h2>
            <Badge className="bg-orange-100 text-orange-700">
              <Clock className="w-3 h-3 mr-1" />
              Expire bientôt
            </Badge>
          </div>
          
          {serviceOffers.map((offer) => (
            <Card key={offer.id} className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{offer.title}</h4>
                      <Badge className="bg-orange-500 text-white text-xs">
                        {offer.discount}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{offer.description}</p>
                    <p className="text-xs text-gray-500">Par {offer.service}</p>
                  </div>
                  <Button size="sm" className="brand-gradient-2 text-white shadow-lg">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Profiter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Tous nos partenaires</h2>
          
          {mockServices.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <Card key={service.id} className="bg-white hover:shadow-lg transition-all duration-200 hover:scale-[1.01] border border-gray-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${service.color} shadow-sm`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                          <Badge variant="secondary" className="text-xs capitalize mb-2">
                            {service.category === 'insurance' && '🛡️ Assurance'}
                            {service.category === 'internet' && '🌐 Internet'}
                            {service.category === 'moving' && '📦 Déménagement'}
                            {service.category === 'utilities' && '⚡ Énergie'}
                          </Badge>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Features list */}
                      <div className="space-y-2 mb-4">
                        {service.category === 'insurance' && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Couverture colocation incluse
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Responsabilité civile étendue
                            </div>
                          </>
                        )}
                        {service.category === 'internet' && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Débit jusqu'à 1 Gb/s
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Installation sous 48h
                            </div>
                          </>
                        )}
                        {service.category === 'moving' && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Devis gratuit en ligne
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Tarif étudiant disponible
                            </div>
                          </>
                        )}
                        {service.category === 'utilities' && (
                          <>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              100% énergie verte
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              Tarif fixe 2 ans
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          ⭐ 4.8/5 • {Math.floor(Math.random() * 5000) + 1000} avis
                        </div>
                        
                        <Button className="brand-gradient-1 text-white shadow-lg hover:shadow-xl transition-shadow">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Découvrir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Partnership CTA */}
        <Card className="brand-gradient-1 text-white">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-2">Vous êtes un professionnel ?</h3>
            <p className="text-indigo-100 mb-4">
              Rejoignez notre réseau de partenaires et proposez vos services à notre communauté
            </p>
            <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
              Devenir partenaire
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Questions fréquentes</h2>
          <div className="space-y-3">
            {[
              {
                question: "Les tarifs sont-ils vraiment avantageux ?",
                answer: "Oui, nous négocions des tarifs préférentiels exclusifs pour notre communauté."
              },
              {
                question: "Comment sont sélectionnés les partenaires ?",
                answer: "Nous choisissons uniquement des entreprises de confiance avec d'excellents avis clients."
              },
              {
                question: "Puis-je résilier facilement ?",
                answer: "Chaque service a ses conditions de résiliation. Consultez les détails avant de souscrire."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white border-gray-100">
                <CardContent className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}