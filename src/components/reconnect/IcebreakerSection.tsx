
import { useState } from 'react';
import { Zap, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";

interface IcebreakerSectionProps {
  suggestedIcebreaker: string;
  name: string;
  recommendationType: string;
  recommendationReason: string;
}

const IcebreakerSection = ({ 
  suggestedIcebreaker, 
  name, 
  recommendationType, 
  recommendationReason 
}: IcebreakerSectionProps) => {
  const [icebreaker, setIcebreaker] = useState(suggestedIcebreaker);
  const [regenerating, setRegenerating] = useState(false);

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

  return (
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
  );
};

export default IcebreakerSection;
