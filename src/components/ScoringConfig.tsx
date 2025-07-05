
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw, Brain } from 'lucide-react';

export const ScoringConfig = () => {
  const [keywordWeights, setKeywordWeights] = useState({
    saas: 85,
    technology: 75,
    startup: 70,
    enterprise: 80,
    innovation: 65,
  });

  const [industryPreferences, setIndustryPreferences] = useState({
    saas: true,
    fintech: true,
    healthtech: true,
    edtech: false,
    ecommerce: true,
  });

  const [aiSettings, setAiSettings] = useState({
    confidence_threshold: 70,
    auto_rescore: true,
    learning_mode: true,
  });

  const handleKeywordWeightChange = (keyword: string, value: number) => {
    setKeywordWeights(prev => ({
      ...prev,
      [keyword]: value
    }));
  };

  const handleIndustryToggle = (industry: string, enabled: boolean) => {
    setIndustryPreferences(prev => ({
      ...prev,
      [industry]: enabled
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">AI Scoring Configuration</h2>
          <p className="text-slate-600 mt-2">Fine-tune the AI model parameters for optimal lead scoring</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Weights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Keyword Weights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(keywordWeights).map(([keyword, weight]) => (
              <div key={keyword} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="capitalize">{keyword}</Label>
                  <span className="text-sm font-medium">{weight}%</span>
                </div>
                <Slider
                  value={[weight]}
                  onValueChange={(value) => handleKeywordWeightChange(keyword, value[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            ))}
            <Separator />
            <div className="flex items-center space-x-2">
              <Input placeholder="Add new keyword..." className="flex-1" />
              <Button size="sm">Add</Button>
            </div>
          </CardContent>
        </Card>

        {/* Industry Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Industry Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(industryPreferences).map(([industry, enabled]) => (
              <div key={industry} className="flex items-center justify-between">
                <Label className="capitalize">{industry.replace('tech', ' Tech')}</Label>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => handleIndustryToggle(industry, checked)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Model Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Model Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Confidence Threshold</Label>
              <div className="space-y-2">
                <Slider
                  value={[aiSettings.confidence_threshold]}
                  onValueChange={(value) => setAiSettings(prev => ({
                    ...prev,
                    confidence_threshold: value[0]
                  }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <span className="text-sm text-slate-600">{aiSettings.confidence_threshold}%</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Auto Re-scoring</Label>
                <Switch
                  checked={aiSettings.auto_rescore}
                  onCheckedChange={(checked) => setAiSettings(prev => ({
                    ...prev,
                    auto_rescore: checked
                  }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Learning Mode</Label>
                <Switch
                  checked={aiSettings.learning_mode}
                  onCheckedChange={(checked) => setAiSettings(prev => ({
                    ...prev,
                    learning_mode: checked
                  }))}
                />
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Model Performance</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision:</span>
                    <span className="font-medium">91.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall:</span>
                    <span className="font-medium">89.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
