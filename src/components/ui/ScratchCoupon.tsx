import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchCouponProps {
  onReveal?: (code: string) => void;
  storageKey?: string;
  className?: string;
}

const genCode = () => {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let part = (len: number) => Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  return `HONEY-${part(4)}-${part(4)}`;
};

export const ScratchCoupon = ({ onReveal, storageKey = 'honeygo_coupon_code', className = '' }: ScratchCouponProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [code, setCode] = useState<string>('');
  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number; color: string; rotate: number }>>([]);
  const strokeCounterRef = useRef(0);
  const isDrawingRef = useRef(false);

  // Initialize / load code
  useEffect(() => {
    const existing = localStorage.getItem(storageKey);
    if (existing) setCode(existing);
    else {
      const c = genCode();
      localStorage.setItem(storageKey, c);
      setCode(c);
    }
  }, [storageKey]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const { width, height } = canvas;
    // Fill base coat
    ctx.fillStyle = '#9ca3af'; // gray-400
    ctx.fillRect(0, 0, width, height);
    // Add diagonal hatch
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 12;
    for (let i = -height; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => { initCanvas(); }, [initCanvas]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const radius = 28;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    strokeCounterRef.current++;
    // Update percent every few strokes for responsiveness
    if (strokeCounterRef.current % 8 === 0) computePercent(false);
  };

  const pointerPos = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e as PointerEvent).clientX - rect.left) * (canvas.width / rect.width),
      y: ((e as PointerEvent).clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    isDrawingRef.current = true;
    scratch(...Object.values(pointerPos(e)) as [number, number]);
    e.preventDefault();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current || revealed) return;
    scratch(...Object.values(pointerPos(e)) as [number, number]);
    e.preventDefault();
  };
  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    computePercent(true);
  };

  const computePercent = (finalCheck: boolean) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4) { // alpha channel
      if (data[i] === 0) cleared++;
    }
    const total = width * height;
    const pct = (cleared / total) * 100;
    setPercent(pct);
    if (pct > 55 && !revealed && (finalCheck || pct > 65)) {
      setRevealed(true);
      onReveal?.(code);
      // Confetti pieces
      const colors = ['#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706'];
      setConfetti(Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360
      })));
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`relative w-full max-w-sm mx-auto ${className}`}>
      <div className="rounded-2xl border border-honey-500/30 bg-neutral-900/60 backdrop-blur p-5 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-honey-400/70 mb-2">Scratch & Reveal</p>
        <div className="relative select-none">
          <div className="h-36 flex items-center justify-center rounded-xl bg-gradient-to-br from-honey-600/10 via-honey-500/10 to-honey-400/5 text-center border border-honey-500/20 overflow-hidden">
            <div className="px-4">
              <p className="text-[11px] tracking-widest text-honey-300/70 mb-2">Your Coupon Code</p>
              <AnimatePresence mode="wait" initial={false}>
                {revealed ? (
                  <motion.div
                    key="code"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    className="font-mono text-2xl md:text-3xl font-semibold text-honey-300 drop-shadow"
                  >
                    {code}
                  </motion.div>
                ) : (
                  <motion.div
                    key="hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-honey-100/40 text-sm"
                  >
                    Scratch the silver area
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none will-change-transform"
              width={600}
              height={360}
              style={{ pointerEvents: revealed ? 'none' : 'auto' }}
              initial={false}
              animate={revealed ? { opacity: 0, scale: 1.08, rotate: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
            {!revealed && (
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)] mix-blend-overlay animate-pulse" />
                <div className="absolute -inset-1 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.35)_50%,rgba(255,255,255,0)_100%)] animate-[shine_2.8s_linear_infinite] opacity-40" />
              </div>
            )}
            <style>{`@keyframes shine{0%{transform:translateX(-100%);}100%{transform:translateX(100%);}}`}</style>
            <AnimatePresence>
              {revealed && confetti.map(piece => (
                <motion.span
                  key={piece.id}
                  initial={{ y: -20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 160, opacity: 1, rotate: piece.rotate + 180, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.8, delay: piece.delay, ease: 'easeOut' }}
                  style={{ left: piece.x + '%', top: '0%', backgroundColor: piece.color }}
                  className="pointer-events-none absolute w-2 h-3 rounded-sm shadow"
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-[10px] text-honey-200/50 tracking-wider">{revealed ? 'Revealed!' : `${percent.toFixed(0)}% scratched`}</div>
          {revealed && (
            <button
              onClick={copyCode}
              className="text-xs bg-honey-500/90 hover:bg-honey-400 text-black font-semibold px-3 py-1.5 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-honey-300"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
        <p className="mt-2 text-[10px] text-honey-100/40">One code per browser. Auto-saves.</p>
      </div>
    </div>
  );
};
