
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReconnectRecommendation from '@/components/ReconnectRecommendation';
import { toast } from "sonner";

// Mock data for demonstration purposes
const initialRecommendations = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastContactDate: "6 months ago",
    recommendationReason: "Sarah posted from Haleakala National Park, which was on your travel bucket list",
    recommendationType: "shared-location" as const,
    suggestedIcebreaker: "Hey Sarah! I noticed you're in Hawaii - that was on our travel bucket list last time we talked. How's your trip going?"
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    username: "alexrod",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lastContactDate: "8 months ago",
    recommendationReason: "Alex liked the same concert post that you did",
    recommendationType: "liked-post" as const,
    suggestedIcebreaker: "Hey Alex! Noticed we both liked that Coldplay concert post - did you end up going to any of their shows this year?"
  },
  {
    id: "3",
    name: "Jamie Chen",
    username: "jamiec",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    lastContactDate: "1 year ago",
    recommendationReason: "You both follow the same photography pages",
    recommendationType: "mutual-interest" as const,
    suggestedIcebreaker: "Hi Jamie! It's been a while since we chatted about photography. Have you tried any new techniques lately? I just got into astrophotography myself."
  }
];

const Connections = () => {
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  useEffect(() => {
    // Simulate loading data on initial page load
    const timer = setTimeout(() => {
      toast.success("Today's reconnection suggestions are ready!");
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API fetch for fresh recommendations
    setTimeout(() => {
      // For demo purposes, we'll just shuffle the existing recommendations
      const shuffled = [...recommendations].sort(() => Math.random() - 0.5);
      setRecommendations(shuffled);
      setRefreshing(false);
      setLastRefreshed(new Date());
      toast.success("Refreshed your reconnection suggestions!");
    }, 1500);
  };

  const formatRefreshTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container max-w-5xl py-8 bg-white">
      <div className="w-full h-[450px] overflow-hidden">
        <img src="/public/Instagram.jpg" alt="Instagram" className="w-full object-cover object-top" />
      </div>      
      <div className="flex flex-col gap-6 mx-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold tracking-tight">Reconnect with</h1>
            <img src="/public/logo.png" alt="Connections" className="w-32 ml-2" />
          </div>
            <p className="text-muted-foreground mt-1">
              We've found 3 people you might want to catch up with
            </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Last updated: {formatRefreshTime(lastRefreshed)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {recommendations.map((recommendation) => (
            <ReconnectRecommendation
              key={recommendation.id}
              {...recommendation}
            />
          ))}
        </div>
      </div>
      <img src="/public/Instagram_bottom.jpg" alt="Instagram" className='w-full'/>
    </div>
         
  
  );
};

export default Connections;
