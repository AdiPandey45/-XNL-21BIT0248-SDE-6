
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import SecurityOverview from '@/components/dashboard/SecurityOverview';
import VulnerabilityCard from '@/components/dashboard/VulnerabilityCard';
import ThreatModel from '@/components/dashboard/ThreatModel';
import CustomButton from '@/components/ui/CustomButton';
import { vulnerabilities, threatModels, SecurityVulnerability, ThreatModel as ThreatModelType } from '@/lib/securityData';
import { getCurrentUser, User } from '@/lib/auth';
import { toast } from '@/components/ui/sonner';
import LoginForm from '@/components/auth/LoginForm';
import FadeTransition from '@/components/transitions/FadeTransition';

const Index: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [topVulnerabilities, setTopVulnerabilities] = useState<SecurityVulnerability[]>([]);
  const [topThreats, setTopThreats] = useState<ThreatModelType[]>([]);
  
  // Animation transition
  useEffect(() => {
    // Simulating page load delay for smoother animations
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Check for user on load
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Get top vulnerabilities (critical and high)
    const criticalAndHigh = vulnerabilities
      .filter(v => v.severity === 'critical' || v.severity === 'high')
      .slice(0, 3);
    setTopVulnerabilities(criticalAndHigh);
    
    // Get top threats
    setTopThreats(threatModels.slice(0, 2));
  }, []);
  
  // If user is not logged in, show login form
  if (!user && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        <div className="pt-24 pb-16 px-4 flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-6">Welcome to SecuritySentinel</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your comprehensive security monitoring and vulnerability assessment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CustomButton 
                size="lg" 
                variant="primary"
                onClick={() => toast.info('This is a demo. Please use the login form below.')}
              >
                Get Started
              </CustomButton>
              <CustomButton 
                size="lg" 
                variant="outline"
                onClick={() => toast.info('This is a demo. Documentation is not available.')}
              >
                Learn More
              </CustomButton>
            </div>
          </div>
          
          <LoginForm />
          
          <div className="mt-24 text-center text-sm text-muted-foreground">
            <p>© 2023 SecuritySentinel. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeTransition show={isVisible} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Security Dashboard</h1>
                <p className="text-muted-foreground mt-2">Monitor your application's security posture at a glance</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-4">
                <CustomButton variant="outline">Export Report</CustomButton>
                <CustomButton variant="primary">Run Analysis</CustomButton>
              </div>
            </div>
            
            <SecurityOverview />
          </FadeTransition>
          
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Vulnerabilities</h2>
              <CustomButton variant="ghost" size="sm">View All</CustomButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topVulnerabilities.map((vulnerability, index) => (
                <FadeTransition 
                  key={vulnerability.id}
                  show={isVisible} 
                  className="transform transition-all duration-500"
                  // Stagger animations
                  duration={300 + (index * 100)}
                >
                  <VulnerabilityCard vulnerability={vulnerability} />
                </FadeTransition>
              ))}
            </div>
          </div>
          
          <div className="mt-12 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Threat Models</h2>
              <CustomButton variant="ghost" size="sm">View All</CustomButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topThreats.map((threatModel, index) => (
                <FadeTransition 
                  key={threatModel.id}
                  show={isVisible} 
                  className="transform transition-all duration-500"
                  duration={600 + (index * 100)}
                >
                  <ThreatModel threatModel={threatModel} />
                </FadeTransition>
              ))}
            </div>
          </div>
          
          <div className="mt-16 bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Need a comprehensive security assessment?</h2>
                <p className="text-muted-foreground">Our security experts can help identify and mitigate vulnerabilities in your system.</p>
              </div>
              <CustomButton variant="primary" className="mt-4 md:mt-0">
                Schedule Consultation
              </CustomButton>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
