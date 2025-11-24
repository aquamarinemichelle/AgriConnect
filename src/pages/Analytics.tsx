import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Droplets, Thermometer, Sun, Wind } from "lucide-react";

const Analytics = () => {
  const metrics = [
    { icon: TrendingUp, label: "Growth Rate", value: "78%", change: "+12%", color: "text-green-600" },
    { icon: Users, label: "Livestock Count", value: "1,247", change: "+5%", color: "text-blue-600" },
    { icon: Droplets, label: "Water Usage", value: "45KL", change: "-8%", color: "text-cyan-600" },
    { icon: Thermometer, label: "Soil Temp", value: "24°C", change: "+2°", color: "text-orange-600" },
    { icon: Sun, label: "Sun Exposure", value: "6.2h", change: "+0.5h", color: "text-yellow-600" },
    { icon: Wind, label: "Wind Speed", value: "12km/h", change: "-3km/h", color: "text-gray-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Farm Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance metrics for your farm</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <p className={`text-sm ${metric.color} mt-1`}>{metric.change}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Trends</CardTitle>
                <CardDescription>Monthly yield and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, index) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{month}</span>
                      <div className="w-48 bg-muted rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${60 + index * 10}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{60 + index * 10}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Efficiency across different resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Water', value: 75, color: 'bg-blue-500' },
                    { label: 'Fertilizer', value: 60, color: 'bg-green-500' },
                    { label: 'Energy', value: 85, color: 'bg-yellow-500' },
                    { label: 'Labor', value: 70, color: 'bg-purple-500' },
                  ].map((resource) => (
                    <div key={resource.label} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{resource.label}</span>
                      <div className="w-48 bg-muted rounded-full h-2">
                        <div 
                          className={`${resource.color} h-2 rounded-full`} 
                          style={{ width: `${resource.value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{resource.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button>Export Report</Button>
            <Button variant="outline">Schedule Analysis</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;