import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Target, TrendingUp, CheckCircle2, XCircle, BookOpen } from "lucide-react";

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = {}, totalQuestions = 50, timeSpent = 0 } = location.state || {};

  // Mock calculation - in real app, compare with correct answers
  const correctAnswers = Math.floor(Object.keys(answers).length * 0.75);
  const incorrectAnswers = Object.keys(answers).length - correctAnswers;
  const unanswered = totalQuestions - Object.keys(answers).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const accuracy = Math.round((correctAnswers / Object.keys(answers).length) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreMessage = () => {
    if (score >= 90) return { text: "Outstanding Performance! 🌟", color: "text-success" };
    if (score >= 75) return { text: "Great Job! 👏", color: "text-success" };
    if (score >= 60) return { text: "Good Effort! 💪", color: "text-primary" };
    if (score >= 40) return { text: "Keep Practicing! 📚", color: "text-warning" };
    return { text: "Need More Practice 📖", color: "text-destructive" };
  };

  const scoreMessage = getScoreMessage();

  const subjectWisePerformance = [
    { name: "Mathematics", correct: 9, total: 12, percentage: 75 },
    { name: "Physics", correct: 11, total: 13, percentage: 85 },
    { name: "Chemistry", correct: 8, total: 12, percentage: 67 },
    { name: "Biology", correct: 10, total: 13, percentage: 77 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="glass border-primary/30">
        <CardContent className="p-8 text-center">
          <Trophy className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-2">{score}%</h1>
          <p className={`text-xl font-semibold ${scoreMessage.color}`}>
            {scoreMessage.text}
          </p>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-success" />
            <p className="text-2xl font-bold text-success">{correctAnswers}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
            <p className="text-2xl font-bold text-destructive">{incorrectAnswers}</p>
            <p className="text-sm text-muted-foreground">Incorrect</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold text-warning">{unanswered}</p>
            <p className="text-sm text-muted-foreground">Unanswered</p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{formatTime(timeSpent)}</p>
            <p className="text-sm text-muted-foreground">Time Taken</p>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy & Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Accuracy Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{accuracy}%</span>
                <Badge variant={accuracy >= 75 ? "default" : "secondary"}>
                  {accuracy >= 75 ? "Excellent" : "Good"}
                </Badge>
              </div>
              <Progress value={accuracy} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {correctAnswers} correct out of {Object.keys(answers).length} attempted
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => navigate("/quiz/solutions", { state: { answers, totalQuestions } })}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Solutions
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/quiz/test")}
            >
              Retake Test
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/quiz")}
            >
              Back to Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Subject-wise Performance */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Subject-wise Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjectWisePerformance.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-muted-foreground">
                  {subject.correct}/{subject.total} ({subject.percentage}%)
                </span>
              </div>
              <Progress value={subject.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="glass border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Focus on Chemistry - you scored {subjectWisePerformance[2].percentage}%, which is below average</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Review unanswered questions to improve time management</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Practice more problems in weak topics identified in the analysis</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
