
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Set content security policy meta tag programmatically
  useEffect(() => {
    // Add security headers
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://lovable.dev; font-src 'self'; frame-src 'self';";
    document.head.appendChild(cspMeta);
    
    // Add other security headers
    const xFrameOptionsMeta = document.createElement('meta');
    xFrameOptionsMeta.httpEquiv = 'X-Frame-Options';
    xFrameOptionsMeta.content = 'DENY';
    document.head.appendChild(xFrameOptionsMeta);
    
    const xContentTypeOptionsMeta = document.createElement('meta');
    xContentTypeOptionsMeta.httpEquiv = 'X-Content-Type-Options';
    xContentTypeOptionsMeta.content = 'nosniff';
    document.head.appendChild(xContentTypeOptionsMeta);
    
    const referrerPolicyMeta = document.createElement('meta');
    referrerPolicyMeta.name = 'referrer';
    referrerPolicyMeta.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrerPolicyMeta);
    
    // Set feature policy
    const featurePolicyMeta = document.createElement('meta');
    featurePolicyMeta.httpEquiv = 'Feature-Policy';
    featurePolicyMeta.content = "camera 'none'; microphone 'none'; geolocation 'none'";
    document.head.appendChild(featurePolicyMeta);
    
    // Set SameSite cookie attributes (this is just informational, actual cookie setting happens server-side)
    document.cookie = "SameSite=Strict; Secure";
    
    return () => {
      // Clean up meta tags on unmount
      document.head.removeChild(cspMeta);
      document.head.removeChild(xFrameOptionsMeta);
      document.head.removeChild(xContentTypeOptionsMeta);
      document.head.removeChild(referrerPolicyMeta);
      document.head.removeChild(featurePolicyMeta);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Index />} />
            <Route path="/signup" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
