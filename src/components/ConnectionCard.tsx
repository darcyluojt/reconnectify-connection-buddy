
import { useState } from 'react';
import { User, MessageCircle, Clock, Zap, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ConnectionCardProps {
  id: string;
  name: string;
  imageUrl: string;
  lastContactDate: string;
  mutualInterest?: string;
  suggestedIcebreaker?: string;
  recentActivity?: string;
  className?: string;
}

const ConnectionCard = ({
  id,
  name,
  imageUrl,
  lastContactDate,
  mutualInterest,
  suggestedIcebreaker,
  recentActivity,
  className
}: ConnectionCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendMessage = () => {
    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }, 1000);
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300',
        expanded ? 'shadow-elevated' : 'hover:shadow-subtle',
        className
      )}
    >
      <CardHeader className="p-0">
        <div className="relative h-32 bg-gradient-to-r from-ohhey-blue/10 to-ohhey-light">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/80 to-transparent h-1/2" />
          <div className="absolute left-6 -bottom-6 w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden shadow-subtle">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=e8f5fe&color=3d9cf0&rounded=true';
                }}
              />
            ) : (
              <div className="w-full h-full flex-center bg-ohhey-light text-ohhey-blue">
                <User size={24} />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-10 pb-3">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>Last contact: {lastContactDate}</span>
        </div>
        
        {recentActivity && (
          <div className="mt-3">
            <Badge variant="outline" className="bg-ohhey-light text-ohhey-dark font-normal">Recent activity</Badge>
            <p className="mt-1.5 text-sm">{recentActivity}</p>
          </div>
        )}

        {expanded && mutualInterest && (
          <div className="mt-3 animate-slide-up">
            <Badge variant="outline" className="bg-ohhey-accent/10 text-ohhey-dark font-normal">Mutual interest</Badge>
            <p className="mt-1.5 text-sm">{mutualInterest}</p>
          </div>
        )}

        {expanded && suggestedIcebreaker && (
          <div className="mt-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-primary/10 text-primary font-normal flex items-center gap-1">
                <Zap size={12} />
                <span>Suggested icebreaker</span>
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <RefreshCw size={14} />
              </Button>
            </div>
            <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm italic">
              "{suggestedIcebreaker}"
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className={cn(
        "flex gap-2",
        expanded ? "justify-between" : "justify-end"
      )}>
        {expanded && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm w-auto"
            onClick={handleSendMessage}
            disabled={sending || sent}
          >
            {sending ? (
              <>
                <RefreshCw size={14} className="mr-1 animate-spin" />
                Sending...
              </>
            ) : sent ? (
              <>
                <MessageCircle size={14} className="mr-1 text-green-500" />
                Sent!
              </>
            ) : (
              <>
                <Send size={14} className="mr-1" />
                Send
              </>
            )}
          </Button>
        )}
        <Button 
          variant={expanded ? "default" : "ghost"} 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className={cn("text-sm", expanded && "bg-ohhey-blue hover:bg-ohhey-blue/90")}
        >
          {expanded ? 'Close' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
