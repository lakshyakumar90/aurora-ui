'use client';

import { Suspense, useEffect, useState } from 'react';
import { SandpackPlayground } from '@/components/playground';

function PlaygroundContent() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to check if screen is desktop size (typically 1024px and above)
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    checkIsDesktop();

    // Listen for resize events
    window.addEventListener('resize', checkIsDesktop);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Show loading state during initial check
  if (isDesktop === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    );
  }

  // Show message if not desktop
  if (!isDesktop) {
    return (
      <div className="h-screen w-full flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Desktop Required</h1>
          <p className="text-muted-foreground mb-4">
            The playground is optimized for desktop screens and requires a minimum width of 1024px.
          </p>
          <p className="text-sm text-muted-foreground">
            Please access this page from a desktop or laptop computer for the best experience.
          </p>
        </div>
      </div>
    );
  }

  // Show playground on desktop
  return <SandpackPlayground />;
}

export default function Playground() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    }>
      <PlaygroundContent />
    </Suspense>
  );
}