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
  is_plant?: boolean;              // ✅ NEW
  reason?: string;                 // ✅ NEW
  primary_diagnosis?: CropDiagnosis;
  alternative_diagnoses?: CropDiagnosis[];
  recommendations?: string;
  plant_type?: string;
}

const CropScanner = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<CropApiResponse | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
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
      setDiagnosis(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const base64Data = selectedImage.split(",")[1];
      const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());

      const formData = new FormData();
      formData.append("image", blob, "plant_image.jpg");

      const response = await fetch("/api/crop/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data: CropApiResponse = await response.json();

      // 🔒 PLANT PRESENCE GATE
      if (data.is_plant === false) {
        toast({
          title: "Invalid image",
          description: data.reason || "The uploaded image does not contain a detectable plant or leaf.",
          variant: "destructive",
        });
        return;
      }

      setDiagnosis(data);

      toast({
        title: data.primary_diagnosis?.is_healthy ? "Plant is Healthy" : "Disease Detected",
        description: data.primary_diagnosis?.disease,
      });

    } catch (err) {
      toast({
        title: "Analysis failed",
        description: "Could not analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Crop Disease Scanner</CardTitle>
            <CardDescription>
              Upload a clear leaf image for AI-powered disease detection
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            {selectedImage && (
              <img
                src={selectedImage}
                className="w-full h-64 object-cover rounded"
                alt="Uploaded plant"
              />
            )}

            <label htmlFor="image-upload" className="sr-only">Upload plant image</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isAnalyzing}
              title="Upload a plant image file"
              aria-label="Upload a plant image file"
            />

            <Button
              onClick={handleAnalyze}
              disabled={!selectedImage || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {diagnosis && diagnosis.primary_diagnosis && (
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-lg">
                {diagnosis.primary_diagnosis.disease}
              </p>
              <p className="text-sm text-muted-foreground">
                Confidence: {diagnosis.primary_diagnosis.confidence}%
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CropScanner;
