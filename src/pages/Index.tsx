
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { LeadMetrics } from '@/components/LeadMetrics';
import { LeadsTable } from '@/components/LeadsTable';
import { ScoringConfig } from '@/components/ScoringConfig';
import { EdaAnalytics } from '@/components/EdaAnalytics';
import { HuggingFaceDeployment } from '@/components/HuggingFaceDeployment';
import { MistralChat } from '@/components/MistralChat';
import { useState } from 'react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <LeadMetrics />
              <LeadsTable />
            </div>
          )}
          {activeTab === 'analytics' && <EdaAnalytics />}
          {activeTab === 'ai-models' && <HuggingFaceDeployment />}
          {activeTab === 'mistral-chat' && <MistralChat />}
          {activeTab === 'config' && <ScoringConfig />}
        </main>
      </div>
    </div>
  );
};

export default Index;
