
import { User, Heart, Zap, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type RecommendationType = 'shared-location' | 'liked-post' | 'mutual-interest' | 'long-time';

interface RecommendationBadgeProps {
  type: RecommendationType;
  className?: string;
}

const RecommendationBadge = ({ type, className }: RecommendationBadgeProps) => {
  const getRecommendationIcon = () => {
    switch (type) {
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
    <Badge variant="outline" className={cn("mt-2 font-normal text-xs flex items-center gap-1.5 w-fit", bgColor, textColor, className)}>
      <RecommendationIcon size={10} />
      <span>Reconnection suggestion</span>
    </Badge>
  );
};

export default RecommendationBadge;
