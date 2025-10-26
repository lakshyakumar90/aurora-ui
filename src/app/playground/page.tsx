'use client';

import { Suspense } from 'react';
import { SandpackPlayground } from '@/components/playground';

function PlaygroundContent() {
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