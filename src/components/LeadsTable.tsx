
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Upload, Download } from 'lucide-react';

export const LeadsTable = () => {
  const [leads] = useState([
    {
      id: 1,
      company: 'TechFlow Systems',
      website: 'techflow.com',
      score: 92,
      industry: 'SaaS',
      status: 'High Priority',
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      company: 'DataCorp Analytics',
      website: 'datacorp.io',
      score: 87,
      industry: 'Analytics',
      status: 'High Priority',
      lastUpdated: '2024-01-14',
    },
    {
      id: 3,
      company: 'CloudVenture Ltd',
      website: 'cloudventure.net',
      score: 74,
      industry: 'Cloud Services',
      status: 'Medium',
      lastUpdated: '2024-01-13',
    },
    {
      id: 4,
      company: 'StartupHub Inc',
      website: 'startuphub.com',
      score: 58,
      industry: 'Consulting',
      status: 'Low Priority',
      lastUpdated: '2024-01-12',
    },
    {
      id: 5,
      company: 'InnovateTech Solutions',
      website: 'innovatetech.ai',
      score: 95,
      industry: 'AI/ML',
      status: 'High Priority',
      lastUpdated: '2024-01-11',
    },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'High Priority': 'bg-red-100 text-red-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low Priority': 'bg-gray-100 text-gray-800',
    };
    return variants[status as keyof typeof variants] || variants['Low Priority'];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Lead Database</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Website</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">AI Score</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Industry</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Last Updated</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-slate-900">{lead.company}</div>
                  </td>
                  <td className="py-4 px-4">
                    <a 
                      href={`https://${lead.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      {lead.website}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-sm px-2 py-1 rounded ${getScoreColor(lead.score)}`}>
                        {lead.score}
                      </span>
                      <Progress value={lead.score} className="w-16 h-2" />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-slate-600">{lead.industry}</span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusBadge(lead.status)}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-slate-500 text-sm">
                    {lead.lastUpdated}
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
