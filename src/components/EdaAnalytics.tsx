
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, TrendingUp, BarChart3, PieChart as PieChartIcon, Activity, Zap, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DatasetUpload } from '@/components/DatasetUpload';

interface LeadData {
  company: string;
  score: number;
  industry: string;
  revenue: number;
  employees: number;
  engagement: number;
  conversion: number;
  month: string;
}

export const EdaAnalytics = () => {
  const [mistralApiKey, setMistralApiKey] = useState(localStorage.getItem('mistralApiKey') || '');
  const [insights, setInsights] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedChart, setSelectedChart] = useState('overview');

  // Sample lead data for EDA
  const leadData: LeadData[] = [
    { company: 'TechFlow', score: 92, industry: 'SaaS', revenue: 5000000, employees: 150, engagement: 85, conversion: 23, month: 'Jan' },
    { company: 'DataCorp', score: 87, industry: 'Analytics', revenue: 8000000, employees: 200, engagement: 78, conversion: 19, month: 'Feb' },
    { company: 'CloudVenture', score: 74, industry: 'Cloud', revenue: 3000000, employees: 80, engagement: 65, conversion: 15, month: 'Mar' },
    { company: 'StartupHub', score: 58, industry: 'Consulting', revenue: 1500000, employees: 45, engagement: 52, conversion: 12, month: 'Apr' },
    { company: 'InnovateTech', score: 95, industry: 'AI/ML', revenue: 12000000, employees: 300, engagement: 92, conversion: 28, month: 'May' },
    { company: 'FinTechPro', score: 89, industry: 'FinTech', revenue: 7500000, employees: 180, engagement: 83, conversion: 22, month: 'Jun' },
  ];

  // Industry distribution data
  const industryData = [
    { name: 'SaaS', value: 35, color: '#8884d8' },
    { name: 'AI/ML', value: 25, color: '#82ca9d' },
    { name: 'FinTech', value: 20, color: '#ffc658' },
    { name: 'Analytics', value: 12, color: '#ff7300' },
    { name: 'Cloud', value: 8, color: '#0088fe' },
  ];

  // Score vs Revenue correlation data
  const correlationData = leadData.map(lead => ({
    score: lead.score,
    revenue: lead.revenue / 1000000,
    company: lead.company,
    size: lead.employees,
  }));

  // Performance radar data
  const radarData = [
    { metric: 'Lead Quality', A: 92, B: 87, fullMark: 100 },
    { metric: 'Conversion Rate', A: 85, B: 78, fullMark: 100 },
    { metric: 'Engagement', A: 88, B: 82, fullMark: 100 },
    { metric: 'Revenue Potential', A: 94, B: 89, fullMark: 100 },
    { metric: 'Market Fit', A: 86, B: 91, fullMark: 100 },
    { metric: 'Growth Rate', A: 90, B: 85, fullMark: 100 },
  ];

  const handleMistralApiKeyChange = (value: string) => {
    setMistralApiKey(value);
    localStorage.setItem('mistralApiKey', value);
  };

  const analyzeWithMistral = async () => {
    if (!mistralApiKey) {
      alert('Please enter your Mistral API key first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mistralApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: 'You are an AI lead intelligence analyst. Analyze the provided lead data and provide actionable insights for investment decisions.'
            },
            {
              role: 'user',
              content: `Analyze this lead data: ${JSON.stringify(leadData)}. Provide key insights about lead quality, industry trends, and recommendations for prioritization.`
            }
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      setInsights(data.choices[0].message.content);
    } catch (error) {
      console.error('Error analyzing with Mistral:', error);
      setInsights('Error analyzing data. Please check your API key and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Advanced Analytics & EDA</h2>
          <p className="text-slate-600 mt-1">Comprehensive lead data analysis with AI-powered insights</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <GitBranch className="h-3 w-3 mr-1" />
            HuggingFace Ready
          </Badge>
        </div>
      </div>

      {/* Dataset Upload */}
      <DatasetUpload />

      {/* Mistral AI Configuration */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            Mistral AI Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-2">
              <Label className="text-sm">Mistral API Key</Label>
              <Input
                type="password"
                placeholder="Enter your Mistral API key..."
                value={mistralApiKey}
                onChange={(e) => handleMistralApiKeyChange(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={analyzeWithMistral} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
              {isAnalyzing ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Analyze Leads
                </>
              )}
            </Button>
          </div>
          {insights && (
            <div className="mt-4 p-3 bg-white rounded-lg border max-h-40 overflow-y-auto">
              <h4 className="font-semibold mb-2 text-sm">AI Insights:</h4>
              <p className="text-xs text-slate-700 whitespace-pre-wrap">{insights}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chart Tabs */}
      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-6 w-full min-w-fit">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="distribution" className="text-xs">Distribution</TabsTrigger>
            <TabsTrigger value="correlation" className="text-xs">Correlation</TabsTrigger>
            <TabsTrigger value="trends" className="text-xs">Trends</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs">Comparison</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Charts */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Lead Scores Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: { label: "Score", color: "#8884d8" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" fontSize={10} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <PieChartIcon className="h-4 w-4 mr-2" />
                  Industry Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Percentage", color: "#82ca9d" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={industryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                        fontSize={10}
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Distribution Analysis */}
        <TabsContent value="distribution" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: { label: "Revenue (M)", color: "#ffc658" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" fontSize={10} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="revenue" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Employee Count vs Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    employees: { label: "Employees", color: "#82ca9d" },
                    engagement: { label: "Engagement", color: "#8884d8" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" fontSize={10} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="employees" fill="#82ca9d" />
                      <Bar dataKey="engagement" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Correlation Analysis */}
        <TabsContent value="correlation" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Score vs Revenue Correlation</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: { label: "Lead Score", color: "#8884d8" },
                  revenue: { label: "Revenue (M)", color: "#82ca9d" }
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" name="Lead Score" fontSize={10} />
                    <YAxis dataKey="revenue" name="Revenue (M)" fontSize={10} />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ strokeDasharray: '3 3' }}
                    />
                    <Scatter dataKey="revenue" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Analysis */}
        <TabsContent value="trends" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Lead Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: { label: "Score", color: "#8884d8" },
                  conversion: { label: "Conversion", color: "#82ca9d" }
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={10} />
                    <YAxis fontSize={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="conversion" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Radar */}
        <TabsContent value="performance" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Activity className="h-4 w-4 mr-2" />
                Performance Radar Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  A: { label: "Top Performers", color: "#8884d8" },
                  B: { label: "Average Performers", color: "#82ca9d" }
                }}
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" fontSize={10} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={8} />
                    <Radar name="Top Performers" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar name="Average Performers" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Comparison Charts */}
        <TabsContent value="comparison" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Multi-Metric Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: { label: "Score", color: "#8884d8" },
                    engagement: { label: "Engagement", color: "#82ca9d" },
                    conversion: { label: "Conversion", color: "#ffc658" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="company" fontSize={10} />
                      <YAxis fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="#8884d8" />
                      <Bar dataKey="engagement" fill="#82ca9d" />
                      <Bar dataKey="conversion" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {leadData.slice(0, 4).map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{lead.company}</p>
                        <p className="text-xs text-slate-600">{lead.industry}</p>
                      </div>
                      <div className="flex items-center space-x-3 ml-2">
                        <div className="text-center">
                          <p className="text-sm font-bold text-blue-600">{lead.score}</p>
                          <p className="text-xs text-slate-500">Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-green-600">{lead.conversion}%</p>
                          <p className="text-xs text-slate-500">Conv</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-purple-600">${(lead.revenue / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-slate-500">Rev</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
