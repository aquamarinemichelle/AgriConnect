import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Diagnosis {
  disease: string;
  confidence: number;
}

interface ApiResponse {
  primary_diagnosis: Diagnosis;
  alternative_diagnoses: Diagnosis[];
  diagnosis_type: string;
  recommendations: string;
  animal: string;
  age: number;
  temperature: number;
  symptoms: string[];
}

const LivestockHealth = () => {
  const [animalType, setAnimalType] = useState("");
  const [age, setAge] = useState("");
  const [temperature, setTemperature] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<ApiResponse | null>(null);
  const { toast } = useToast();

  // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9/5) + 32;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!animalType || !symptoms) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      // Parse symptoms from text input (comma-separated)
      const symptomsList = symptoms.split(',').map(s => s.trim()).filter(s => s);
      
      // Convert temperature from Celsius to Fahrenheit for the API
      let temperatureFahrenheit = 101.5; // Default temperature in Fahrenheit
      if (temperature) {
        const tempCelsius = parseFloat(temperature);
        temperatureFahrenheit = celsiusToFahrenheit(tempCelsius);
      }
      
      const response = await fetch('api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          animal: animalType,
          age: age ? parseFloat(age) : 3, // Default age if not provided
          temperature: temperatureFahrenheit, // Use converted temperature
          symptoms: symptomsList
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get diagnosis');
      }

      const data: ApiResponse = await response.json();
      setDiagnosis(data);
      
      toast({
        title: "Analysis complete",
        description: `Primary diagnosis: ${data.primary_diagnosis.disease}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Analysis failed",
        description: "Could not connect to the diagnosis service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatRecommendations = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Check if line starts with a section header (text ending with colon)
      if (line.trim().endsWith(':')) {
        return (
          <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
            {line}
          </h4>
        );
      }
      
      // Check if line starts with bullet point or dash
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.replace(/^[-•]\s*/, '')}
          </li>
        );
      }
      
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent mb-4 shadow-lg">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Livestock Health Checker
            </h1>
            <p className="text-muted-foreground text-lg">
              Get AI-powered health diagnostics for your livestock
            </p>
          </div>

          {/* Form */}
          <Card className="mb-6 shadow-card">
            <CardHeader>
              <CardTitle>Animal Health Assessment</CardTitle>
              <CardDescription>
                Provide details about your animal and observed symptoms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="animalType">
                      Animal Type <span className="text-destructive">*</span>
                    </Label>
                    <Select value={animalType} onValueChange={setAnimalType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow</SelectItem>
                        <SelectItem value="buffalo">Buffalo</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 38.6"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Normal range: ~38.0°C - 39.5°C
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms">
                    Observed Symptoms <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Enter symptoms separated by commas (e.g., loss of appetite, depression, painless lumps, fever, etc.)"
                    rows={4}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate multiple symptoms with commas
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Get Health Assessment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Diagnosis Results */}
          {diagnosis && (
            <Card className="mb-6 shadow-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  Diagnosis Results
                </CardTitle>
                <CardDescription>
                  AI-powered analysis based on provided symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Diagnosis */}
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Primary Diagnosis</h3>
                    <Badge 
                      variant={diagnosis.primary_diagnosis.confidence >= 75 ? "default" : "secondary"}
                      className={
                        diagnosis.primary_diagnosis.confidence >= 75 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                      }
                    >
                      {diagnosis.primary_diagnosis.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="text-xl font-bold text-primary">
                    {diagnosis.primary_diagnosis.disease}
                  </p>
                </div>

                {/* Alternative Diagnoses */}
                {diagnosis.alternative_diagnoses.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Alternative Considerations</h3>
                    <div className="grid gap-2">
                      {diagnosis.alternative_diagnoses.map((alt, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                          <span>{alt.disease}</span>
                          <Badge variant="outline">{alt.confidence}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3">Professional Recommendations</h3>
                  <div className="prose prose-sm max-w-none bg-muted/30 p-4 rounded-lg">
                    {formatRecommendations(diagnosis.recommendations)}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-success/20 bg-success/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  What We Provide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Potential disease identification</p>
                <p>• Urgency level assessment</p>
                <p>• Immediate care instructions</p>
                <p>• Veterinary recommendations</p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-warning/20 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>This tool provides preliminary guidance only.</p>
                <p className="font-medium text-warning">
                  Always consult a licensed veterinarian for proper diagnosis and treatment.
                </p>
                <p>For emergencies, contact your local vet immediately.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LivestockHealth;