
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-ohhey-light/50">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-ohhey-blue to-ohhey-dark flex-center">
                <span className="text-white font-semibold text-lg">O</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">OhHey</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-[260px]">
              Reconnect with friends, strengthen relationships, and rediscover shared moments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-ohhey-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-ohhey-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-ohhey-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-medium text-base mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Connections</Link></li>
              <li><Link to="/icebreakers" className="text-muted-foreground hover:text-foreground transition-colors">Icebreakers</Link></li>
              <li><Link to="/meetups" className="text-muted-foreground hover:text-foreground transition-colors">Meetups</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-base mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Partners</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} OhHey. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <Heart size={14} className="text-red-500" /> for meaningful connections
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
