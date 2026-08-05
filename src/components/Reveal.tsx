import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  /** Delay em ms aplicado após a entrada no viewport */
  delay?: number;
  /** Direção do deslocamento inicial */
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  /** Quanto do elemento precisa estar visível (0-1) */
  threshold?: number;
}

const OFFSETS: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate3d(0,42px,0)",
  down: "translate3d(0,-42px,0)",
  left: "translate3d(-42px,0,0)",
  right: "translate3d(42px,0,0)",
  none: "translate3d(0,0,0)",
};

/**
 * Revela o conteúdo quando ele entra no viewport.
 * Defensivo: se IntersectionObserver não existir (SSR ou browser antigo),
 * o conteúdo é exibido imediatamente — nunca fica invisível.
 */
const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  from = "up",
  className,
  threshold = 0.15,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn("reveal-base", visible && "reveal-in", className)}
      style={{
        transitionDelay: `${delay}ms`,
        ...(visible ? {} : { transform: OFFSETS[from] }),
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
