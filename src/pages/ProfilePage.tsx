
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft, RefreshCw, Send, Heart, MapPin, Clock, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

interface ProfilePost {
  id: string;
  content: string;
  imageUrl?: string;
  date: string;
  type: 'location' | 'activity' | 'update';
  location?: string;
  activity?: string;
}

interface ProfileData {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  lastContactDate: string;
  recommendationReason: string;
  recommendationType: 'shared-location' | 'liked-post' | 'mutual-interest' | 'long-time';
  recentPosts: ProfilePost[];
  suggestedIcebreaker: string;
}

// Mock data - in a real app, this would come from an API or context
const mockProfiles: Record<string, ProfileData> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    lastContactDate: "6 months ago",
    recommendationReason: "Sarah posted from Haleakala National Park, which was on your travel bucket list",
    recommendationType: "shared-location",
    recentPosts: [
      {
        id: "p1",
        content: "Sunrise at Haleakala was absolutely breathtaking! #vacation #hawaii",
        imageUrl: "https://images.unsplash.com/photo-1504198322253-cfa87a0ff60f",
        date: "3 days ago",
        type: "location",
        location: "Haleakala National Park, Hawaii"
      },
      {
        id: "p2",
        content: "Beach day in Maui! The water is so clear here.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        date: "5 days ago",
        type: "location",
        location: "Kaanapali Beach, Maui"
      },
      {
        id: "p3",
        content: "Excited to start my Hawaii adventure tomorrow!",
        date: "1 week ago",
        type: "update"
      }
    ],
    suggestedIcebreaker: "Hey Sarah! I noticed you're in Hawaii - that was on our travel bucket list last time we talked. How's your trip going?"
  },
  "2": {
    id: "2",
    name: "Alex Rodriguez",
    username: "alexrod",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lastContactDate: "8 months ago",
    recommendationReason: "Alex liked the same concert post that you did",
    recommendationType: "liked-post",
    recentPosts: [
      {
        id: "p1",
        content: "That concert was absolutely amazing! Still can't believe how good the acoustics were.",
        imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        date: "2 days ago",
        type: "activity",
        activity: "Coldplay Concert"
      },
      {
        id: "p2",
        content: "Just got tickets to see The Killers next month! Anyone else going?",
        date: "1 week ago",
        type: "update"
      },
      {
        id: "p3",
        content: "New playlist is up! Check out my favorites from this month.",
        date: "2 weeks ago",
        type: "update"
      }
    ],
    suggestedIcebreaker: "Hey Alex! Noticed we both liked that Coldplay concert post - did you end up going to any of their shows this year?"
  },
  "3": {
    id: "3",
    name: "Jamie Chen",
    username: "jamiec",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    lastContactDate: "1 year ago",
    recommendationReason: "You both follow the same photography pages",
    recommendationType: "mutual-interest",
    recentPosts: [
      {
        id: "p1",
        content: "Finally got to try astrophotography last night. So much to learn!",
        imageUrl: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45",
        date: "4 days ago",
        type: "activity",
        activity: "Astrophotography"
      },
      {
        id: "p2",
        content: "New camera day! Can't wait to test it out this weekend.",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        date: "1 week ago",
        type: "update"
      },
      {
        id: "p3",
        content: "Check out my latest photo series from the botanical gardens.",
        date: "2 weeks ago",
        type: "update"
      }
    ],
    suggestedIcebreaker: "Hi Jamie! It's been a while since we chatted about photography. Have you tried any new techniques lately? I just got into astrophotography myself."
  }
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activePostIndex, setActivePostIndex] = useState(0);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [message, setMessage] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id && mockProfiles[id]) {
      setProfile(mockProfiles[id]);
      setMessage(mockProfiles[id].suggestedIcebreaker);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handlePrevPost = () => {
    setActivePostIndex((prev) => (prev === 0 ? profile!.recentPosts.length - 1 : prev - 1));
  };

  const handleNextPost = () => {
    setActivePostIndex((prev) => (prev === profile!.recentPosts.length - 1 ? 0 : prev + 1));
  };

  const handleRegenerateMessage = () => {
    setRegenerating(true);
    // Simulate API call to regenerate message
    setTimeout(() => {
      const newMessages = [
        `Hey ${profile?.name}! I saw you were at ${profile?.recentPosts[0].location || "that place"} recently. How was it?`,
        `${profile?.name}! It's been a while since we caught up. I noticed you're into ${profile?.recommendationReason.includes('concert') ? 'concerts' : 'travel'} these days. What else is new?`,
        `Hi ${profile?.name}, I was just thinking about our last conversation. Your recent posts about ${profile?.recommendationType === 'shared-location' ? 'travel' : 'your interests'} made me want to reconnect!`
      ];
      const randomIndex = Math.floor(Math.random() * newMessages.length);
      setMessage(newMessages[randomIndex]);
      setRegenerating(false);
      toast.success("Generated a new message!");
    }, 1200);
  };

  const handleSendMessage = () => {
    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast.success(`Message sent to ${profile?.name}!`);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1000);
  };

  const getRecommendationIcon = () => {
    switch (profile?.recommendationType) {
      case 'shared-location':
        return { icon: MapPin, bgColor: 'bg-blue-100', textColor: 'text-blue-600' };
      case 'liked-post':
        return { icon: Heart, bgColor: 'bg-pink-100', textColor: 'text-pink-600' };
      case 'mutual-interest':
        return { icon: Zap, bgColor: 'bg-amber-100', textColor: 'text-amber-600' };
      case 'long-time':
        return { icon: Clock, bgColor: 'bg-indigo-100', textColor: 'text-indigo-600' };
      default:
        return { icon: Zap, bgColor: 'bg-ohhey-blue/10', textColor: 'text-ohhey-blue' };
    }
  };

  if (!profile) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  const { icon: RecommendationIcon, bgColor, textColor } = getRecommendationIcon();
  const activePost = profile.recentPosts[activePostIndex];

  return (
    <div className="container max-w-3xl py-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Suggestions
      </Button>
      
      <div className="flex flex-col gap-8">
        {/* Profile Header */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 flex gap-4 items-center">
            <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-subtle">
              <img 
                src={profile.imageUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name) + '&background=e8f5fe&color=3d9cf0&rounded=true';
                }}
              />
            </div>
            
            <div className="flex-1">
              <CardTitle className="text-2xl font-semibold">{profile.name}</CardTitle>
              <div className="flex flex-col gap-1 mt-1">
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>Last contact: {profile.lastContactDate}</span>
                </div>
              </div>
              
              <Badge variant="outline" className={cn("mt-3 font-normal text-xs flex items-center gap-1.5 w-fit", bgColor, textColor)}>
                <RecommendationIcon size={10} />
                <span>Reconnection suggestion</span>
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Recommendation Reason */}
        <div className="bg-muted/40 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">{profile.recommendationReason}</p>
        </div>

        {/* Recent Posts Carousel */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-ohhey-blue/10 to-transparent border-b">
            <CardTitle className="text-lg">Common activities</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              {/* Post Content */}
              <div className="min-h-[300px] bg-muted/20">
                {activePost.imageUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={activePost.imageUrl} 
                      alt="Post image" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {activePost.type === 'location' && activePost.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin size={12} />
                      <span>{activePost.location}</span>
                    </div>
                  )}
                  {activePost.type === 'activity' && activePost.activity && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Zap size={12} />
                      <span>{activePost.activity}</span>
                    </div>
                  )}
                  <p className="text-sm">{activePost.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{activePost.date}</p>
                </div>
              </div>
              
              {/* Carousel Controls */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-background/80 shadow-sm" 
                  onClick={handlePrevPost}
                >
                  <ArrowLeft size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-background/80 shadow-sm" 
                  onClick={handleNextPost}
                >
                  <ArrowLeft size={16} className="rotate-180" />
                </Button>
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
                {profile.recentPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === activePostIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => setActivePostIndex(index)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Message Editor */}
        <Card>
          <CardHeader className="bg-muted/30 border-b pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Send a Message</CardTitle>
              <Badge variant="outline" className="bg-primary/10 text-primary font-normal flex items-center gap-1 text-xs">
                <Sparkles size={10} />
                <span>AI Generated</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="min-h-[120px] resize-none"
            />
          </CardContent>
          <CardFooter className="justify-between border-t bg-muted/30 py-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerateMessage}
              disabled={regenerating || sending || sent}
            >
              {regenerating ? (
                <>
                  <RefreshCw size={14} className="mr-1.5 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <RefreshCw size={14} className="mr-1.5" />
                  Regenerate
                </>
              )}
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || sending || sent || regenerating}
              size="sm"
              className="bg-ohhey-blue hover:bg-ohhey-blue/90 text-white"
            >
              {sending ? (
                <>
                  <RefreshCw size={14} className="mr-1.5 animate-spin" />
                  Sending...
                </>
              ) : sent ? (
                <>
                  <MessageCircle size={14} className="mr-1.5" />
                  Sent!
                </>
              ) : (
                <>
                  <Send size={14} className="mr-1.5" />
                  Send Message
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
