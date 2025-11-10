import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, CheckCircle, Search } from "lucide-react";

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Discussion Forum</h1>
          <p className="text-muted-foreground">Ask questions, share knowledge, and learn together</p>
        </div>
        <Button className="gradient-primary border-0">
          Ask Question
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card key={index} className="glass hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="gradient-primary text-white">
                    {post.author[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {post.verified && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{post.preview}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      {post.replies} replies
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const posts = [
  {
    title: "How to solve quadratic equations efficiently?",
    author: "Priya Sharma",
    time: "2 hours ago",
    preview: "I'm struggling with solving quadratic equations quickly. Can someone share tips or shortcuts?",
    tags: ["Mathematics", "Algebra", "Help Needed"],
    likes: 24,
    replies: 8,
    verified: true,
  },
  {
    title: "Best resources for learning organic chemistry?",
    author: "Rahul Kumar",
    time: "5 hours ago",
    preview: "Looking for recommendations on books or online resources for organic chemistry preparation.",
    tags: ["Chemistry", "Resources", "Organic"],
    likes: 18,
    replies: 12,
  },
  {
    title: "Newton's Third Law - Practical Examples",
    author: "Anjali Singh",
    time: "1 day ago",
    preview: "Can someone explain Newton's third law with real-world examples? The textbook examples are confusing.",
    tags: ["Physics", "Mechanics", "Conceptual"],
    likes: 35,
    replies: 15,
    verified: true,
  },
  {
    title: "Tips for scoring well in Biology diagrams?",
    author: "Vikram Patel",
    time: "2 days ago",
    preview: "I always lose marks in diagram questions. Any tips for practicing and presenting them better?",
    tags: ["Biology", "Exam Tips", "Diagrams"],
    likes: 27,
    replies: 10,
  },
];

export default Forum;
