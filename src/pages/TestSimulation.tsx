import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TestSimulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      question: "What is the general form of a quadratic equation?",
      options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + cx + d = 0", "ax² + b = 0"],
      correct: "ax² + bx + c = 0",
      explanation: "A quadratic equation is a second-degree polynomial equation in a single variable. The general form is ax² + bx + c = 0, where a ≠ 0."
    },
    {
      question: "If the discriminant (b² - 4ac) is positive, the quadratic equation has:",
      options: ["No real roots", "One real root", "Two distinct real roots", "Two complex roots"],
      correct: "Two distinct real roots",
      explanation: "When the discriminant is positive (b² - 4ac > 0), the quadratic equation has two distinct real roots."
    },
    {
      question: "The axis of symmetry of a parabola y = ax² + bx + c is given by:",
      options: ["x = -b/a", "x = -b/2a", "x = b/2a", "x = -2b/a"],
      correct: "x = -b/2a",
      explanation: "The axis of symmetry of a parabola in standard form passes through the vertex and is given by x = -b/2a."
    },
    {
      question: "What is the sum of the roots of the equation 2x² - 5x + 3 = 0?",
      options: ["5/2", "-5/2", "3/2", "-3/2"],
      correct: "5/2",
      explanation: "For a quadratic equation ax² + bx + c = 0, the sum of roots is -b/a. Here, -(-5)/2 = 5/2."
    },
    {
      question: "Which method is most efficient for solving x² - 16 = 0?",
      options: ["Quadratic formula", "Completing the square", "Factorization", "Graphing"],
      correct: "Factorization",
      explanation: "x² - 16 = 0 is a difference of squares that can be easily factored as (x + 4)(x - 4) = 0, making factorization the most efficient method."
    },
  ];

  useEffect(() => {
    if (timeRemaining > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isFinished) {
      handleSubmit();
    }
  }, [timeRemaining, isFinished]);

  const handleSubmit = () => {
    setIsFinished(true);
    const score = Object.entries(answers).filter(
      ([index, answer]) => answer === questions[parseInt(index)].correct
    ).length;
    
    navigate(`/test-results/${id}`, { 
      state: { 
        answers, 
        questions, 
        score,
        totalQuestions: questions.length,
        timeTaken: (30 * 60) - timeRemaining
      } 
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isTimeCritical = timeRemaining < 300; // Less than 5 minutes

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Timer and Progress */}
      <Card className={`glass ${isTimeCritical ? 'border-destructive' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className={`h-5 w-5 ${isTimeCritical ? 'text-destructive' : 'text-primary'}`} />
              <span className={`font-bold text-lg ${isTimeCritical ? 'text-destructive' : ''}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {isTimeCritical && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Less than 5 minutes remaining! Please review your answers.
          </AlertDescription>
        </Alert>
      )}

      {/* Question Card */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{questions[currentQuestion].question}</p>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={(value) =>
              setAnswers({ ...answers, [currentQuestion]: value })
            }
          >
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit}>
                Submit Test
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card className="glass">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3">Question Navigator</p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={index === currentQuestion ? "default" : "outline"}
                size="sm"
                className={`h-10 ${answers[index] ? 'bg-success/20 hover:bg-success/30' : ''}`}
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

export default TestSimulation;
