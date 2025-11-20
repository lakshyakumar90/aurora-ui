"use client";
import { useEffect, useRef, useState } from "react";

interface ShowCaseCounterProps {
  count: number;
  suffix: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function ShowCaseCounter({
  count: targetCount,
  suffix,
  title,
  description,
  icon,
  color,
}: ShowCaseCounterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = counterRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [started]);

  useEffect(() => {
    if (started && count < targetCount) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev >= targetCount) {
            clearInterval(timer);
            return targetCount;
          }
          return prev + 1;
        });
      }, targetCount === 100 ? 20 : 40);
      return () => clearInterval(timer);
    }
  }, [started, count, targetCount]);

  return (
    <div className="relative group" ref={counterRef}>
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-purple-600/20 to-blue-600/20" />
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} mb-4`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

