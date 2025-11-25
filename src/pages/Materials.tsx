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
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="social science">Social Science</SelectItem>
              <SelectItem value="computer science">Computer Science</SelectItem>
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
  // Mathematics
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
    title: "Coordinate Geometry",
    subject: "Mathematics",
    chapter: "Geometry",
    type: "Premium",
    tags: ["Graphs", "Distance Formula"],
    items: 14,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Polynomials",
    subject: "Mathematics",
    chapter: "Algebra",
    type: "Free",
    tags: ["Factorization", "Practice"],
    items: 10,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  {
    title: "Statistics & Probability",
    subject: "Mathematics",
    chapter: "Statistics",
    type: "Premium",
    tags: ["Mean", "Median", "Mode"],
    items: 13,
    icon: Video,
    color: "gradient-accent",
  },
  {
    title: "Calculus Basics",
    subject: "Mathematics",
    chapter: "Calculus",
    type: "Premium",
    tags: ["Derivatives", "Integration"],
    items: 16,
    icon: FileText,
    color: "gradient-primary",
  },
  
  // Physics
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
    title: "Electrostatics",
    subject: "Physics",
    chapter: "Electricity",
    type: "Premium",
    tags: ["Theory", "Numericals"],
    items: 11,
    icon: Video,
    color: "gradient-accent",
  },
  {
    title: "Light Reflection & Refraction",
    subject: "Physics",
    chapter: "Optics",
    type: "Free",
    tags: ["Ray Diagrams", "Lens Formula"],
    items: 10,
    icon: BookOpen,
    color: "gradient-primary",
  },
  {
    title: "Current Electricity",
    subject: "Physics",
    chapter: "Electricity",
    type: "Premium",
    tags: ["Ohm's Law", "Circuits"],
    items: 12,
    icon: FileText,
    color: "gradient-secondary",
  },
  {
    title: "Magnetic Effects of Current",
    subject: "Physics",
    chapter: "Magnetism",
    type: "Free",
    tags: ["Fleming's Rule", "Experiments"],
    items: 9,
    icon: Video,
    color: "gradient-accent",
  },
  {
    title: "Work, Energy & Power",
    subject: "Physics",
    chapter: "Mechanics",
    type: "Premium",
    tags: ["Formulas", "High-weightage"],
    items: 11,
    icon: FileText,
    color: "gradient-primary",
  },
  
  // Chemistry
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
    title: "Chemical Reactions & Equations",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    type: "Free",
    tags: ["Balancing", "Types"],
    items: 8,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Acids, Bases & Salts",
    subject: "Chemistry",
    chapter: "Acids & Bases",
    type: "Premium",
    tags: ["pH Scale", "Indicators"],
    items: 10,
    icon: Video,
    color: "gradient-secondary",
  },
  {
    title: "Periodic Classification",
    subject: "Chemistry",
    chapter: "Periodic Table",
    type: "Free",
    tags: ["Trends", "Groups"],
    items: 12,
    icon: BookOpen,
    color: "gradient-accent",
  },
  {
    title: "Carbon & its Compounds",
    subject: "Chemistry",
    chapter: "Organic Chemistry",
    type: "Premium",
    tags: ["Functional Groups", "IUPAC"],
    items: 18,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Metals & Non-metals",
    subject: "Chemistry",
    chapter: "Elements",
    type: "Free",
    tags: ["Properties", "Reactions"],
    items: 11,
    icon: Video,
    color: "gradient-secondary",
  },
  
  // Biology
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
    title: "Life Processes",
    subject: "Biology",
    chapter: "Life Processes",
    type: "Free",
    tags: ["Nutrition", "Respiration"],
    items: 14,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  {
    title: "Heredity & Evolution",
    subject: "Biology",
    chapter: "Genetics",
    type: "Premium",
    tags: ["Mendel's Laws", "DNA"],
    items: 13,
    icon: Video,
    color: "gradient-accent",
  },
  {
    title: "Human Reproduction",
    subject: "Biology",
    chapter: "Reproduction",
    type: "Premium",
    tags: ["Reproductive System", "Diagrams"],
    items: 12,
    icon: FileText,
    color: "gradient-primary",
  },
  {
    title: "Control & Coordination",
    subject: "Biology",
    chapter: "Nervous System",
    type: "Free",
    tags: ["Brain", "Hormones"],
    items: 11,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  {
    title: "Ecosystem & Environment",
    subject: "Biology",
    chapter: "Environment",
    type: "Free",
    tags: ["Food Chain", "Conservation"],
    items: 9,
    icon: Video,
    color: "gradient-accent",
  },
  
  // English
  {
    title: "First Flight - Prose",
    subject: "English",
    chapter: "Literature",
    type: "Free",
    tags: ["Chapter Summary", "Questions"],
    items: 11,
    icon: BookOpen,
    color: "gradient-primary",
  },
  {
    title: "Footprints without Feet",
    subject: "English",
    chapter: "Literature",
    type: "Premium",
    tags: ["Stories", "Analysis"],
    items: 10,
    icon: FileText,
    color: "gradient-secondary",
  },
  {
    title: "Writing Skills",
    subject: "English",
    chapter: "Writing",
    type: "Free",
    tags: ["Letter Writing", "Articles"],
    items: 15,
    icon: Video,
    color: "gradient-accent",
  },
  {
    title: "Grammar Essentials",
    subject: "English",
    chapter: "Grammar",
    type: "Premium",
    tags: ["Tenses", "Voice"],
    items: 20,
    icon: FileText,
    color: "gradient-primary",
  },
  
  // Social Science
  {
    title: "The French Revolution",
    subject: "Social Science",
    chapter: "History",
    type: "Free",
    tags: ["Important Dates", "Events"],
    items: 8,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  {
    title: "Democracy & Elections",
    subject: "Social Science",
    chapter: "Political Science",
    type: "Premium",
    tags: ["Indian Constitution", "Rights"],
    items: 12,
    icon: FileText,
    color: "gradient-accent",
  },
  {
    title: "Resources & Development",
    subject: "Social Science",
    chapter: "Geography",
    type: "Free",
    tags: ["Types of Resources", "Maps"],
    items: 10,
    icon: Video,
    color: "gradient-primary",
  },
  {
    title: "Money & Credit",
    subject: "Social Science",
    chapter: "Economics",
    type: "Premium",
    tags: ["Banking", "Loan System"],
    items: 9,
    icon: BookOpen,
    color: "gradient-secondary",
  },
  
  // Computer Science
  {
    title: "Python Basics",
    subject: "Computer Science",
    chapter: "Programming",
    type: "Premium",
    tags: ["Syntax", "Data Types"],
    items: 16,
    icon: FileText,
    color: "gradient-accent",
  },
  {
    title: "Database Management",
    subject: "Computer Science",
    chapter: "SQL",
    type: "Free",
    tags: ["MySQL", "Queries"],
    items: 14,
    icon: Video,
    color: "gradient-primary",
  },
];

export default Materials;
