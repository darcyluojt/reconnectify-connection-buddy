
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, MapPin, Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Connections', path: '/dashboard', icon: Users },
    { name: 'Icebreakers', path: '/icebreakers', icon: MessageCircle },
    { name: 'Meetups', path: '/meetups', icon: MapPin },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        scrolled || mobileMenuOpen ? 'glass-effect shadow-subtle' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 translate-y-0 transition-transform">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-ohhey-blue to-ohhey-dark flex-center">
            <span className="text-white font-semibold text-lg">O</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">OhHey</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  'flex items-center gap-1.5 py-2 border-b-2 transition-all duration-200',
                  location.pathname === item.path ? 
                    'border-ohhey-blue text-ohhey-dark font-medium' : 
                    'border-transparent hover:border-ohhey-blue/50'
                )}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign In Button */}
        <div className="hidden md:block">
          <Button className="bg-primary hover:bg-primary/90 shadow-subtle">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect animate-scale-in overflow-hidden">
          <nav className="container py-6 flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-all duration-200',
                    location.pathname === item.path ? 
                      'bg-ohhey-blue/10 text-ohhey-dark font-medium' : 
                      'hover:bg-ohhey-light'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <Button className="mt-4 w-full bg-primary hover:bg-primary/90 shadow-subtle">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
