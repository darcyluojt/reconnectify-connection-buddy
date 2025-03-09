import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IcebreakerGenerator from '@/components/IcebreakerGenerator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, UserPlus, Clock, Send, Bookmark, BookmarkCheck, MessageCircle } from 'lucide-react';

const previousIcebreakerData = [
  {
    id: '1',
    message: "Hey Sarah! I noticed you posted about hiking in Joshua Tree last weekend - that's one of my favorite spots too! How was the trail?",
    recipient: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    date: '2 days ago',
    sent: true
  },
  {
    id: '2',
    message: "Hi Jason, I saw we both follow that new coffee shop downtown. Have you tried their seasonal drinks yet? Been meaning to check it out!",
    recipient: {
      name: 'Jason Lee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
    },
    date: '5 days ago',
    sent: true
  },
  {
    id: '3',
    message: "Alex! It's been ages since we caught up after that conference. I just saw your photo from Barcelona - looks amazing! How was your trip?",
    recipient: {
      name: 'Alex Morgan',
      avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6'
    },
    date: '1 week ago',
    sent: false
  },
  {
    id: '4',
    message: "Raj, I noticed we both liked that article about sustainable fashion. Have you discovered any good ethical brands lately?",
    recipient: {
      name: 'Raj Patel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
    },
    date: '2 weeks ago',
    sent: true
  }
];

const savedTemplates = [
  {
    id: '1',
    title: 'Casual catch-up',
    message: "Hey [Name]! It's been a while since we caught up. How have you been? Anything exciting happening in your world lately?",
  },
  {
    id: '2',
    title: 'Shared interest',
    message: "Hi [Name]! I just [saw/read/heard] something about [shared interest] and immediately thought of you. Have you [seen/experienced] it yet?",
  },
  {
    id: '3',
    title: 'Event follow-up',
    message: "Hey [Name]! It was so great seeing you at [event]. We should definitely catch up properly sometime soon. How's your schedule looking next week?",
  }
];

const recipientSuggestions = [
  {
    id: '1',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastContact: '9 months ago'
  },
  {
    id: '2',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastContact: '6 months ago'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    lastContact: '11 months ago'
  }
];

const PreviousIcebreaker = ({ item }: { item: typeof previousIcebreakerData[0] }) => {
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-subtle transition-all duration-300 hover:shadow-elevated">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={item.recipient.avatar} alt={item.recipient.name} />
            <AvatarFallback>{item.recipient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{item.recipient.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={12} />
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => setSaved(!saved)}
        >
          {saved ? <BookmarkCheck size={16} className="text-ohhey-blue" /> : <Bookmark size={16} />}
        </Button>
      </div>
      <div className="bg-muted/30 rounded-lg p-3 mb-3 text-sm italic">
        "{item.message}"
      </div>
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className={item.sent ? "bg-green-50 text-green-700 border-green-200" : "bg-ohhey-light border-ohhey-blue/20 text-ohhey-dark"}
        >
          {item.sent ? (
            <>
              <MessageCircle size={12} className="mr-1" /> Sent
            </>
          ) : (
            <>
              <Bookmark size={12} className="mr-1" /> Saved
            </>
          )}
        </Badge>
        {!item.sent && (
          <Button size="sm" className="bg-ohhey-blue hover:bg-ohhey-blue/90 text-white">
            <Send size={14} className="mr-1.5" /> Send
          </Button>
        )}
      </div>
    </div>
  );
};

const Icebreakers = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-transition min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8 space-y-3">
            <Badge className="bg-primary/10 text-primary border-none py-1 px-3">
              <Sparkles size={14} className="mr-1" />
              AI-Powered
            </Badge>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Icebreakers</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Never struggle with what to say. Create personalized messages to reconnect with friends effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Main Generator */}
            <div className="lg:col-span-2">
              <IcebreakerGenerator />
            </div>

            {/* Recipient Suggestions */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Suggested Recipients</h2>
                <Button variant="ghost" size="sm" className="text-ohhey-blue">
                  <UserPlus size={16} className="mr-1.5" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-3">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-20 rounded-lg bg-muted/50 animate-pulse" />
                  ))
                ) : (
                  recipientSuggestions.map(person => (
                    <div 
                      key={person.id} 
                      className="bg-white rounded-lg border border-border p-3 flex items-center justify-between shadow-subtle transition-all duration-200 hover:bg-ohhey-light/50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} />
                            <span>Last contact: {person.lastContact}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Send size={16} />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Saved Templates</h2>
                  <Button variant="ghost" size="sm" className="text-ohhey-blue">
                    <Bookmark size={16} className="mr-1.5" />
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-[100px] rounded-lg bg-muted/50 animate-pulse" />
                    ))
                  ) : (
                    savedTemplates.map(template => (
                      <div 
                        key={template.id} 
                        className="bg-white rounded-lg border border-border p-3 shadow-subtle transition-all duration-200 hover:shadow-elevated cursor-pointer"
                      >
                        <div className="font-medium mb-1">{template.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {template.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Previous Icebreakers */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Previous Icebreakers</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="h-[200px] rounded-xl bg-muted/50 animate-pulse" />
                ))
              ) : (
                previousIcebreakerData.map(item => (
                  <PreviousIcebreaker key={item.id} item={item} />
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Icebreakers;