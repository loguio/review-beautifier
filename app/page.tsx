'use client';

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import {
  Download,
  Palette,
  Move,
  Circle,
  Sparkles,
  Star,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}
const backgrounds = [
  {
    id: 'gradient-1',
    name: 'Sunset',
    value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 'gradient-2',
    name: 'Ocean',
    value: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
  },
  {
    id: 'gradient-3',
    name: 'Fire',
    value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 'gradient-4',
    name: 'Forest',
    value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 'gradient-5',
    name: 'Aurora',
    value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  { id: 'solid-1', name: 'Charcoal', value: '#1a1a1a' },
  { id: 'solid-2', name: 'Navy', value: '#0f172a' },
  { id: 'solid-3', name: 'Slate', value: '#334155' },
];

const shadows = [
  { id: 'none', name: 'None', value: 'none' },
  { id: 'light', name: 'Light', value: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  {
    id: 'medium',
    name: 'Medium',
    value: '0 10px 15px -3px rgba(0,0,0,0.2)',
  },
  {
    id: 'strong',
    name: 'Strong',
    value: '0 25px 50px -12px rgba(0,0,0,0.4)',
  },
];

export default function Home() {
  const [reviewText, setReviewText] = useState('This service is amazing...');
  const [authorName, setAuthorName] = useState('Thomas D.');
  const [authorRole, setAuthorRole] = useState('CEO, TechStart');
  const [rating, setRating] = useState(5);
  const [background, setBackground] = useState(backgrounds[0].value);
  const [padding, setPadding] = useState([64]);
  const [radius, setRadius] = useState([12]);
  const [shadow, setShadow] = useState(shadows[2].value);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) return;

    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = 'review-beautified.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting image:', err);
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_review', {
        'event_category': 'engagement',
        'event_label': 'png_export',
        // Tu peux même tracker le nb d'étoiles pour le fun
        'review_stars': rating 
      });
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-green-500',
      'bg-red-500',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-1 bg-neutral-900 h-full overflow-hidden">
      <aside className="w-80 bg-neutral-950 border-r border-neutral-800 flex flex-col h-full">
        <div className="p-6 border-b border-neutral-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Review Beautifier
              </h1>
              <p className="text-xs text-neutral-400">
                Customer review image generator
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-neutral-300">
              Review
            </Label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter review text..."
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 min-h-[120px]"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-neutral-300">
              Author name
            </Label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Thomas D."
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-neutral-300">
              Role / Company
            </Label>
            <Input
              value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder="CEO, TechStart"
              className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-neutral-300">
              Rating (stars)
            </Label>
            <Select
              value={rating.toString()}
              onValueChange={(value) => setRating(parseInt(value))}
            >
              <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800">
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="text-white hover:bg-neutral-800"
                  >
                    {num} {num === 1 ? 'star' : 'stars'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
              <Palette className="w-4 h-4" />
              Background
            </div>
            <Select value={background} onValueChange={setBackground}>
              <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800">
                {backgrounds.map((bg) => (
                  <SelectItem
                    key={bg.id}
                    value={bg.value}
                    className="text-white hover:bg-neutral-800"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-neutral-700"
                        style={{ background: bg.value }}
                      />
                      {bg.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                <Move className="w-4 h-4" />
                Padding
              </div>
              <span className="text-xs text-neutral-400">{padding[0]}px</span>
            </div>
            <Slider
              value={padding}
              onValueChange={setPadding}
              min={0}
              max={128}
              step={4}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
                <Circle className="w-4 h-4" />
                Border radius
              </div>
              <span className="text-xs text-neutral-400">{radius[0]}px</span>
            </div>
            <Slider
              value={radius}
              onValueChange={setRadius}
              min={0}
              max={24}
              step={2}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
              <Sparkles className="w-4 h-4" />
              Shadow
            </div>
            <Select value={shadow} onValueChange={setShadow}>
              <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800">
                {shadows.map((s) => (
                  <SelectItem
                    key={s.id}
                    value={s.value}
                    className="text-white hover:bg-neutral-800"
                  >
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 border-t border-neutral-800 flex-shrink-0 bg-neutral-950 space-y-4">
          <Button
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as PNG
          </Button>
          
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Review Beautifier
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/loguio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Visit my GitHub profile"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/marius-bourse-52618a220/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-blue-400 transition-colors"
                aria-label="Visit my LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-neutral-800 flex items-center justify-center p-8 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <div
            ref={previewRef}
            style={{
              background: background,
              padding: `${padding[0]}px`,
            }}
            className="inline-block rounded-2xl"
          >
            <div
              className="bg-white rounded-xl p-8 max-w-2xl"
              style={{
                borderRadius: `${radius[0]}px`,
                boxShadow: shadow,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-neutral-200 text-neutral-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-2xl font-serif text-neutral-800 leading-relaxed mb-8">
                &ldquo;{reviewText}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full ${getAvatarColor(
                    authorName
                  )} flex items-center justify-center text-white font-semibold text-lg`}
                >
                  {getInitials(authorName)}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-lg">
                    {authorName}
                  </p>
                  <p className="text-neutral-600 text-sm">{authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
