import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, BookOpen, FileText, Video } from "lucide-react";

const MaterialView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const materials = [
    {
      title: "Quadratic Equations",
      subject: "Mathematics",
      chapter: "Algebra",
      type: "Premium",
      tags: ["Formula Sheet", "High-weightage"],
      items: 12,
      icon: FileText,
      color: "bg-primary",
      description: "Master quadratic equations with comprehensive study materials including formulas, solved examples, and practice problems.",
      contents: [
        { name: "Introduction to Quadratic Equations", type: "PDF", size: "2.3 MB" },
        { name: "Standard Forms and Methods", type: "PDF", size: "1.8 MB" },
        { name: "Solving by Factorization", type: "Video", size: "45 min" },
        { name: "Completing the Square Method", type: "PDF", size: "1.5 MB" },
        { name: "Quadratic Formula Derivation", type: "Video", size: "32 min" },
        { name: "Nature of Roots", type: "PDF", size: "1.2 MB" },
        { name: "Practice Problems Set 1", type: "PDF", size: "3.1 MB" },
        { name: "Practice Problems Set 2", type: "PDF", size: "2.8 MB" },
        { name: "Word Problems", type: "PDF", size: "2.5 MB" },
        { name: "Advanced Applications", type: "Video", size: "38 min" },
        { name: "Formula Sheet", type: "PDF", size: "0.5 MB" },
        { name: "Previous Year Questions", type: "PDF", size: "4.2 MB" },
      ]
    },
    {
      title: "Newton's Laws of Motion",
      subject: "Physics",
      chapter: "Mechanics",
      type: "Free",
      tags: ["Video Lectures", "Practice Problems"],
      items: 8,
      icon: Video,
      color: "bg-secondary",
      description: "Understand the fundamental laws of motion with video lectures and practice problems.",
      contents: [
        { name: "Newton's First Law", type: "Video", size: "28 min" },
        { name: "Newton's Second Law", type: "Video", size: "35 min" },
        { name: "Newton's Third Law", type: "Video", size: "30 min" },
        { name: "Free Body Diagrams", type: "PDF", size: "2.1 MB" },
        { name: "Force and Acceleration", type: "PDF", size: "1.9 MB" },
        { name: "Applications of Laws", type: "Video", size: "42 min" },
        { name: "Practice Problems", type: "PDF", size: "3.5 MB" },
        { name: "Numerical Solutions", type: "PDF", size: "2.7 MB" },
      ]
    },
  ];

  const materialIndex = parseInt(id || "0");
  const material = materials[materialIndex] || materials[0];
  const Icon = material.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      <Button
        variant="ghost"
        onClick={() => navigate("/materials")}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Materials
      </Button>

      <Card className="glass">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-lg ${material.color} flex items-center justify-center`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">{material.title}</CardTitle>
                <p className="text-muted-foreground">{material.subject} • {material.chapter}</p>
              </div>
            </div>
            <Badge variant={material.type === "Premium" ? "default" : "secondary"}>
              {material.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{material.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {material.tags.map((tag, i) => (
              <Badge key={i} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg mb-4">Contents ({material.contents.length} items)</h3>
            <div className="space-y-2">
              {material.contents.map((content, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {content.type === "PDF" ? (
                      <FileText className="h-5 w-5 text-primary" />
                    ) : content.type === "Video" ? (
                      <Video className="h-5 w-5 text-primary" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">{content.name}</p>
                      <p className="text-sm text-muted-foreground">{content.type} • {content.size}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialView;
