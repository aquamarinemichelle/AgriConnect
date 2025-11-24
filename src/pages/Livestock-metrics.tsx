import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Users, Egg, Beef, PiggyBank, GitBranch } from "lucide-react";

const LivestockMetrics = () => {
  const livestock = [
    { icon: Beef, type: "Cattle", count: 245, health: 92, production: "85%", trend: "+5%" },
    { icon: Egg, type: "Poultry", count: 1200, health: 88, production: "78%", trend: "+8%" },
    { icon: PiggyBank, type: "Swine", count: 180, health: 85, production: "82%", trend: "+3%" },
    { icon: GitBranch, type: "Sheep", count: 95, health: 90, production: "88%", trend: "+6%" },
  ];

  const healthAlerts = [
    { type: "Cattle", issue: "Minor respiratory symptoms", priority: "Low", count: 3 },
    { type: "Poultry", issue: "Feed intake reduced", priority: "Medium", count: 15 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Livestock Metrics</h1>
            <p className="text-muted-foreground">Comprehensive health and production monitoring</p>
          </div>

          {/* Livestock Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {livestock.map((animal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <animal.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{animal.type}</h3>
                      <p className="text-sm text-muted-foreground">{animal.count} animals</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Health</span>
                      <span className="font-medium text-green-600">{animal.health}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Production</span>
                      <span className="font-medium text-purple-600">{animal.production}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Trend</span>
                      <span className="font-medium text-blue-600">{animal.trend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Health & Production */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring</CardTitle>
                <CardDescription>Real-time health status across all livestock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {livestock.map((animal) => (
                    <div key={animal.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="font-medium">{animal.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${animal.health}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{animal.health}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Efficiency</CardTitle>
                <CardDescription>Current production rates and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {livestock.map((animal) => (
                    <div key={animal.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{animal.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${parseInt(animal.production)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{animal.production}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Health Alerts
              </CardTitle>
              <CardDescription>Active health issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {healthAlerts.length > 0 ? (
                <div className="space-y-3">
                  {healthAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{alert.type}</h4>
                        <p className="text-sm text-muted-foreground">{alert.issue}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          alert.priority === 'High' ? 'bg-red-100 text-red-800' :
                          alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {alert.priority}
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">{alert.count} animals affected</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No active health alerts</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LivestockMetrics;