import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';
import { User, getCurrentUser, logout } from '@/lib/auth';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Track scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Check for user on load
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);
  
  const handleLogout = () => {
    logout();
    setUser(null);
    toast.success('Successfully logged out');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Vulnerabilities', path: '/vulnerabilities' },
    { name: 'Threat Models', path: '/threats' },
    { name: 'Security Tests', path: '/tests' }
  ];
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-2xl font-semibold text-primary flex items-center"
          >
            <span className="inline-block mr-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 16V12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 8H12.01" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            SecuritySentinel
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.path 
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* User section */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">
                {user.name}
              </span>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                {user.name.charAt(0)}
              </div>
              <CustomButton
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                Log Out
              </CustomButton>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <CustomButton variant="ghost" size="sm">
                  Log In
                </CustomButton>
              </Link>
              <Link to="/signup">
                <CustomButton variant="primary" size="sm">
                  Sign Up
                </CustomButton>
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center p-2 rounded-md text-primary md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md shadow-lg rounded-lg mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  location.pathname === link.path 
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-primary'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center px-3 py-2">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <span className="ml-3 text-sm font-medium">
                    {user.name}
                  </span>
                </div>
                <CustomButton
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2"
                >
                  Log Out
                </CustomButton>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <CustomButton variant="ghost" size="sm" fullWidth>
                    Log In
                  </CustomButton>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <CustomButton variant="primary" size="sm" fullWidth>
                    Sign Up
                  </CustomButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
