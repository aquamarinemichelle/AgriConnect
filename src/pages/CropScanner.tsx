import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Leaf, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CropDiagnosis {
  disease: string;
  confidence: number;
  is_healthy: boolean;
}

interface CropApiResponse {
  primary_diagnosis: CropDiagnosis;
  alternative_diagnoses: CropDiagnosis[];
  recommendations: string;
  plant_type?: string;
}

const CropScanner = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<CropApiResponse | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setDiagnosis(null); // Clear previous diagnosis
        toast({
          title: "Image uploaded",
          description: "Ready to analyze for diseases",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload a plant leaf image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      // Convert base64 to blob for upload
      const base64Data = selectedImage.split(',')[1]; // Remove data:image/... prefix
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());

      const formData = new FormData();
      formData.append('image', blob, 'plant_image.jpg');

      console.log('Sending request to backend...');

      const response = await fetch('/api/crop/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      
      // Check if response is HTML (error case)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        const htmlText = await response.text();
        console.error('Received HTML instead of JSON:', htmlText.substring(0, 500));
        throw new Error('Backend returned HTML page instead of JSON response');
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data: CropApiResponse = await response.json();
      console.log('Received diagnosis:', data);
      setDiagnosis(data);
      
      toast({
        title: data.primary_diagnosis.is_healthy ? "Plant is Healthy!" : "Disease Detected",
        description: `Diagnosis: ${data.primary_diagnosis.disease}`,
        variant: data.primary_diagnosis.is_healthy ? "default" : "destructive",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : "Could not analyze the image. Please try again.";
      
      // Provide more specific error messages
      let userMessage = errorMessage;
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network')) {
        userMessage = "Network error: Could not connect to the server. Please check your connection and try again.";
      } else if (errorMessage.includes('HTML')) {
        userMessage = "Server error: Backend is not responding correctly. Please try again later.";
      }
      
      toast({
        title: "Analysis failed",
        description: userMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Test backend connection
  const testBackendConnection = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.text();
      console.log('Backend health check:', data);
      toast({
        title: "Backend connected",
        description: "Successfully connected to the backend server",
      });
    } catch (error) {
      console.error('Backend connection test failed:', error);
      toast({
        title: "Backend connection failed",
        description: "Could not connect to the backend server",
        variant: "destructive",
      });
    }
  };

  const formatRecommendations = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Check for section headers (text ending with colon)
      if (line.trim().endsWith(':')) {
        return (
          <h4 key={index} className="font-semibold text-foreground mt-4 mb-2 text-lg">
            {line}
          </h4>
        );
      }
      
      // Check for bullet points
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <li key={index} className="ml-4 list-disc mb-1">
            {line.replace(/^[-•]\s*/, '')}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  // Function to extract plant type from disease name
  const extractPlantType = (diseaseName: string) => {
    const plantTypes = [
      'Tomato', 'Potato', 'Corn', 'Rice', 'Wheat', 'Apple', 'Grape', 
      'Strawberry', 'Pepper', 'Cucumber', 'Soybean', 'Cotton'
    ];
    
    for (const plant of plantTypes) {
      if (diseaseName.toLowerCase().includes(plant.toLowerCase())) {
        return plant;
      }
    }
    
    // Try to extract from common patterns
    if (diseaseName.includes('_')) {
      const parts = diseaseName.split('_');
      if (parts.length > 1) {
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      }
    }
    
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-primary mb-4 shadow-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Crop Disease Scanner
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload a leaf image for instant AI-powered disease diagnosis
            </p>
            
            {/* Backend Connection Test Button - Remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={testBackendConnection}
                className="mt-4"
              >
                Test Backend Connection
              </Button>
            )}
          </div>

          {/* Upload Section */}
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle>Upload Plant Image</CardTitle>
              <CardDescription>
                Take a clear photo of the affected leaf for accurate diagnosis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                {selectedImage ? (
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Selected plant"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setDiagnosis(null);
                      }}
                      className="w-full mt-4"
                      disabled={isAnalyzing}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <label className="w-full max-w-md">
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors bg-gradient-card">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isAnalyzing}
                    />
                  </label>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full max-w-md"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Plant Health...
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5 mr-2" />
                      Analyze Plant Health
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis Results */}
          {diagnosis && (
            <Card className="mb-6 shadow-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-primary" />
                  Diagnosis Results
                </CardTitle>
                <CardDescription>
                  AI-powered analysis based on leaf image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Diagnosis */}
                <div className={`p-4 rounded-lg border ${
                  diagnosis.primary_diagnosis.is_healthy 
                    ? 'bg-success/5 border-success/20' 
                    : 'bg-destructive/5 border-destructive/20'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      {diagnosis.primary_diagnosis.is_healthy ? 'Healthy Plant' : 'Disease Detected'}
                    </h3>
                    <Badge 
                      variant={diagnosis.primary_diagnosis.confidence >= 75 ? "default" : "secondary"}
                      className={
                        diagnosis.primary_diagnosis.confidence >= 75 
                          ? diagnosis.primary_diagnosis.is_healthy
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {diagnosis.primary_diagnosis.confidence}% confidence
                    </Badge>
                  </div>
                  <p className={`text-xl font-bold ${
                    diagnosis.primary_diagnosis.is_healthy ? 'text-success' : 'text-destructive'
                  }`}>
                    {diagnosis.primary_diagnosis.disease}
                  </p>
                  {(diagnosis.plant_type || extractPlantType(diagnosis.primary_diagnosis.disease)) && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Plant type: {diagnosis.plant_type || extractPlantType(diagnosis.primary_diagnosis.disease)}
                    </p>
                  )}
                </div>

                {/* Alternative Diagnoses */}
                {diagnosis.alternative_diagnoses && diagnosis.alternative_diagnoses.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Alternative Considerations</h3>
                    <div className="grid gap-2">
                      {diagnosis.alternative_diagnoses.map((alt, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                          <span className="font-medium">{alt.disease}</span>
                          <Badge variant="outline" className={
                            alt.confidence >= 75 
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }>
                            {alt.confidence}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3">Treatment Recommendations</h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="space-y-3 text-sm">
                      {formatRecommendations(diagnosis.recommendations)}
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-warning mb-1">Important Note</h4>
                      <p className="text-sm text-muted-foreground">
                        This AI analysis provides preliminary guidance only. For accurate diagnosis and treatment, 
                        please consult with agricultural experts or professional plant pathologists.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-success" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  Upload a clear image of the affected leaf
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  Our AI analyzes the image for disease patterns
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  Get instant diagnosis with confidence levels
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  Receive treatment recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-warning/20 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  Tips for Best Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-warning">•</span>
                  Ensure good lighting with minimal shadows
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-warning">•</span>
                  Focus on the affected area of the leaf
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-warning">•</span>
                  Avoid blurry or low-quality images
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-warning">•</span>
                  Capture the entire leaf when possible
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CropScanner;