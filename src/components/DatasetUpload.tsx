
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Download, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DatasetUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const downloadSampleData = () => {
    const sampleData = [
      'company,score,industry,revenue,employees,engagement,conversion',
      'TechFlow,92,SaaS,5000000,150,85,23',
      'DataCorp,87,Analytics,8000000,200,78,19',
      'CloudVenture,74,Cloud,3000000,80,65,15',
      'StartupHub,58,Consulting,1500000,45,52,12',
      'InnovateTech,95,AI/ML,12000000,300,92,28'
    ].join('\n');

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_lead_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2 text-green-600" />
          Dataset Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop your CSV file here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports CSV files up to 10MB
            </p>
            <Input
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                <FileText className="h-4 w-4 mr-2" />
                Select File
              </Button>
            </Label>
          </div>

          {/* Upload Status */}
          {uploadedFile && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="font-medium text-green-800">{uploadedFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700">
                Ready to Analyze
              </Badge>
            </div>
          )}

          {/* Sample Data Download */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h4 className="font-medium">Need sample data?</h4>
              <p className="text-sm text-gray-600">
                Download our sample lead dataset to get started
              </p>
            </div>
            <Button onClick={downloadSampleData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Sample CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
