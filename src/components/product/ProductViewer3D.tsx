import { useState } from 'react';
import { Box, Grid3X3, Hexagon, Maximize2, Move3D, RotateCw, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { IconButton } from '@components/ui';
import { cn } from '@/utils/cn';
import type { Product } from '@/types';

interface ProductViewer3DProps {
  product: Product;
  activeColorImg: string;
}

type ViewMode = 'standard' | 'fabric' | 'wireframe';

/**
 * 3D Viewer placeholder for the PDP — REQS §4.1.3.
 *
 * In production this hosts a <Canvas> from @react-three/fiber loading the .glb.
 * Here we showcase the **chrome around the viewer**: control panel, mode tabs,
 * lab telemetry, and the fallback 2D image with smooth mode transitions.
 *
 * The 3 modes:
 *  - Standard:    Default product view
 *  - Fabric:      Macro zoom — pixel-zoom + grain texture overlay
 *  - Wireframe:   Grid + amber glow lines indicating seam architecture
 */
export function ProductViewer3D({ product, activeColorImg }: ProductViewer3DProps) {
  const [mode, setMode] = useState<ViewMode>('standard');
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100 dark:bg-ink-800">
      {/* Lab tech grid overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 dark:opacity-20" />

      {/* Top-left mode indicator */}
      <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-ink-900/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-amber-400 backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
        // {mode}_mode
      </div>

      {/* Top-right zoom indicator */}
      <div className="absolute right-4 top-4 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-700 dark:text-ink-300">
        {Math.round(zoom * 100)}%
      </div>

      {/* The visual — image, transformed by rotation + zoom + mode filter */}
      <motion.div
        animate={{
          scale: zoom * (mode === 'fabric' ? 1.8 : 1),
          rotateY: rotation,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center [perspective:1000px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={activeColorImg}
          alt={product.name}
          className={cn(
            'h-full w-full object-cover transition-all duration-500',
            mode === 'wireframe' && 'opacity-30 grayscale',
            mode === 'fabric' && 'contrast-125 saturate-150',
          )}
        />
      </motion.div>

      {/* Wireframe overlay */}
      {mode === 'wireframe' && (
        <div className="pointer-events-none absolute inset-0">
          <svg viewBox="0 0 400 500" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#D4AF37" stopOpacity="0.9" />
                <stop offset="1" stopColor="#D4AF37" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#glow)" strokeWidth="0.5" opacity="0.7">
              {/* Garment outline (stylised) */}
              <path d="M120 80 L160 60 L240 60 L280 80 L320 140 L300 200 L300 440 L100 440 L100 200 L80 140 Z" />
              {/* Seams */}
              <path d="M200 60 L200 440" strokeDasharray="3 3" />
              <path d="M100 200 L300 200" strokeDasharray="3 3" />
              <path d="M120 80 L120 440" strokeDasharray="2 4" />
              <path d="M280 80 L280 440" strokeDasharray="2 4" />
              {/* Construction circles */}
              <circle cx="200" cy="120" r="6" />
              <circle cx="200" cy="220" r="6" />
              <circle cx="200" cy="320" r="6" />
            </g>
          </svg>
        </div>
      )}

      {/* Fabric mode grain texture */}
      {mode === 'fabric' && (
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0 2px, rgba(0,0,0,0.05) 2px 4px), repeating-linear-gradient(-45deg, transparent 0 2px, rgba(255,255,255,0.04) 2px 4px)',
          }}
        />
      )}

      {/* Bottom toolbar: Mode tabs + actions */}
      <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between gap-3 rounded-full bg-ink-900/80 px-2 py-1.5 backdrop-blur-md">
        <div className="flex items-center gap-1">
          {(
            [
              { key: 'standard', icon: Box, label: 'Standard' },
              { key: 'fabric', icon: Hexagon, label: 'Fabric' },
              { key: 'wireframe', icon: Grid3X3, label: 'Wireframe' },
            ] as { key: ViewMode; icon: typeof Box; label: string }[]
          ).map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => setMode(m.key)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors',
                mode === m.key
                  ? 'bg-amber-500 text-ink-900'
                  : 'text-white/70 hover:text-white',
              )}
              aria-label={m.label}
            >
              <m.icon className="h-3 w-3" />
              <span className="hidden sm:inline">{m.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <IconButton
            aria-label="Quay 90°"
            size="sm"
            onClick={() => setRotation((r) => r + 90)}
            className="text-white hover:bg-white/10"
          >
            <RotateCw className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton
            aria-label="Zoom in"
            size="sm"
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="text-white hover:bg-white/10"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton
            aria-label="Reset"
            size="sm"
            onClick={() => {
              setZoom(1);
              setRotation(0);
              setMode('standard');
            }}
            className="text-white hover:bg-white/10"
          >
            <Move3D className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton
            aria-label="Fullscreen"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>

      {/* Side data column (desktop) */}
      <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 space-y-3 font-mono text-[9px] uppercase tracking-widest text-ink-700 dark:text-ink-300 md:block">
        <div className="rounded bg-white/70 px-2 py-1 backdrop-blur dark:bg-ink-900/70">
          <div className="text-amber-500">// rot</div>
          {rotation % 360}°
        </div>
        <div className="rounded bg-white/70 px-2 py-1 backdrop-blur dark:bg-ink-900/70">
          <div className="text-amber-500">// zoom</div>
          {zoom.toFixed(2)}x
        </div>
      </div>
    </div>
  );
}
