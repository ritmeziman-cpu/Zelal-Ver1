
import React from 'react';
import { Home, Compass, Calendar, User } from 'lucide-react';
import { AppView } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden shadow-2xl">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          active={activeView === 'home'} 
          onClick={() => onViewChange('home')} 
        />
        <NavItem 
          icon={<Compass size={24} />} 
          label="Discover" 
          active={activeView === 'discover'} 
          onClick={() => onViewChange('discover')} 
        />
        <NavItem 
          icon={<Calendar size={24} />} 
          label="Calendar" 
          active={activeView === 'learn'} 
          onClick={() => onViewChange('learn')} 
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Profile" 
          active={activeView === 'profile'} 
          onClick={() => onViewChange('profile')} 
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#7C6AF7]' : 'text-gray-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
  </button>
);

export default Layout;
