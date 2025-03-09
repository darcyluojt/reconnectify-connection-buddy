
import { useState } from 'react';
import { MapPin, Calendar, Clock, Users, Check, Share2, Heart } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MeetupSuggestionProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  distance: string;
  date: string;
  time: string;
  participants: { id: string; name: string; imageUrl?: string }[];
  className?: string;
}

const MeetupSuggestion = ({
  id,
  title,
  description,
  imageUrl,
  location,
  distance,
  date,
  time,
  participants,
  className,
}: MeetupSuggestionProps) => {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const handleSaveToggle = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300 hover:shadow-elevated',
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge
          className="absolute top-4 right-4 bg-white/90 text-ohhey-dark font-normal"
        >
          <MapPin size={14} className="mr-1 text-ohhey-blue" />
          {distance} away
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-muted-foreground" />
            <span>{participants.length} friends</span>
          </div>
        </div>

        <div className="pt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Suggested with</span>
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant) => (
                <div
                  key={participant.id}
                  className="w-7 h-7 rounded-full border-2 border-white bg-muted overflow-hidden"
                >
                  {participant.imageUrl ? (
                    <img
                      src={participant.imageUrl}
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-ohhey-light flex-center text-xs font-medium text-ohhey-blue">
                      {participant.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {participants.length > 3 && (
                <div className="w-7 h-7 rounded-full border-2 border-white bg-ohhey-light flex-center text-xs font-medium text-ohhey-blue">
                  +{participants.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "text-sm transition-all duration-300",
            saved && "bg-red-50 text-red-500 border-red-200"
          )}
          onClick={handleSaveToggle}
        >
          <Heart
            size={16}
            className={cn(
              "mr-1.5",
              saved ? "fill-red-500 text-red-500" : "text-muted-foreground"
            )}
          />
          {saved ? 'Saved' : 'Save'}
        </Button>
        
        <Button
          size="sm"
          className="bg-ohhey-blue hover:bg-ohhey-blue/90 text-white"
          onClick={handleShare}
        >
          {shared ? (
            <>
              <Check size={16} className="mr-1.5" />
              Shared!
            </>
          ) : (
            <>
              <Share2 size={16} className="mr-1.5" />
              Share
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeetupSuggestion;
