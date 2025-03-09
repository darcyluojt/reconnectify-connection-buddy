
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageCircle, Clock, Zap, Send, RefreshCw, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

interface ReconnectRecommendationProps {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  lastContactDate: string;
  recommendationReason: string;
  recommendationType: 'shared-location' | 'liked-post' | 'mutual-interest' | 'long-time';
  suggestedIcebreaker: string;
  className?: string;
}

const ReconnectRecommendation = ({
  id,
  name,
  username,
  imageUrl,
  lastContactDate,
  recommendationReason,
  recommendationType,
  suggestedIcebreaker,
  className
}: ReconnectRecommendationProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [icebreaker, setIcebreaker] = useState(suggestedIcebreaker);
  const [regenerating, setRegenerating] = useState(false);

  const handleSendMessage = () => {
    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success(`Message sent to ${name}!`);
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }, 1000);
  };

  const handleViewDetails = () => {
    navigate(`/profile/${id}`);
  };

  const handleRegenerateIcebreaker = () => {
    setRegenerating(true);
    // Simulate API call to regenerate icebreaker
    setTimeout(() => {
      const newIcebreakers = [
        `Hey ${name}! I saw you were at ${recommendationType === 'shared-location' ? 'the same place' : 'an event'} recently. How was it?`,
        `${name}! It's been a while since we caught up. I noticed ${recommendationReason.toLowerCase()}. How have you been?`,
        `Hi ${name}, I was just thinking about our last conversation. ${recommendationReason} made me want to reconnect!`
      ];
      const randomIndex = Math.floor(Math.random() * newIcebreakers.length);
      setIcebreaker(newIcebreakers[randomIndex]);
      setRegenerating(false);
      toast.success("Generated a new icebreaker!");
    }, 1200);
  };

  const getRecommendationIcon = () => {
    switch (recommendationType) {
      case 'shared-location':
        return { icon: User, bgColor: 'bg-ohhey-blue/10', textColor: 'text-ohhey-blue' };
      case 'liked-post':
        return { icon: Heart, bgColor: 'bg-pink-100', textColor: 'text-pink-600' };
      case 'mutual-interest':
        return { icon: Zap, bgColor: 'bg-amber-100', textColor: 'text-amber-600' };
      case 'long-time':
        return { icon: Clock, bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' };
      default:
        return { icon: User, bgColor: 'bg-ohhey-blue/10', textColor: 'text-ohhey-blue' };
    }
  };

  const { icon: RecommendationIcon, bgColor, textColor } = getRecommendationIcon();

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300 h-[206px]',
        expanded ? 'h-auto shadow-elevated' : 'hover:shadow-subtle',
        className
      )}
    >
      <CardContent className="p-4 flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-subtle">
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
            <div className="w-full h-full flex items-center justify-center bg-ohhey-light text-ohhey-blue">
              <User size={18} />
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <span className="text-sm text-muted-foreground">@{username}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>Last contact: {lastContactDate}</span>
          </div>
          
          <Badge variant="outline" className={cn("mt-2 font-normal text-xs flex items-center gap-1.5 w-fit", bgColor, textColor)}>
            <RecommendationIcon size={10} />
            <span>Reconnection suggestion</span>
          </Badge>
          
          <p className="mt-1.5 text-sm line-clamp-2">{recommendationReason}</p>
        </div>
      </CardContent>
      
      {expanded && (
        <div className="px-4 pt-0 pb-2 animate-slide-up">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-primary/10 text-primary font-normal flex items-center gap-1 text-xs">
              <Zap size={10} />
              <span>AI Icebreaker</span>
            </Badge>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={handleRegenerateIcebreaker}
              disabled={regenerating}
            >
              <RefreshCw size={14} className={regenerating ? "animate-spin" : ""} />
            </Button>
          </div>
          <div className="mt-2 p-3 bg-muted/50 rounded-lg text-sm">
            <Textarea
              value={icebreaker}
              onChange={(e) => setIcebreaker(e.target.value)}
              className="min-h-[80px] resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              placeholder="Your icebreaker message..."
            />
          </div>
        </div>
      )}
      
      <CardFooter className={cn(
        "flex gap-2 p-4 pt-0",
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
          onClick={expanded ? () => setExpanded(false) : handleViewDetails}
          className={cn("text-sm", expanded && "bg-ohhey-blue hover:bg-ohhey-blue/90")}
        >
          {expanded ? 'Close' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReconnectRecommendation;
