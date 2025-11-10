import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, Target, TrendingUp } from "lucide-react";

const Quiz = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="gradient-secondary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Adaptive Quizzes</h1>
          <p className="text-white/90 text-lg">Test your knowledge and track your progress</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                <p className="text-2xl font-bold">32</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-success">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className="text-2xl font-bold">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Available Quizzes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quizzes.map((quiz, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{quiz.title}</h3>
                    <Badge variant={
                      quiz.difficulty === "Hard" ? "destructive" : 
                      quiz.difficulty === "Medium" ? "default" : 
                      "secondary"
                    }>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{quiz.subject} • {quiz.topics} topics</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      {quiz.questions} questions
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  {quiz.completed ? (
                    <>
                      <div className="text-sm text-muted-foreground">Last Score: {quiz.lastScore}%</div>
                      <Progress value={quiz.lastScore} className="h-2" />
                      <Button variant="outline" size="sm">
                        Retry
                      </Button>
                    </>
                  ) : (
                    <Button className="gradient-primary border-0">
                      Start Quiz
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Subject-wise Performance */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Subject-wise Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-muted-foreground">{subject.score}%</span>
              </div>
              <Progress value={subject.score} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const quizzes = [
  {
    title: "Algebra Mastery Test",
    subject: "Mathematics",
    topics: 5,
    difficulty: "Hard",
    duration: "45 min",
    questions: 30,
    completed: true,
    lastScore: 88,
  },
  {
    title: "Thermodynamics Quiz",
    subject: "Physics",
    topics: 3,
    difficulty: "Medium",
    duration: "30 min",
    questions: 20,
    completed: false,
  },
  {
    title: "Organic Reactions",
    subject: "Chemistry",
    topics: 4,
    difficulty: "Hard",
    duration: "40 min",
    questions: 25,
    completed: true,
    lastScore: 92,
  },
  {
    title: "Cell Biology Basics",
    subject: "Biology",
    topics: 2,
    difficulty: "Easy",
    duration: "20 min",
    questions: 15,
    completed: false,
  },
];

const subjects = [
  { name: "Mathematics", score: 85 },
  { name: "Physics", score: 78 },
  { name: "Chemistry", score: 92 },
  { name: "Biology", score: 88 },
];

export default Quiz;
