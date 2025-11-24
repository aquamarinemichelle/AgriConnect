import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Globe, Award, Heart } from "lucide-react";

const AboutUs = () => {
  const team = [
    { name: "Sarah Chen", role: "Agricultural Scientist", bio: "10+ years in crop research" },
    { name: "Marcus Rodriguez", role: "AI Engineer", bio: "Machine learning specialist" },
    { name: "Emily Watson", role: "Product Manager", bio: "Farm technology expert" },
    { name: "David Kim", role: "Data Scientist", bio: "Weather pattern analysis" },
  ];

  const values = [
    { icon: Target, title: "Mission", description: "Empower farmers with AI-driven insights to ensure food security and sustainable agriculture." },
    { icon: Globe, title: "Vision", description: "A world where every farmer has access to cutting-edge technology for better decision making." },
    { icon: Heart, title: "Values", description: "Innovation, sustainability, and farmer-first approach in everything we do." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">About FarmAI</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionizing agriculture through artificial intelligence and data-driven insights
            </p>
          </div>

          {/* Story Section */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    FarmAI was founded in 2020 by a team of agricultural scientists and AI researchers 
                    who recognized the growing challenges facing modern farmers. From climate change to 
                    resource optimization, we saw an opportunity to leverage technology for positive impact.
                  </p>
                  <p className="text-muted-foreground">
                    Today, we serve thousands of farmers across 15 countries, helping them increase yields, 
                    reduce costs, and make more informed decisions through our comprehensive AI platform.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">15K+</div>
                      <div className="text-sm text-muted-foreground">Farmers Served</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">95%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">50+</div>
                      <div className="text-sm text-muted-foreground">Crop Types</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-primary/5 border-primary/20 text-center">
            <CardContent className="p-8">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Join the Agricultural Revolution</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Be part of the growing community of farmers who are transforming agriculture 
                with AI-powered insights and sustainable practices.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">Get Started Today</Button>
                <Button variant="outline" size="lg">Schedule Demo</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;