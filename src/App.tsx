
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      {/* Add the Sonner Toaster component here */}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
