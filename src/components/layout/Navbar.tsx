
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, AlertTriangle, Home, FileText } from 'lucide-react';
import { toast } from 'sonner';
import CustomButton from '@/components/ui/CustomButton';
import useMobile from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLoginClick = () => {
    toast.info("Login functionality would be implemented here");
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">SecuritySentinel</span>
            </Link>
            
            {!isMobile && (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  to="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center">
                    <Home className="w-4 h-4 mr-1.5" />
                    Dashboard
                  </span>
                </Link>
                
                <Link 
                  to="/vulnerabilities" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/vulnerabilities') 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1.5" />
                    Vulnerabilities
                  </span>
                </Link>
                
                <Link 
                  to="/threat-models" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/threat-models') 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1.5" />
                    Threat Models
                  </span>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {!isMobile && (
              <CustomButton
                variant="outline"
                size="sm"
                onClick={handleLoginClick}
                className="mr-3"
              >
                Log in
              </CustomButton>
            )}
            
            {isMobile && (
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-b border-border shadow-sm">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground hover:bg-secondary hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <Home className="w-5 h-5 mr-2" />
                Dashboard
              </span>
            </Link>
            
            <Link
              to="/vulnerabilities"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/vulnerabilities') 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground hover:bg-secondary hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Vulnerabilities
              </span>
            </Link>
            
            <Link
              to="/threat-models"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/threat-models') 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground hover:bg-secondary hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Threat Models
              </span>
            </Link>
            
            <div className="pt-4">
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => {
                  handleLoginClick();
                  setIsMenuOpen(false);
                }}
                className="w-full"
              >
                Log in
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
