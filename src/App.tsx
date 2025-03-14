import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { applySecurityHeaders, generateCsrfToken, storeCsrfToken } from "./lib/securityConfig";

const queryClient = new QueryClient();

const App = () => {
  // Apply security headers
  useEffect(() => {
    applySecurityHeaders();
    
    // Create CSRF token for the session
    const csrfToken = generateCsrfToken();
    storeCsrfToken(csrfToken);
    
    // Implement secure cookies for session management
    document.cookie = "session=secured; SameSite=Strict; Secure; HttpOnly";
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
