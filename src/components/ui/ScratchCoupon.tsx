import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import honeyImg from '../../assets/honey1.svg';

interface ScratchCouponProps {
  onReveal?: (code: string) => void;
  storageKey?: string;
  className?: string;
}

const genCode = () => {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const part = (len: number) =>
    Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
  return `HONEY-${part(4)}-${part(4)}`;
};

/* ── Google-Pay-style scratch card ────────────────────────────── */
export const ScratchCoupon = ({
  onReveal,
  storageKey = 'honeygo_coupon_code',
  className = '',
}: ScratchCouponProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [code, setCode] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; delay: number; color: string; rotate: number; size: number }>
  >([]);
  const strokeCounterRef = useRef(0);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  /* ── code persistence ───────────────────────────────────────── */
  useEffect(() => {
    const existing = localStorage.getItem(storageKey);
    if (existing) setCode(existing);
    else {
      const c = genCode();
      localStorage.setItem(storageKey, c);
      setCode(c);
    }
  }, [storageKey]);

  /* ── draw the golden scratch overlay (GPay-style) ───────────── */
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;

    // golden metallic gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c9a84c');
    grad.addColorStop(0.3, '#f5d98a');
    grad.addColorStop(0.5, '#eed174');
    grad.addColorStop(0.7, '#dab84f');
    grad.addColorStop(1, '#b8963a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // subtle noise / cross-hatch for metal texture
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    for (let i = -height; i < width + height; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(i, height);
      ctx.lineTo(i + height, 0);
      ctx.stroke();
    }
    ctx.restore();

    // subtle circular refraction pattern
    ctx.save();
    ctx.globalAlpha = 0.06;
    for (let r = 80; r < Math.max(width, height); r += 60) {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // center label "SCRATCH HERE"
    ctx.save();
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#000';
    ctx.font = `bold ${Math.round(width / 16)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH HERE', width / 2, height / 2);
    ctx.restore();

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  /* ── scratching helpers ─────────────────────────────────────── */
  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const radius = 30;

    // draw line from last position for a smooth stroke
    const last = lastPosRef.current;
    if (last) {
      ctx.lineWidth = radius * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPosRef.current = { x, y };

    strokeCounterRef.current++;
    if (strokeCounterRef.current % 6 === 0) computePercent(false);
  };

  const pointerPos = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e as PointerEvent).clientX - rect.left) * (canvas.width / rect.width),
      y: ((e as PointerEvent).clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (revealed) return;
    isDrawingRef.current = true;
    lastPosRef.current = null;
    const pos = pointerPos(e);
    scratch(pos.x, pos.y);
    e.preventDefault();
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawingRef.current || revealed) return;
    const pos = pointerPos(e);
    scratch(pos.x, pos.y);
    e.preventDefault();
  };
  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPosRef.current = null;
    computePercent(true);
  };

  /* ── percent computation + reveal trigger ───────────────────── */
  const computePercent = (finalCheck: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 16) {
      // sample every 4th pixel for speed
      if (data[i] === 0) cleared++;
    }
    const total = (width * height) / 4;
    const pct = (cleared / total) * 100;
    setPercent(pct);
    if (pct > 50 && !revealed && (finalCheck || pct > 60)) {
      setRevealed(true);
      onReveal?.(code);
      // burst confetti
      const colors = ['#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#fff', '#fef3c7'];
      setConfetti(
        Array.from({ length: 40 }, (_, i) => ({
          id: i,
          x: 40 + Math.random() * 20,
          delay: Math.random() * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotate: Math.random() * 720 - 360,
          size: 4 + Math.random() * 8,
        })),
      );
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

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <div className={`relative w-full max-w-[340px] mx-auto ${className}`}>
      {/* ── outer card ── */}
      <div className="rounded-3xl bg-gradient-to-b from-[#1e1708] to-[#2a1e0c] shadow-[0_8px_40px_rgba(245,189,14,0.18)] border border-honey-500/20 overflow-hidden">
        {/* ── top band ── */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9.5 8.5 2 9.5l5 5-1 7 6-3.5 6 3.5-1-7 5-5-7.5-1z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-honey-300">HoneyGo Rewards</p>
            <p className="text-[10px] text-honey-100/40">Scratch to reveal your coupon</p>
          </div>
        </div>

        {/* ── scratch area ── */}
        <div className="px-4 pb-2">
          <div className="relative select-none rounded-2xl overflow-hidden border-2 border-honey-500/25 shadow-inner aspect-[5/3]">
            {/* reward content behind scratch */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fefce8] via-[#fff9db] to-[#fef3c7] flex flex-col items-center justify-center gap-1">
              {/* honey image */}
              <motion.img
                src={honeyImg}
                alt="Honey jar"
                className="w-20 h-20 drop-shadow-lg"
                initial={false}
                animate={revealed ? { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] } : {}}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700/70 mt-1">
                Flat 20% OFF
              </p>
              <AnimatePresence mode="wait" initial={false}>
                {revealed ? (
                  <motion.div
                    key="code"
                    initial={{ scale: 0.5, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="font-mono text-xl md:text-2xl font-extrabold text-amber-800 tracking-wider drop-shadow-sm"
                  >
                    {code}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xl font-bold text-amber-800/20 tracking-wider"
                  >
                    ••••-••••-••••
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* scratch canvas overlay */}
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full touch-none will-change-transform"
              style={{
                cursor: revealed ? 'default' : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='12' fill='rgba(255,215,0,0.3)' stroke='%23b8963a' stroke-width='2'/%3E%3C/svg%3E") 16 16, pointer`,
                pointerEvents: revealed ? 'none' : 'auto',
              }}
              width={600}
              height={360}
              initial={false}
              animate={
                revealed
                  ? { opacity: 0, scale: 1.05 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />

            {/* metallic shimmer on top of scratch layer */}
            {!revealed && (
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.35),transparent_55%)] mix-blend-overlay" />
                <div className="absolute -inset-full bg-[linear-gradient(105deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,0)_60%)] animate-[gpay_shimmer_3.5s_ease-in-out_infinite]" />
              </div>
            )}

            {/* confetti burst */}
            <AnimatePresence>
              {revealed &&
                confetti.map((p) => (
                  <motion.span
                    key={p.id}
                    initial={{ x: '0%', y: '0%', opacity: 1, scale: 0 }}
                    animate={{
                      x: `${(Math.random() - 0.5) * 220}%`,
                      y: `${(Math.random() - 0.5) * 220}%`,
                      opacity: 0,
                      rotate: p.rotate,
                      scale: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 + Math.random() * 0.6, delay: p.delay, ease: 'easeOut' }}
                    style={{
                      left: p.x + '%',
                      top: '50%',
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                    className="pointer-events-none absolute shadow-lg"
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ── bottom section ── */}
        <div className="px-5 pt-2 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!revealed && (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-honey-400 animate-pulse" />
                <span className="text-[10px] text-honey-200/50 tracking-wider">
                  {percent.toFixed(0)}% scratched
                </span>
              </div>
            )}
            {revealed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[11px] font-semibold text-honey-400 tracking-wider flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Revealed!
              </motion.span>
            )}
          </div>
          {revealed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyCode}
              className="text-xs bg-gradient-to-r from-honey-500 to-honey-400 hover:from-honey-400 hover:to-honey-300 text-black font-bold px-4 py-1.5 rounded-full shadow-lg shadow-honey-500/25 focus:outline-none focus:ring-2 focus:ring-honey-300 transition-all"
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </motion.button>
          )}
        </div>

        {/* ── fine print ── */}
        <div className="border-t border-honey-500/10 px-5 py-2.5">
          <p className="text-[9px] text-honey-100/30 text-center tracking-wider">
            One code per browser &middot; Valid on all orders &middot; Auto-saved
          </p>
        </div>
      </div>

      {/* shimmer keyframe */}
      <style>{`
        @keyframes gpay_shimmer {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
};
