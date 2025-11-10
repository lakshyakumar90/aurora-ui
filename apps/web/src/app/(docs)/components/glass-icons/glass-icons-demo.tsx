"use client"
import {
  FileText,
  Book,
  Heart,
  Cloud,
  Pencil,
  BarChart2,
} from "lucide-react";
import GlassIcons from "@/components/ui/glass-icons";
type DemoProps = { colorful?: boolean }

export default function GlassIconsDemo({ colorful = true }: DemoProps) {
  const neutral = 'linear-gradient(hsl(0,0%,60%), hsl(0,0%,40%))'
  const items = [
    { icon: <FileText />, color: colorful ? 'blue' : neutral, label: 'Files' },
    { icon: <Book />, color: colorful ? 'purple' : neutral, label: 'Books' },
    { icon: <Heart />, color: colorful ? 'red' : neutral, label: 'Health' },
    { icon: <Cloud />, color: colorful ? 'indigo' : neutral, label: 'Weather' },
    { icon: <Pencil />, color: colorful ? 'orange' : neutral, label: 'Notes' },
    { icon: <BarChart2 />, color: colorful ? 'green' : neutral, label: 'Stats' },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <GlassIcons items={items} className="custom-class"/>
    </div>
  );
}