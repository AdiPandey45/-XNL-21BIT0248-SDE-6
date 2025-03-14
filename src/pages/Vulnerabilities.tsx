
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Check, AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { VulnerabilityCard } from '@/components/dashboard/VulnerabilityCard';
import CustomButton from '@/components/ui/CustomButton';
import { vulnerabilities } from '@/lib/securityData';
import FadeTransition from '@/components/transitions/FadeTransition';
import Navbar from '@/components/layout/Navbar';

// Define security test types
type TestStatus = 'idle' | 'running' | 'success' | 'failed';
type SecurityTest = {
  id: string;
  name: string;
  description: string;
  status: TestStatus;
  result?: string;
  details?: string[];
};

const Vulnerabilities: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [securityTests, setSecurityTests] = useState<SecurityTest[]>([
    {
      id: 'sql-injection',
      name: 'SQL Injection Test',
      description: 'Tests for SQL injection vulnerabilities in input fields',
      status: 'idle'
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting (XSS) Test',
      description: 'Tests for XSS vulnerabilities in rendered output',
      status: 'idle'
    },
    {
      id: 'auth-bypass',
      name: 'Authentication Bypass Test',
      description: 'Tests for authentication weaknesses',
      status: 'idle'
    },
    {
      id: 'csrf',
      name: 'CSRF Protection Test',
      description: 'Verifies CSRF token validation',
      status: 'idle'
    },
    {
      id: 'security-headers',
      name: 'Security Headers Test',
      description: 'Checks implementation of security headers',
      status: 'idle'
    }
  ]);
  const [activeScanId, setActiveScanId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Simulate running a security test
  const runSecurityTest = async (testId: string) => {
    // Set the test to running state
    setSecurityTests(prev => 
      prev.map(test => 
        test.id === testId ? { ...test, status: 'running' } : test
      )
    );
    
    setActiveScanId(testId);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Determine test results (simulated)
    const testResults = simulateTestResults(testId);
    
    // Update test status
    setSecurityTests(prev => 
      prev.map(test => 
        test.id === testId ? { 
          ...test, 
          status: testResults.success ? 'success' : 'failed',
          result: testResults.message,
          details: testResults.details
        } : test
      )
    );
    
    // Show toast notification
    if (testResults.success) {
      toast.success(`${testResults.message}`);
    } else {
      toast.error(`${testResults.message}`);
    }
    
    setActiveScanId(null);
  };
  
  // Run all security tests
  const runAllTests = async () => {
    toast.info("Starting comprehensive security scan...");
    
    // Run tests sequentially
    for (const test of securityTests) {
      await runSecurityTest(test.id);
    }
    
    toast.success("Comprehensive security scan completed");
  };
  
  // Simulate test results
  const simulateTestResults = (testId: string): {
    success: boolean;
    message: string;
    details: string[];
  } => {
    // This would be real test logic in a production environment
    switch (testId) {
      case 'sql-injection':
        return {
          success: Math.random() > 0.3,
          message: Math.random() > 0.3 
            ? "No SQL injection vulnerabilities detected" 
            : "SQL injection vulnerability detected",
          details: Math.random() > 0.3 
            ? ["All input parameters are properly sanitized", "Parameterized queries in use"] 
            : ["Vulnerable endpoint detected: /api/users", "Input sanitization missing on userId parameter"]
        };
      case 'xss':
        return {
          success: Math.random() > 0.4,
          message: Math.random() > 0.4 
            ? "XSS protection measures verified" 
            : "XSS vulnerability detected in user profile",
          details: Math.random() > 0.4 
            ? ["Content Security Policy implemented", "Output encoding working correctly"] 
            : ["Insufficient output encoding on profile description", "CSP not blocking script execution"]
        };
      case 'auth-bypass':
        return {
          success: Math.random() > 0.2,
          message: Math.random() > 0.2 
            ? "Authentication mechanisms secure" 
            : "Potential authentication bypass detected",
          details: Math.random() > 0.2 
            ? ["JWT validation working correctly", "Rate limiting effective against brute force"] 
            : ["Token validation weakness detected", "Password reset flow vulnerable to enumeration"]
        };
      case 'csrf':
        return {
          success: Math.random() > 0.1,
          message: Math.random() > 0.1 
            ? "CSRF protection verified" 
            : "CSRF vulnerability detected",
          details: Math.random() > 0.1 
            ? ["CSRF tokens implemented on all forms", "SameSite cookie attributes set correctly"] 
            : ["Missing CSRF token on /api/profile/update", "Cookie missing SameSite attribute"]
        };
      case 'security-headers':
        return {
          success: Math.random() > 0.5,
          message: Math.random() > 0.5 
            ? "Security headers properly configured" 
            : "Missing critical security headers",
          details: Math.random() > 0.5 
            ? ["Content-Security-Policy implemented", "X-Content-Type-Options set to nosniff"] 
            : ["Missing X-Frame-Options header", "Content-Security-Policy not enforcing strict rules"]
        };
      default:
        return {
          success: true,
          message: "Test completed",
          details: ["No specific details available"]
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeTransition show={isVisible} className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Vulnerability Testing</h1>
                <p className="text-muted-foreground mt-2">
                  Run real-time security tests to identify vulnerabilities in your application
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <CustomButton 
                  variant="primary" 
                  onClick={runAllTests}
                  disabled={activeScanId !== null}
                >
                  {activeScanId !== null ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </CustomButton>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Security Tests</h2>
              
              <div className="space-y-4">
                {securityTests.map((test) => (
                  <div key={test.id} className="bg-gray-50 rounded-lg p-4 border border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium">{test.name}</h3>
                          <div className="ml-3">
                            {test.status === 'idle' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Ready
                              </span>
                            )}
                            {test.status === 'running' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Running
                              </span>
                            )}
                            {test.status === 'success' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Passed
                              </span>
                            )}
                            {test.status === 'failed' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Failed
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                      </div>
                      
                      <CustomButton 
                        variant="outline" 
                        size="sm"
                        className="mt-3 sm:mt-0"
                        onClick={() => runSecurityTest(test.id)}
                        disabled={test.status === 'running' || activeScanId !== null}
                      >
                        {test.status === 'running' ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                            Running...
                          </>
                        ) : (
                          'Run Test'
                        )}
                      </CustomButton>
                    </div>
                    
                    {test.status === 'success' && (
                      <div className="mt-3 pl-4 border-l-2 border-green-500">
                        <p className="text-sm text-green-700 font-medium">{test.result}</p>
                        {test.details && (
                          <ul className="mt-2 space-y-1">
                            {test.details.map((detail, index) => (
                              <li key={index} className="flex items-start text-xs text-muted-foreground">
                                <Check className="text-green-500 w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    
                    {test.status === 'failed' && (
                      <div className="mt-3 pl-4 border-l-2 border-red-500">
                        <p className="text-sm text-red-700 font-medium">{test.result}</p>
                        {test.details && (
                          <ul className="mt-2 space-y-1">
                            {test.details.map((detail, index) => (
                              <li key={index} className="flex items-start text-xs text-muted-foreground">
                                <AlertTriangle className="text-red-500 w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Known Vulnerabilities</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vulnerabilities.slice(0, 6).map((vulnerability, index) => (
                  <FadeTransition 
                    key={vulnerability.id}
                    show={isVisible} 
                    className="transform transition-all duration-500"
                    duration={300 + (index * 100)}
                  >
                    <VulnerabilityCard vulnerability={vulnerability} />
                  </FadeTransition>
                ))}
              </div>
            </div>
          </FadeTransition>
        </div>
      </main>
    </div>
  );
};

export default Vulnerabilities;
