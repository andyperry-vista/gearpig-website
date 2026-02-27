import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="font-display text-2xl font-bold text-foreground tracking-wider">
                GEAR<span className="text-primary">PIG</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium gear for the bold. Unleash your inner pig with our exclusive collection of clothing and toys.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-6">SHOP</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/clothing" className="hover:text-primary transition-colors">Clothing</Link></li>
              <li><Link to="/toys" className="hover:text-primary transition-colors">Toys</Link></li>
              <li><Link to="/gear" className="hover:text-primary transition-colors">Gear</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-6">SUPPORT</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold mb-6">STAY IN THE KNOW</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive drops and offers.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-secondary/5 border border-border/10 rounded-sm px-4 py-2 text-foreground text-sm focus:outline-none focus:border-primary w-full"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-sm font-bold text-sm">
                JOIN
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border/10 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} GearPig. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
