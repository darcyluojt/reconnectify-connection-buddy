
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Users, MessageCircle, MapPin, ArrowDownCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConnectionCard from '@/components/ConnectionCard';
import IcebreakerGenerator from '@/components/IcebreakerGenerator';
import MeetupSuggestion from '@/components/MeetupSuggestion';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent" />
      <div className="container py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full border border-ohhey-blue/30 bg-ohhey-blue/10 px-3 py-1 text-sm text-ohhey-blue">
                <span className="animate-pulse mr-1.5">•</span> Introducing OhHey
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight md:leading-tight lg:leading-tight animate-slide-down">
              Reconnect with the people that matter
            </h1>
            <p className="text-lg text-muted-foreground">
              OhHey helps you maintain meaningful connections by reminding you of friends you haven't spoken to in a while and providing AI-powered icebreakers to make reconnecting effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-ohhey-blue hover:bg-ohhey-blue/90 text-white shadow-subtle h-12 px-6 sm:px-10" 
                onClick={() => navigate('/dashboard')}
              >
                Get Started <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="h-12 border-ohhey-blue/20 text-ohhey-dark"
              >
                <Github size={18} className="mr-2" /> View on GitHub
              </Button>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] md:h-[500px] flex justify-center">
            <div className="absolute w-[280px] md:w-[320px] animate-float shadow-elevated">
              <ConnectionCard
                id="1"
                name="Sarah Johnson"
                imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                lastContactDate="8 months ago"
                recentActivity="Posted from Haleakala National Park"
                suggestedIcebreaker="Hey Sarah! I noticed you're in Hawaii - that was on our travel bucket list last time we talked. How's your trip going?"
                mutualInterest="Travel Photography"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDownCircle size={24} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-32 bg-ohhey-light/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-ohhey-accent/20 text-ohhey-dark border-none py-1 px-3">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Maintain meaningful connections with ease
          </h2>
          <p className="text-lg text-muted-foreground">
            OhHey helps you rediscover connections that matter and takes the awkwardness out of reaching out after a long time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Daily Reconnection Suggestions',
              description: 'Get personalized suggestions of three people to reconnect with each day, based on how long it's been since your last interaction.'
            },
            {
              icon: MessageCircle,
              title: 'AI-Powered Icebreakers',
              description: 'Never struggle with what to say. Our AI generates personalized conversation starters based on your shared interests and recent activities.'
            },
            {
              icon: MapPin,
              title: 'Meetup Recommendations',
              description: 'Turn digital connections into real-life meetups with location-based suggestions for activities and venues you'll both enjoy.'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-subtle border border-border transition-all duration-300 hover:shadow-elevated hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 rounded-lg bg-ohhey-blue/10 flex-center mb-4">
                <feature.icon size={24} className="text-ohhey-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PreviewSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/20 text-primary border-none py-1 px-3">
            Preview
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            See OhHey in action
          </h2>
          <p className="text-lg text-muted-foreground">
            From reconnecting suggestions to AI icebreakers and meetup planning, OhHey makes maintaining relationships effortless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MeetupSuggestion
            id="1"
            title="Coffee at Blue Bottle"
            description="Catch up over specialty coffee at this new place downtown that just opened last month."
            imageUrl="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"
            location="Blue Bottle Coffee, Downtown"
            distance="1.2 miles"
            date="Sat, June 24"
            time="10:00 AM"
            participants={[
              { id: "1", name: "Mark Wilson", imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
              { id: "2", name: "Aisha Johnson", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956" }
            ]}
          />
          
          <div className="lg:col-span-2">
            <IcebreakerGenerator className="h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "OhHey helped me reconnect with an old college friend I hadn't spoken to in years. We're meeting up next week!",
      author: "Jamie Chen",
      role: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
    },
    {
      quote: "I'm terrible at keeping in touch, but this app makes it so easy with the AI message suggestions. Game changer!",
      author: "Marcus Williams",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      quote: "The meetup suggestions are spot on. OhHey recommended a pottery class that me and my friend both loved.",
      author: "Sophia Rodriguez",
      role: "Teacher",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-ohhey-light/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-ohhey-blue/20 text-ohhey-blue border-none py-1 px-3">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            What our users are saying
          </h2>
          <p className="text-lg text-muted-foreground">
            OhHey has helped thousands of people strengthen their relationships and build meaningful connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-effect rounded-xl p-6 shadow-glass"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.author}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ohhey-blue to-ohhey-dark text-white p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to start reconnecting?</h2>
            <p className="text-white/80 text-lg mb-6">
              Join thousands of people who use OhHey to maintain meaningful relationships and never lose touch with friends again.
            </p>
            <Button 
              className="bg-white text-ohhey-dark hover:bg-white/90 shadow-subtle h-12 px-8" 
              onClick={() => navigate('/dashboard')}
            >
              Get Started <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PreviewSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
