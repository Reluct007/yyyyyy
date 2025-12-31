"use client"

import { Button } from "@/components/ui/button"
import { Navigation2 } from "lucide-react"
import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-4">
      {isVisible && (
        <Button variant="outline" size="icon" onClick={scrollToTop}>
          <Navigation2 className="h-5 w-5" />
          <span className="sr-only">Scroll to Top</span>
        </Button>
      )}
    </div>
  );
};
