'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  layer: number; // visual "layer" depth 0-3
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

interface Signal {
  from: number;
  to: number;
  progress: number;
  speed: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const neuronsRef = useRef<Neuron[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const animationRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const timeRef = useRef(0);

  const initNeurons = useCallback((width: number, height: number) => {
    // Create neurons spread across the full page height (not just viewport)
    const fullHeight = Math.max(document.body.scrollHeight, height * 5);
    const count = Math.min(Math.floor((width * fullHeight) / 40000), 200);
    const neurons: Neuron[] = [];

    for (let i = 0; i < count; i++) {
      neurons.push({
        x: Math.random() * width,
        y: Math.random() * fullHeight,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2 + 1,
        layer: Math.floor(Math.random() * 4),
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.015,
        connections: [],
      });
    }

    // Pre-compute connections (each neuron connects to 2-4 nearest neighbors)
    for (let i = 0; i < neurons.length; i++) {
      const distances: { idx: number; dist: number }[] = [];
      for (let j = 0; j < neurons.length; j++) {
        if (i === j) continue;
        const dx = neurons[i].x - neurons[j].x;
        const dy = neurons[i].y - neurons[j].y;
        distances.push({ idx: j, dist: Math.sqrt(dx * dx + dy * dy) });
      }
      distances.sort((a, b) => a.dist - b.dist);
      const connCount = 2 + Math.floor(Math.random() * 3);
      neurons[i].connections = distances
        .slice(0, connCount)
        .filter((d) => d.dist < 300)
        .map((d) => d.idx);
    }

    neuronsRef.current = neurons;
    signalsRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initNeurons(window.innerWidth, window.innerHeight);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const primaryR = 255, primaryG = 0, primaryB = 51;
    const mouseRadius = 250;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scroll = scrollRef.current;
      timeRef.current += 1;

      ctx.clearRect(0, 0, w, h);

      const neurons = neuronsRef.current;
      const signals = signalsRef.current;
      const mouse = mouseRef.current;

      // Spawn new signals randomly
      if (timeRef.current % 8 === 0 && signals.length < 30) {
        const fromIdx = Math.floor(Math.random() * neurons.length);
        const neuron = neurons[fromIdx];
        if (neuron.connections.length > 0) {
          const toIdx = neuron.connections[Math.floor(Math.random() * neuron.connections.length)];
          signals.push({
            from: fromIdx,
            to: toIdx,
            progress: 0,
            speed: 0.008 + Math.random() * 0.012,
            opacity: 0.6 + Math.random() * 0.4,
          });
        }
      }

      // Draw connections (axons)
      for (let i = 0; i < neurons.length; i++) {
        const a = neurons[i];
        const ay = a.y - scroll;

        // Only draw if within extended viewport
        if (ay < -200 || ay > h + 200) continue;

        for (const jIdx of a.connections) {
          const b = neurons[jIdx];
          const by = b.y - scroll;
          if (by < -200 || by > h + 200) continue;

          // Distance-based opacity
          const dx = a.x - b.x;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 300) continue;

          const baseOpacity = (1 - dist / 300) * 0.08;

          // Mouse proximity boost
          const midX = (a.x + b.x) / 2;
          const midY = (ay + by) / 2;
          const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
          const mouseBoost = mouseDist < mouseRadius ? (1 - mouseDist / mouseRadius) * 0.25 : 0;

          ctx.beginPath();
          ctx.moveTo(a.x, ay);
          ctx.lineTo(b.x, by);
          ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${baseOpacity + mouseBoost})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw and update signals (electrical pulses traveling along connections)
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        const fromN = neurons[sig.from];
        const toN = neurons[sig.to];
        const fromY = fromN.y - scroll;
        const toY = toN.y - scroll;

        // Only draw if visible
        const sx = fromN.x + (toN.x - fromN.x) * sig.progress;
        const sy = fromY + (toY - fromY) * sig.progress;
        if (sy < -50 || sy > h + 50) continue;

        const glowRadius = 4;
        const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        gradient.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${sig.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw neurons (nodes)
      for (const n of neurons) {
        const ny = n.y - scroll;
        if (ny < -50 || ny > h + 50) continue;

        // Pulse animation
        n.pulsePhase += n.pulseSpeed;
        const pulse = Math.sin(n.pulsePhase) * 0.3 + 0.7;

        // Mouse proximity effect
        const dx = mouse.x - n.x;
        const dy = mouse.y - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < mouseRadius ? (1 - dist / mouseRadius) : 0;

        // Layer-based opacity (deeper layers are more subtle)
        const layerOpacity = [0.7, 0.5, 0.3, 0.2][n.layer];
        const finalOpacity = (layerOpacity * pulse + mouseInfluence * 0.5) * 0.6;
        const finalRadius = n.radius * (1 + mouseInfluence * 1.5);

        // Glow for neurons near mouse
        if (mouseInfluence > 0.3) {
          const glowSize = finalRadius * 6;
          const glow = ctx.createRadialGradient(n.x, ny, 0, n.x, ny, glowSize);
          glow.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${mouseInfluence * 0.15})`);
          glow.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);
          ctx.beginPath();
          ctx.arc(n.x, ny, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Core neuron dot
        ctx.beginPath();
        ctx.arc(n.x, ny, finalRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${finalOpacity})`;
        ctx.fill();

        // Subtle movement
        n.x += n.vx;
        n.y += n.vy;

        // Soft mouse repulsion
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          n.vx -= (dx / dist) * force * 0.01;
          n.vy -= (dy / dist) * force * 0.01;
        }

        // Damping
        n.vx *= 0.999;
        n.vy *= 0.999;

        // Wrap horizontally
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initNeurons]);

  return (
    <>
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      {/* Cosmic gradient overlay: bright red glow at top fading to deep space */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Top sun/light source glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full bg-primary/[0.07] blur-[150px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[500px] h-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
        {/* Subtle secondary glow */}
        <div className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full bg-red-900/[0.03] blur-[120px]" />
      </div>
    </>
  );
}
