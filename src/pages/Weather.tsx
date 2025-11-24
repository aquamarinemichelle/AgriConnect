import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Droplets, Wind, Sun, TrendingUp, Calendar } from "lucide-react";

const Weather = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg">
              <CloudRain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Weather Insights
            </h1>
            <p className="text-muted-foreground text-lg">
              Seasonal guidance and weather-based farming recommendations
            </p>
          </div>

          {/* Current Weather */}
          <Card className="mb-6 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-2xl">Current Conditions</CardTitle>
              <CardDescription>Weather data will be integrated via API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">28°C</p>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">65%</p>
                    <p className="text-sm text-muted-foreground">Humidity</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">12 km/h</p>
                    <p className="text-sm text-muted-foreground">Wind Speed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CloudRain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">30%</p>
                    <p className="text-sm text-muted-foreground">Rain Chance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Farming Recommendations
                </CardTitle>
                <CardDescription>Based on current weather patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <p className="font-medium text-success mb-1">✓ Good time for planting</p>
                  <p className="text-sm text-muted-foreground">
                    Soil moisture levels are optimal for seed germination
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="font-medium text-primary mb-1">Irrigation recommended</p>
                  <p className="text-sm text-muted-foreground">
                    No significant rainfall expected in the next 5 days
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="font-medium text-warning mb-1">Monitor pest activity</p>
                  <p className="text-sm text-muted-foreground">
                    Warm temperatures may increase pest populations
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  7-Day Forecast
                </CardTitle>
                <CardDescription>Plan your farming activities ahead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="font-medium text-foreground">{day}</span>
                      <div className="flex items-center gap-4">
                        <Sun className="w-4 h-4 text-accent" />
                        <span className="text-sm text-muted-foreground min-w-[60px]">
                          {26 + index}°C / {18 + index}°C
                        </span>
                        <span className="text-sm text-primary min-w-[40px]">
                          {10 + index * 5}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disease Alerts */}
          <Card className="shadow-card border-warning/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-warning" />
                Disease Risk Alerts
              </CardTitle>
              <CardDescription>Weather-based disease predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
                    <CloudRain className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Moderate Fungal Disease Risk</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      High humidity levels combined with warm temperatures create favorable conditions for fungal diseases.
                    </p>
                    <p className="text-sm font-medium text-warning">
                      Recommendation: Apply preventive fungicides on susceptible crops
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Weather;
