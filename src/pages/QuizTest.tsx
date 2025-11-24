import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const QuizTest = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    if (timeLeft === 5 * 60) {
      toast.warning("5 minutes remaining!");
      setShowWarning(true);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    navigate("/quiz/results", { 
      state: { 
        answers, 
        totalQuestions: questions.length,
        timeSpent: 30 * 60 - timeLeft 
      } 
    });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen space-y-6 animate-fade-in">
      {/* Timer Header */}
      <Card className={`glass sticky top-0 z-10 ${showWarning ? 'border-destructive/50' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline">Question {currentQuestion + 1} / {questions.length}</Badge>
              <span className="text-sm text-muted-foreground">
                Answered: {answeredCount} / {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {showWarning && (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Hurry up!</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className={`h-5 w-5 ${showWarning ? 'text-destructive' : 'text-primary'}`} />
                <span className={`text-xl font-bold ${showWarning ? 'text-destructive' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="glass">
        <CardContent className="p-6 md:p-8 space-y-6">
          <div>
            <Badge className="mb-3">{questions[currentQuestion].subject}</Badge>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Question {currentQuestion + 1}
            </h2>
            <p className="text-lg">{questions[currentQuestion].question}</p>
          </div>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={(value) => handleAnswer(currentQuestion, value)}
            className="space-y-3"
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer hover:border-primary/50 ${
                  answers[currentQuestion] === option
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                Submit Test
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion((prev) => Math.min(questions.length - 1, prev + 1))}
                className="bg-primary hover:bg-primary/90"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigator */}
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : "outline"}
                size="sm"
                className={`${
                  answers[index] ? 'border-success text-success' : ''
                } ${currentQuestion === index ? 'bg-primary' : ''}`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock questions data
const questions = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  subject: ["Mathematics", "Physics", "Chemistry", "Biology"][i % 4],
  question: `Sample question ${i + 1}: This is a placeholder question text that would contain the actual question content in a real scenario.`,
  options: [
    `Option A for question ${i + 1}`,
    `Option B for question ${i + 1}`,
    `Option C for question ${i + 1}`,
    `Option D for question ${i + 1}`,
  ],
  correctAnswer: ["Option A", "Option B", "Option C", "Option D"][i % 4] + ` for question ${i + 1}`,
}));

export default QuizTest;
