import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface StickyCtaProps {
  /** Rótulo do botão — copy original preservada */
  label: string;
  onClick: () => void;
}

/**
 * Barra de ação fixa que aparece após o primeiro scroll significativo.
 * Mantém a decisão sempre a um toque de distância sem competir com o hero.
 */
const StickyCta: React.FC<StickyCtaProps> = ({ label, onClick }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-500 sm:px-6 sm:pb-5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <button
        onClick={onClick}
        className="group mx-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-full border border-[#d4726a]/30 bg-[#0b0509]/80 px-5 py-3.5 text-left shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-colors hover:border-[#d4726a]/60 sm:px-7 sm:py-4"
      >
        <span className="flex flex-col leading-tight">
          <span className="text-[0.6rem] uppercase tracking-[0.28em] text-[#9a908a] sm:text-[0.65rem]">
            14 dias
          </span>
          <span className="text-sm font-semibold text-white sm:text-base">{label}</span>
        </span>
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#8f2f3f] to-[#4a2350] sm:h-11 sm:w-11">
          <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
        </span>
      </button>
    </div>
  );
};

export default StickyCta;
