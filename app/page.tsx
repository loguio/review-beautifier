'use client';

import { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import {
  Upload,
  Download,
  Palette,
  Move,
  Circle,
  Sparkles,
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
  { id: 'none', name: 'Aucune', value: 'none' },
  { id: 'light', name: 'Légère', value: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  {
    id: 'medium',
    name: 'Moyenne',
    value: '0 10px 15px -3px rgba(0,0,0,0.2)',
  },
  {
    id: 'strong',
    name: 'Forte',
    value: '0 25px 50px -12px rgba(0,0,0,0.4)',
  },
];

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [background, setBackground] = useState(backgrounds[0].value);
  const [padding, setPadding] = useState([64]);
  const [radius, setRadius] = useState([12]);
  const [shadow, setShadow] = useState(shadows[2].value);
  const [isDragging, setIsDragging] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleExport = useCallback(async () => {
    if (canvasRef.current === null) return;

    try {
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = 'screenshot-beautified.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error exporting image:', err);
    }
  }, []);

  return (
    <div className="flex flex-1 bg-neutral-900">
      <aside className="w-80 bg-neutral-950 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">
                Screenshot Studio
              </h1>
              <p className="text-xs text-neutral-400">
                Embellissez vos captures
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                Arrondi
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
              Ombre
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

        <div className="p-6 border-t border-neutral-800">
          <Button
            onClick={handleExport}
            disabled={!image}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PNG
          </Button>
        </div>
      </aside>

      <main className="flex-1 bg-neutral-800 flex items-center justify-center p-8 overflow-hidden">
        {!image ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full max-w-2xl h-96 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 transition-colors ${
              isDragging
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-neutral-600 bg-neutral-900/50'
            }`}
          >
            <div className="p-4 bg-neutral-800 rounded-full">
              <Upload className="w-8 h-8 text-neutral-400" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-white mb-1">
                Glissez une image ici
              </p>
              <p className="text-sm text-neutral-400">
                ou cliquez pour sélectionner
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div
              ref={canvasRef}
              style={{
                background: background,
                padding: `${padding[0]}px`,
              }}
              className="inline-block rounded-2xl"
            >
              <img
                src={image}
                alt="Screenshot"
                style={{
                  borderRadius: `${radius[0]}px`,
                  boxShadow: shadow,
                }}
                className="max-w-full max-h-[calc(100vh-200px)] w-auto h-auto object-contain"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
