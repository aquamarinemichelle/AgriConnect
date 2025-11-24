import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How accurate is the crop disease detection?",
      answer: "Our AI model has been trained on over 100,000 images and achieves 95% accuracy in detecting common crop diseases. However, we always recommend consulting with agricultural experts for critical decisions."
    },
    {
      question: "What types of crops does FarmAI support?",
      answer: "Currently, we support major crops including wheat, corn, rice, soybeans, tomatoes, potatoes, and apples. We're continuously expanding our database to include more crop types."
    },
    {
      question: "How often is weather data updated?",
      answer: "Weather data is updated every 15 minutes from multiple reliable sources. Our agricultural impact analysis is recalculated hourly to provide the most relevant farming recommendations."
    },
    {
      question: "Can I use FarmAI on mobile devices?",
      answer: "Yes! FarmAI is fully responsive and works on all devices. We also offer mobile apps for iOS and Android for offline functionality in remote farming areas."
    },
    {
      question: "How do I get help with livestock health issues?",
      answer: "You can use our symptom checker in the Livestock Health section or chat directly with our AI assistant. For emergency situations, we recommend contacting a veterinarian immediately."
    },
    {
      question: "Is my farm data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict data privacy protocols. Your farm data is never shared with third parties without your explicit consent."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about FarmAI and its features
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-8">
            {faqItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-lg">{item.question}</span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is here to help you get the most out of FarmAI
              </p>
              <div className="flex gap-4 justify-center">
                <Button>Contact Support</Button>
                <Button variant="outline">Live Chat</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;