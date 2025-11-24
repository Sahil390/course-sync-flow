import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, FileText, Video, Search } from "lucide-react";

const Materials = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  // Filter materials based on search query and selected subject
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = searchQuery === "" || 
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === "all" || 
      material.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Study Materials</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
              placeholder="Search topics, chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No materials found matching your criteria.</p>
          </div>
        ) : (
          filteredMaterials.map((material, index) => (
          <Card key={index} className="glass hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-lg ${material.color} flex items-center justify-center`}>
                  <material.icon className="h-6 w-6 text-white" />
                </div>
                <Badge variant={material.type === "Premium" ? "default" : "secondary"}>
                  {material.type}
                </Badge>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                <p className="text-sm text-muted-foreground">{material.subject} • {material.chapter}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {material.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">{material.items} items</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-primary hover:text-primary"
                  onClick={() => navigate(`/materials/${index}`)}
                >
                  View →
                </Button>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>
    </div>
  );
};

const materials = [
  {
    title: "Quadratic Equations",
    subject: "Mathematics",
    chapter: "Algebra",
    type: "Premium",
    tags: ["Formula Sheet", "High-weightage"],
    items: 12,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    type: "Free",
    tags: ["Video Lectures", "Practice Problems"],
    items: 8,
    icon: Video,
    color: "gradient-secondary",
  },
  {
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    type: "Free",
    tags: ["Notes", "Reactions"],
    items: 15,
    icon: BookOpen,
    color: "gradient-accent",
  },
  {
    title: "Cell Biology",
    subject: "Biology",
    chapter: "Cell Structure",
    type: "Premium",
    tags: ["Diagrams", "MCQs"],
    items: 10,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Trigonometry",
    subject: "Mathematics",
    chapter: "Trigonometry",
    type: "Free",
    tags: ["Formulas", "Examples"],
    items: 9,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  {
    title: "Electrostatics",
    subject: "Physics",
    chapter: "Electricity",
    type: "Premium",
    tags: ["Theory", "Numericals"],
    items: 11,
    icon: Video,
    color: "gradient-accent",
  },
];

export default Materials;
