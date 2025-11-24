import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Video, Download, ExternalLink } from "lucide-react";

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, fetch based on id
  const material = {
    title: "Quadratic Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    description: "Master quadratic equations with comprehensive notes, video lectures, and practice problems. Learn solving techniques, formula applications, and problem-solving strategies.",
    tags: ["Formula Sheet", "High-weightage", "CBSE"],
    notes: [
      { title: "Introduction to Quadratic Equations", type: "PDF", size: "2.4 MB" },
      { title: "Standard Form and Coefficients", type: "PDF", size: "1.8 MB" },
      { title: "Solving Methods - Factorization", type: "PDF", size: "3.1 MB" },
      { title: "Quadratic Formula", type: "PDF", size: "2.2 MB" },
      { title: "Nature of Roots", type: "PDF", size: "1.5 MB" },
    ],
    videos: [
      { title: "Quadratic Equations - Introduction", channel: "Khan Academy", duration: "12:45", thumbnail: "🎥" },
      { title: "Solving by Factorization", channel: "Professor Dave", duration: "15:20", thumbnail: "🎥" },
      { title: "Quadratic Formula Explained", channel: "3Blue1Brown", duration: "18:30", thumbnail: "🎥" },
      { title: "Word Problems on Quadratics", channel: "PatrickJMT", duration: "22:15", thumbnail: "🎥" },
    ],
    relatedTopics: [
      { title: "Linear Equations", subject: "Mathematics" },
      { title: "Polynomials", subject: "Mathematics" },
      { title: "Coordinate Geometry", subject: "Mathematics" },
    ]
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/materials")}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold">{material.title}</h1>
          <p className="text-muted-foreground mt-1">{material.subject} • {material.chapter}</p>
        </div>
      </div>

      <Card className="glass">
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-4">{material.description}</p>
          <div className="flex flex-wrap gap-2">
            {material.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notes">Notes & PDFs</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
          <TabsTrigger value="related">Related Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="space-y-4">
          {material.notes.map((note, index) => (
            <Card key={index} className="glass hover:shadow-glow transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">{note.type} • {note.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {material.videos.map((video, index) => (
            <Card key={index} className="glass hover:shadow-glow transition-all">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-destructive/20 flex items-center justify-center text-3xl">
                    {video.thumbnail}
                  </div>
                  <div>
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.channel} • {video.duration}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="related" className="space-y-4">
          {material.relatedTopics.map((topic, index) => (
            <Card key={index} className="glass hover:shadow-glow transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.subject}</p>
                </div>
                <Button variant="ghost" size="sm">
                  View →
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaterialDetail;
