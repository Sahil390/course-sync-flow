import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, BookOpen, Lightbulb } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const QuizSolutions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = {}, totalQuestions = 50 } = location.state || {};

  // Mock solutions - in real app, fetch from backend
  const solutions = Array.from({ length: totalQuestions }, (_, i) => ({
    id: i + 1,
    question: `Sample question ${i + 1}: This is a placeholder question text that would contain the actual question content in a real scenario.`,
    subject: ["Mathematics", "Physics", "Chemistry", "Biology"][i % 4],
    options: [
      `Option A for question ${i + 1}`,
      `Option B for question ${i + 1}`,
      `Option C for question ${i + 1}`,
      `Option D for question ${i + 1}`,
    ],
    correctAnswer: `Option ${String.fromCharCode(65 + (i % 4))} for question ${i + 1}`,
    userAnswer: answers[i] || null,
    explanation: `Detailed explanation for question ${i + 1}: This would contain step-by-step solution, relevant formulas, concepts, and reasoning. The explanation helps students understand the underlying principles and methodology to solve similar problems.`,
    concept: `Key concept: ${["Algebra", "Newton's Laws", "Chemical Bonding", "Cell Biology"][i % 4]}`,
    difficulty: ["Easy", "Medium", "Hard"][i % 3],
  }));

  const isCorrect = (solution: typeof solutions[0]) => {
    return solution.userAnswer === solution.correctAnswer;
  };

  const getStatusColor = (solution: typeof solutions[0]) => {
    if (!solution.userAnswer) return "text-warning";
    return isCorrect(solution) ? "text-success" : "text-destructive";
  };

  const getStatusIcon = (solution: typeof solutions[0]) => {
    if (!solution.userAnswer) return null;
    return isCorrect(solution) ? 
      <CheckCircle2 className="h-5 w-5 text-success" /> : 
      <XCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/quiz/results", { state: { answers, totalQuestions } })}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Solutions & Explanations</h1>
          <p className="text-muted-foreground mt-1">Detailed solutions for all questions</p>
        </div>
      </div>

      {/* Legend */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Correct Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span>Incorrect Answer</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-warning"></div>
              <span>Not Attempted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solutions */}
      <Accordion type="single" collapsible className="space-y-4">
        {solutions.map((solution, index) => (
          <AccordionItem key={index} value={`question-${index}`} className="border-0">
            <Card className={`glass ${
              !solution.userAnswer ? 'border-warning/30' :
              isCorrect(solution) ? 'border-success/30' : 'border-destructive/30'
            }`}>
              <AccordionTrigger className="hover:no-underline p-6">
                <div className="flex items-start gap-4 flex-1 text-left">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    {getStatusIcon(solution)}
                    <span className={`font-semibold ${getStatusColor(solution)}`}>
                      Q{solution.id}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{solution.subject}</Badge>
                      <Badge variant="secondary">{solution.difficulty}</Badge>
                    </div>
                    <p className="font-medium">{solution.question}</p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent>
                <CardContent className="pt-0 pb-6 space-y-6">
                  {/* Options */}
                  <div className="space-y-2">
                    {solution.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          option === solution.correctAnswer
                            ? 'border-success bg-success/5'
                            : option === solution.userAnswer && !isCorrect(solution)
                            ? 'border-destructive bg-destructive/5'
                            : 'border-border'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {option === solution.correctAnswer && (
                            <Badge variant="outline" className="border-success text-success">
                              Correct
                            </Badge>
                          )}
                          {option === solution.userAnswer && !isCorrect(solution) && (
                            <Badge variant="outline" className="border-destructive text-destructive">
                              Your Answer
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-2">Explanation</h4>
                        <p className="text-muted-foreground">{solution.explanation}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">Key Concept</h4>
                        <p className="text-muted-foreground">{solution.concept}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Footer Actions */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/quiz/test")}
            >
              Retake Test
            </Button>
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => navigate("/materials")}
            >
              Study Related Materials
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate("/quiz")}
            >
              Back to Quizzes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSolutions;
