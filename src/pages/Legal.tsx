import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Lock, Eye } from "lucide-react";

const Legal = () => {
  const legalDocuments = [
    { 
      icon: Shield, 
      title: "Privacy Policy", 
      description: "How we collect, use, and protect your data",
      lastUpdated: "January 15, 2024"
    },
    { 
      icon: FileText, 
      title: "Terms of Service", 
      description: "Rules and guidelines for using FarmAI",
      lastUpdated: "January 15, 2024"
    },
    { 
      icon: Lock, 
      title: "Data Processing Agreement", 
      description: "How we handle and process farm data",
      lastUpdated: "January 15, 2024"
    },
    { 
      icon: Eye, 
      title: "Cookie Policy", 
      description: "Information about our use of cookies",
      lastUpdated: "January 15, 2024"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Legal & Compliance</h1>
            <p className="text-muted-foreground">
              Important legal documents and compliance information for FarmAI users
            </p>
          </div>

          {/* Legal Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {legalDocuments.map((doc, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <doc.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{doc.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{doc.description}</p>
                      <p className="text-xs text-muted-foreground">Last updated: {doc.lastUpdated}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Document
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Important Notices */}
          <Card>
            <CardHeader>
              <CardTitle>Important Notices</CardTitle>
              <CardDescription>
                Legal disclosures and compliance information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  FarmAI provides agricultural insights and recommendations based on AI analysis. 
                  While we strive for accuracy, our suggestions should be used as guidance alongside 
                  professional agricultural advice. We are not liable for decisions made based on 
                  our platform's recommendations.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-2">Data Privacy</h4>
                <p className="text-blue-700 text-sm">
                  Your farm data is encrypted and stored securely. We comply with global data 
                  protection regulations including GDPR and CCPA. You have the right to access, 
                  modify, or delete your personal information at any time.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800 mb-2">Intellectual Property</h4>
                <p className="text-green-700 text-sm">
                  All AI models, algorithms, and software components are proprietary technology 
                  of FarmAI. Farm data remains the property of the farmer, while aggregated 
                  insights help improve our models for the benefit of all users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Legal */}
          <Card className="mt-6">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Need Legal Assistance?</h3>
              <p className="text-muted-foreground mb-4">
                Contact our legal team for any questions about compliance or data usage
              </p>
              <Button>Contact Legal Team</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Legal;