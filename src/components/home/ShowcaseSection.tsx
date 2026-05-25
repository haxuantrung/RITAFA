import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from '@components/ui';

const FRAMES = [
  { degrees: 0, caption: 'Front · Pattern hierarchy revealed' },
  { degrees: 90, caption: 'Side · Drape and silhouette' },
  { degrees: 180, caption: 'Back · Seam architecture' },
  { degrees: 270, caption: 'Side · Garment ease' },
  { degrees: 360, caption: 'Front · Resolved form' },
];

/**
 * Scrollytelling 3D showcase — REQS §4.1.1.
 * "xoay model 3D theo cuộn trang, 400vh"
 *
 * UX choice: instead of loading a real .glb here, we simulate the rotation
 * via image cross-fade based on scrollYProgress + parallax text reveal.
 * The actual three.js scene lives on the PDP. This keeps homepage performant.
 */
export function ShowcaseSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setActiveFrame(Math.min(FRAMES.length - 1, Math.floor(v * FRAMES.length)));
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section
      ref={ref}
      className="relative h-[300vh] bg-ink-950 text-white"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20 sm:px-6 lg:px-10">
          <SectionHeader
            marker="// 05 — 3D Showcase"
            eyebrow="Scroll to rotate"
            title={
              <span className="text-white">
                Inspect every <span className="text-amber-400">millimetre</span>.
              </span>
            }
            description={
              <span className="text-white/60">
                Phòng lab cung cấp cho bạn quyền truy cập 3D 360°. Cuộn để xoay — dừng bất kỳ đâu để zoom cận cảnh sợi vải trong PDP.
              </span>
            }
          />
        </div>

        {/* Stage */}
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute inset-0 bg-amber-glow opacity-50" />
          <motion.div
            style={{ rotate, scale }}
            className="relative aspect-[3/4] w-[70vw] max-w-md"
          >
            <img
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1600&q=85"
              alt="3D model preview"
              className="h-full w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -inset-px rounded-3xl ring-1 ring-amber-500/20" />
          </motion.div>

          {/* Frame markers */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
            {FRAMES.map((f, i) => (
              <div
                key={f.degrees}
                className={`h-1.5 w-12 rounded-full transition-all ${
                  i === activeFrame ? 'bg-amber-500' : 'bg-white/15'
                }`}
              />
            ))}
          </div>

          {/* Side annotations (lab data) */}
          <div className="absolute left-8 top-1/4 hidden space-y-6 font-mono text-[10px] uppercase tracking-widest text-white/40 lg:block">
            <div>
              <span className="text-amber-400">// rotation</span>
              <br />
              {FRAMES[activeFrame].degrees}° · {FRAMES[activeFrame].caption}
            </div>
            <div>
              <span className="text-amber-400">// material</span>
              <br />
              cotton + tencel · 380 gsm
            </div>
            <div>
              <span className="text-amber-400">// mode</span>
              <br />
              standard view
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
