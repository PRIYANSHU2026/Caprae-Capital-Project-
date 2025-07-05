
import React from 'react';
import { BarChart3, Settings, Users, Target, Brain, TrendingUp, Cpu, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'analytics', label: 'EDA Analytics', icon: TrendingUp },
    { id: 'ai-models', label: 'AI Models', icon: Cpu },
    { id: 'scoring', label: 'AI Scoring', icon: Brain },
    { id: 'mistral-chat', label: 'Mistral Chat', icon: MessageCircle },
    { id: 'config', label: 'Configuration', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/274dd21b-1a7d-4ff2-ad35-5aaf55e49099.png" 
              alt="Caprae Capital Logo" 
              className="h-8 w-8 object-contain"
            />
            <Target className="h-8 w-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Caprae Capital</h1>
            <p className="text-slate-400 text-sm">Lead Intelligence</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
