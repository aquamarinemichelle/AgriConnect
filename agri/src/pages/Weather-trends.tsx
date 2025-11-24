import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer } from "lucide-react";

const WeatherTrends = () => {
  const forecast = [
    { day: "Today", icon: Sun, temp: "24°C", condition: "Sunny", rain: "0%", wind: "12 km/h" },
    { day: "Tomorrow", icon: Cloud, temp: "22°C", condition: "Cloudy", rain: "20%", wind: "15 km/h" },
    { day: "Wed", icon: CloudRain, temp: "19°C", condition: "Rain", rain: "80%", wind: "18 km/h" },
    { day: "Thu", icon: CloudRain, temp: "18°C", condition: "Showers", rain: "60%", wind: "14 km/h" },
    { day: "Fri", icon: Cloud, temp: "21°C", condition: "Partly Cloudy", rain: "30%", wind: "10 km/h" },
  ];

  const alerts = [
    { type: "Rain Alert", message: "Heavy rainfall expected Wednesday", severity: "Medium" },
    { type: "Wind Advisory", message: "Strong winds may affect crops", severity: "Low" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Weather Trends</h1>
            <p className="text-muted-foreground">Real-time weather data and agricultural impact analysis</p>
          </div>

          {/* Current Weather */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Current Conditions</CardTitle>
                <CardDescription>Real-time weather at your location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sun className="w-10 h-10 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-4xl font-bold">24°C</p>
                      <p className="text-muted-foreground">Sunny and clear</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 justify-end">
                      <Wind className="w-4 h-4" />
                      <span>12 km/h</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <CloudRain className="w-4 h-4" />
                      <span>Humidity: 45%</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                      <Thermometer className="w-4 h-4" />
                      <span>Feels like: 25°C</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Farm Impact</CardTitle>
                <CardDescription>Weather effects on operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">Irrigation</span>
                    <span className="text-green-600 font-medium">Not needed</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">Pest Risk</span>
                    <span className="text-green-600 font-medium">Low</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span className="text-sm">Soil Moisture</span>
                    <span className="text-yellow-600 font-medium">Adequate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5-Day Forecast */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>5-Day Forecast</CardTitle>
              <CardDescription>Extended weather predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <p className="font-medium mb-2">{day.day}</p>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <day.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-xl font-bold mb-1">{day.temp}</p>
                    <p className="text-sm text-muted-foreground mb-2">{day.condition}</p>
                    <div className="text-xs space-y-1">
                      <p>Rain: {day.rain}</p>
                      <p>Wind: {day.wind}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Weather Alerts & Advisories</CardTitle>
              <CardDescription>Important weather-related notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <CloudRain className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.type}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            alert.severity === 'High' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No active weather alerts</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeatherTrends;