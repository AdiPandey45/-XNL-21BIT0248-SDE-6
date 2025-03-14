
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Shield, ShieldAlert, Lock, Key, RefreshCw } from 'lucide-react';

interface SecurityFeatureProps {
  title: string;
  description: string;
  implemented: boolean;
  icon: React.ReactNode;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({
  title,
  description,
  implemented,
  icon
}) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg bg-white border border-border hover:shadow-sm transition-all">
    <div className={cn(
      "flex-shrink-0 p-2 rounded-md",
      implemented ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
    )}>
      {icon}
    </div>
    <div>
      <div className="flex items-center space-x-2">
        <h4 className="font-medium">{title}</h4>
        {implemented && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Implemented
          </span>
        )}
        {!implemented && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Planned
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

interface SecurityImplementationProps {
  className?: string;
}

const SecurityImplementation: React.FC<SecurityImplementationProps> = ({ className }) => {
  const securityFeatures: SecurityFeatureProps[] = [
    {
      title: "Content Security Policy",
      description: "Restricts sources of executable scripts to prevent XSS attacks",
      implemented: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "HTTP Security Headers",
      description: "Implements X-Frame-Options, X-Content-Type-Options, and other security headers",
      implemented: true,
      icon: <ShieldAlert className="w-5 h-5" />
    },
    {
      title: "JWT Authentication",
      description: "Secure token-based authentication with proper validation",
      implemented: true,
      icon: <Key className="w-5 h-5" />
    },
    {
      title: "CSRF Protection",
      description: "Anti-CSRF tokens for all state-changing requests",
      implemented: true,
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Input Sanitization",
      description: "Sanitizes all user inputs to prevent injection attacks",
      implemented: true,
      icon: <Check className="w-5 h-5" />
    },
    {
      title: "Secure Cookies",
      description: "HttpOnly, Secure, and SameSite cookie attributes",
      implemented: true,
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: "Rate Limiting",
      description: "Limits request rates to prevent brute force attacks",
      implemented: false,
      icon: <RefreshCw className="w-5 h-5" />
    },
    {
      title: "Two-Factor Authentication",
      description: "Additional security layer with time-based OTP",
      implemented: false,
      icon: <Key className="w-5 h-5" />
    }
  ];

  return (
    <div className={cn("bg-white rounded-xl border border-border p-6 hover:shadow-md transition-all", className)}>
      <h3 className="text-lg font-medium text-foreground mb-4">Security Implementation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {securityFeatures.map((feature, index) => (
          <SecurityFeature key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default SecurityImplementation;
