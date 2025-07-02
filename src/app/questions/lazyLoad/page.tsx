'use client'
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import useOnScreen from './useOnScreen';
// Dynamically import the heavy component
const HeavyComponent = dynamic(() => import('./HeavyComp'), {
  ssr: false,
});

export default function Home() {
  const [ref, isVisible] = useOnScreen<HTMLDivElement>({ threshold: 0.1 });
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isVisible, shouldLoad]);

  return (
    <div>
      <h1>Please do Ctrl+Shift+I to see the current dom</h1>
      <div style={{ height: '100vh' }}></div>

      <div ref={ref} style={{ height: '200px' }}>
        {shouldLoad ? (
          <Suspense fallback={<div>Loading heavy component...</div>}>
            <HeavyComponent />
          </Suspense>
        ) : (
          <p>👀 Scrolling into view...</p>
        )}
      </div>
    </div>
  );
}
