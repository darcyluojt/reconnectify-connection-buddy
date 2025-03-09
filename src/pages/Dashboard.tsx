
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConnectionCard from '@/components/ConnectionCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar, Filter, Search, Users, Clock, Zap, Star } from 'lucide-react';

const connectionsData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastContactDate: '8 months ago',
    recentActivity: 'Posted from Haleakala National Park',
    suggestedIcebreaker: "Hey Sarah! I noticed you're in Hawaii - that was on our travel bucket list last time we talked. How's your trip going?",
    mutualInterest: 'Travel Photography'
  },
  {
    id: '2',
    name: 'David Chen',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastContactDate: '6 months ago',
    recentActivity: 'Started following @coffeeroasters',
    suggestedIcebreaker: "Hey David! I saw you're getting into specialty coffee too. Have you tried that new roastery downtown?",
    mutualInterest: 'Coffee, Photography'
  },
  {
    id: '3',
    name: 'Aisha Patel',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    lastContactDate: '11 months ago',
    recentActivity: 'Liked your post from last summer',
    suggestedIcebreaker: "Aisha! I just saw you liked my beach photo from last year. Are you planning any summer trips this year?",
    mutualInterest: 'Beach Vacations, Reading'
  },
  {
    id: '4',
    name: 'Michael Torres',
    imageUrl: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6',
    lastContactDate: '1 year ago',
    recentActivity: 'You both follow @techconference',
    suggestedIcebreaker: "Michael! It's been ages. I saw we both follow TechConference - are you planning to attend this year?",
    mutualInterest: 'Technology, Gaming'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastContactDate: '9 months ago',
    recentActivity: 'Posted about climbing at Boulder Gym',
    suggestedIcebreaker: "Emma! I noticed you've been climbing at Boulder Gym - that's so cool! When did you get into climbing?",
    mutualInterest: 'Rock Climbing, Outdoor Activities'
  },
  {
    id: '6',
    name: 'James Rodriguez',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    lastContactDate: '7 months ago',
    recentActivity: 'Posted about new album release',
    suggestedIcebreaker: "James! I saw you posted about that new album. I've been listening to it too - what's your favorite track?",
    mutualInterest: 'Music, Concerts'
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [connections, setConnections] = useState(connectionsData);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const dailySuggestions = connections.slice(0, 3);
  const filteredConnections = connections.filter(connection => 
    connection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {/* Dashboard Header */}
          <div className="mb-8 space-y-3">
            <Badge className="bg-ohhey-blue/10 text-ohhey-blue border-none py-1 px-3">
              <Star size={14} className="mr-1" />
              Daily Reconnections
            </Badge>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Connections</h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              We've analyzed your social connections and found people you might want to reconnect with.
            </p>
          </div>

          {/* Today's Suggestions */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-ohhey-accent" />
                <h2 className="text-xl font-medium">Today's Reconnections</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={16} />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-[340px] rounded-xl bg-muted/50 animate-pulse" />
                ))
              ) : (
                dailySuggestions.map(connection => (
                  <ConnectionCard
                    key={connection.id}
                    {...connection}
                  />
                ))
              )}
            </div>
          </section>

          {/* All Connections */}
          <section>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-ohhey-blue" />
                <h2 className="text-xl font-medium">All Connections</h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search connections..."
                    className="pl-9 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Filter size={16} />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="all" className="text-sm">
                  All
                </TabsTrigger>
                <TabsTrigger value="recent" className="text-sm">
                  Recent Activity
                </TabsTrigger>
                <TabsTrigger value="oldest" className="text-sm">
                  Longest Time
                </TabsTrigger>
                <TabsTrigger value="favorites" className="text-sm">
                  Favorites
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <div key={i} className="h-[340px] rounded-xl bg-muted/50 animate-pulse" />
                ))
              ) : filteredConnections.length > 0 ? (
                filteredConnections.map(connection => (
                  <ConnectionCard
                    key={connection.id}
                    {...connection}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  <Clock size={48} className="mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-medium mb-1">No connections found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
