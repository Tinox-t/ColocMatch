import { Heart, Home, Briefcase, LayoutDashboard, User, Building, Users } from 'lucide-react';
import { Button } from './ui/button';

type UserType = 'tenant' | 'tenant_with_housing' | 'landlord';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType?: UserType | null;
}

export function BottomNavigation({ activeTab, onTabChange, userType }: BottomNavigationProps) {
  // Define tabs based on user type
  const getTabsForUserType = () => {
    const baseTabs = [
      { 
        id: 'swipe', 
        label: userType === 'tenant' ? 'Match' : 'Profils', 
        icon: userType === 'tenant' ? Heart : Users, 
        activeClass: 'text-pink-600 bg-pink-50',
        inactiveClass: 'text-gray-400'
      },
      { 
        id: 'housing', 
        label: userType === 'tenant' ? 'Logements' : 'Mes annonces', 
        icon: userType === 'landlord' ? Building : Home, 
        activeClass: 'text-emerald-600 bg-emerald-50',
        inactiveClass: 'text-gray-400'
      },
      { 
        id: 'services', 
        label: 'Services', 
        icon: Briefcase, 
        activeClass: 'text-violet-600 bg-violet-50',
        inactiveClass: 'text-gray-400'
      }
    ];

    // Add dashboard only for tenant users (colocation management)
    if (userType === 'tenant') {
      baseTabs.push({
        id: 'dashboard', 
        label: 'Gestion', 
        icon: LayoutDashboard, 
        activeClass: 'text-teal-600 bg-teal-50',
        inactiveClass: 'text-gray-400'
      });
    }

    // Add profile tab
    baseTabs.push({
      id: 'profile', 
      label: 'Profil', 
      icon: User, 
      activeClass: 'text-rose-600 bg-rose-50',
      inactiveClass: 'text-gray-400'
    });

    return baseTabs;
  };

  const tabs = getTabsForUserType();

  return (
    <div className="bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-2 h-auto rounded-none transition-all duration-300 ${
                isActive 
                  ? `${tab.activeClass} shadow-inner scale-105` 
                  : `${tab.inactiveClass} hover:bg-gray-50`
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${
                isActive ? 'scale-125' : 'scale-100'
              }`} />
              <span className={`text-xs font-semibold transition-colors duration-300 ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {tab.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-current rounded-b-full shadow-lg" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}