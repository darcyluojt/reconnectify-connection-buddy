
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ProfileImage from './reconnect/ProfileImage';
import RecommendationBadge from './reconnect/RecommendationBadge';
import IcebreakerSection from './reconnect/IcebreakerSection';
import MessageButton from './reconnect/MessageButton';

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

  const handleViewDetails = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300 h-[206px]',
        expanded ? 'h-auto shadow-elevated' : 'hover:shadow-subtle',
        className
      )}
    >
      <CardContent className="p-4 flex gap-4">
        <ProfileImage imageUrl={imageUrl} name={name} />
        
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-sm text-muted-foreground">@{username}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>Last contact: {lastContactDate}</span>
          </div>
          
          <RecommendationBadge type={recommendationType} />
          
          <p className="mt-1.5 text-sm line-clamp-2">{recommendationReason}</p>
        </div>
      </CardContent>
      
      {expanded && (
        <IcebreakerSection 
          suggestedIcebreaker={suggestedIcebreaker}
          name={name}
          recommendationType={recommendationType}
          recommendationReason={recommendationReason}
        />
      )}
      
      <CardFooter className={cn(
        "flex gap-2 p-4 pt-0",
        expanded ? "justify-between" : "justify-end"
      )}>
        {expanded && (
          <MessageButton name={name} />
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
