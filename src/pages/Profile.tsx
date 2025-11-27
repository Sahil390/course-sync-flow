import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Zap, Target, BookOpen, Award } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { profile } = useAuth();
  const fullName = profile?.full_name || 'Student';
  const initials = fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="glass gradient-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white/20">
              <AvatarFallback className="text-3xl bg-white/20">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
              <p className="text-white/90 mb-4">Class 12 • CBSE Board</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {profile?.role === 'student' ? 'Student' : 'Teacher'}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  Pro Member
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">2,450</div>
              <div className="text-white/80">Total XP</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
                  <div className={`w-16 h-16 rounded-full ${badge.color} flex items-center justify-center`}>
                    <badge.icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-xs text-center font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Progress */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Subject Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{subject.completed}/{subject.total} topics</span>
                  <span>Rank: #{subject.rank}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
                  <activity.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                {activity.score && (
                  <Badge variant="secondary">{activity.score}%</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const stats = [
  { icon: Zap, value: "12", label: "Day Streak", color: "gradient-primary" },
  { icon: Trophy, value: "#24", label: "Global Rank", color: "gradient-secondary" },
  { icon: Target, value: "45", label: "Topics Done", color: "gradient-accent" },
  { icon: BookOpen, value: "32", label: "Quizzes", color: "bg-success" },
];

const badges = [
  { name: "Fast Learner", icon: Zap, color: "gradient-primary" },
  { name: "Quiz Master", icon: Trophy, color: "gradient-secondary" },
  { name: "Streak King", icon: Target, color: "gradient-accent" },
];

const subjects = [
  { name: "Mathematics", progress: 75, completed: 45, total: 60, rank: 12 },
  { name: "Physics", progress: 60, completed: 36, total: 60, rank: 28 },
  { name: "Chemistry", progress: 85, completed: 51, total: 60, rank: 8 },
  { name: "Biology", progress: 70, completed: 42, total: 60, rank: 15 },
];

const activities = [
  { title: "Completed Thermodynamics Quiz", time: "2 hours ago", icon: Trophy, color: "gradient-primary", score: 88 },
  { title: "Studied Organic Chemistry", time: "1 day ago", icon: BookOpen, color: "gradient-secondary" },
  { title: "Earned 'Quick Learner' Badge", time: "2 days ago", icon: Zap, color: "gradient-accent" },
];

export default Profile;
