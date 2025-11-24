import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Sprout, Trees, Wheat, Carrot, Apple } from "lucide-react";

const CropAnalytics = () => {
  const crops = [
    { icon: Wheat, name: "Wheat", health: 92, yield: 85, area: "50 acres", growth: "+12%" },
    { icon: Apple, name: "Apples", health: 88, yield: 78, area: "25 acres", growth: "+8%" },
    { icon: Carrot, name: "Carrots", health: 95, yield: 90, area: "15 acres", growth: "+15%" },
    { icon: Trees, name: "Corn", health: 85, yield: 82, area: "40 acres", growth: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Crop Analytics</h1>
            <p className="text-muted-foreground">Detailed analysis and monitoring of all crop types</p>
          </div>

          {/* Crop Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {crops.map((crop, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <crop.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{crop.name}</h3>
                      <p className="text-sm text-muted-foreground">{crop.area}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Health</span>
                      <span className="font-medium text-green-600">{crop.health}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Yield</span>
                      <span className="font-medium text-blue-600">{crop.yield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth</span>
                      <span className="font-medium text-purple-600">{crop.growth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring</CardTitle>
                <CardDescription>Real-time crop health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crops.map((crop) => (
                    <div key={crop.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <crop.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{crop.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${crop.health}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{crop.health}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yield Projection</CardTitle>
                <CardDescription>Expected yield for upcoming harvest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {crops.map((crop) => (
                    <div key={crop.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <crop.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{crop.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${crop.yield}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{crop.yield}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>Optimized suggestions for crop improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Sprout className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Increase Wheat Irrigation</h4>
                    <p className="text-sm text-muted-foreground">Soil moisture levels are 15% below optimal for current growth stage</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Leaf className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Monitor Apple Pest Activity</h4>
                    <p className="text-sm text-muted-foreground">Increased pest risk detected in neighboring orchards</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropAnalytics;