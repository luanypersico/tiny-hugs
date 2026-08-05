import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SocialProofSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const socialProofs = [
    {
      id: 1,
      image: "https://gabrielamendonca.com/wp-content/uploads/2025/06/provasocial2.jpg",
      name: "Cliente 1"
    },
    {
      id: 2,
      image: "https://gabrielamendonca.com/wp-content/uploads/2025/06/provasocial3.jpg",
      name: "Cliente 2"
    },
    {
      id: 3,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.48-1.jpeg",
      name: "Cliente 3"
    },
    {
      id: 4,
      image: "https://gabrielamendonca.com/wp-content/uploads/2025/06/prova-social-insta-1.jpg",
      name: "Cliente 4"
    },
    {
      id: 5,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.49.jpeg",
      name: "Cliente 5"
    },
    {
      id: 6,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.48-2.jpeg",
      name: "Cliente 6"
    },
    {
      id: 7,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.48.jpeg",
      name: "Cliente 7"
    },
    {
      id: 8,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.47-1.jpeg",
      name: "Cliente 8"
    },
    {
      id: 9,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-20.01.47.jpeg",
      name: "Cliente 9"
    },
    {
      id: 10,
      image: "https://paolasemfiltro.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-23-at-15.32.39.jpeg",
      name: "Cliente 10"
    }
  ];

  const nextProof = () => {
    setCurrentIndex((prev) => (prev + 1) % socialProofs.length);
  };

  const prevProof = () => {
    setCurrentIndex((prev) => (prev - 1 + socialProofs.length) % socialProofs.length);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-[linear-gradient(180deg,#050308_0%,#0c0509_55%,#050308_100%)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5f8f73]/20 to-[#3f6b55]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 sm:mb-12 border border-[#7fae8e]/20">
              <div className="w-3 h-3 bg-[#7fae8e] rounded-full animate-pulse"></div>
              <span className="text-[#7fae8e] font-semibold text-sm sm:text-base tracking-wider">
                CONVERSAS REAIS NO INSTAGRAM
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              MULHERES QUE APLICARAM SEM DESCULPAS,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4">
                COM RAIVA, E OBTIVERAM RESULTADOS
              </span>
            </h2>
          </div>

          {/* iPhone Container */}
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[430px] mx-auto mb-8 sm:mb-12">
            {/* iPhone Frame */}
            <div className="relative bg-[#0a0a0a] rounded-[2.5rem] sm:rounded-[3rem] p-3 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] border border-white/5">
              {/* Screen */}
              <div 
                className="bg-black rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative w-full"
                style={{
                  height: 'min(700px, 80vh)',
                  maxHeight: '800px',
                  aspectRatio: '430/932'
                }}
              >
                {/* Content */}
                <div className="absolute inset-0">
                  <img 
                    src={socialProofs[currentIndex]!.image} 
                    alt={`Conversa com ${socialProofs[currentIndex]!.name}`}
                    className="w-full h-full object-contain object-center bg-black"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Erro ao carregar imagem:', socialProofs[currentIndex]!.image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-28 h-1 bg-white/60 rounded-full"></div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevProof}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 sm:-translate-x-12 bg-gradient-to-r from-[#4a2350] to-[#8f2f3f] hover:from-[#5b3a63] hover:to-[#a9414a] p-3 sm:p-4 rounded-full transition-all duration-300 shadow-xl z-10 border border-white/15"
              aria-label="Conversa anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            
            <button 
              onClick={nextProof}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 sm:translate-x-12 bg-gradient-to-r from-[#4a2350] to-[#8f2f3f] hover:from-[#5b3a63] hover:to-[#a9414a] p-3 sm:p-4 rounded-full transition-all duration-300 shadow-xl z-10 border border-white/15"
              aria-label="Próxima conversa"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mb-8 sm:mb-12 gap-2 flex-wrap">
            {socialProofs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#b98aa8] to-[#d4726a] scale-125 shadow-lg' 
                    : 'bg-[#3a3439] hover:bg-gray-500'
                }`}
                aria-label={`Ir para conversa ${index + 1}`}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-br from-[#1a0d1c]/40 to-black/60 backdrop-blur-xl border-l-4 border-l-[#d4726a] p-6 sm:p-8 max-w-4xl mx-auto rounded-2xl shadow-2xl">
              <p className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 leading-relaxed text-white font-semibold">
                Essas mulheres <span className="text-[#d4726a] font-bold">pararam de fugir</span> e começaram a agir.
              </p>
              <p className="text-base sm:text-lg text-[#c8c0ba] leading-relaxed">
                Elas saíram da zona de conforto e estão colhendo os resultados.
                <span className="text-[#b98aa8] font-semibold block mt-2">
                  Agora é a sua vez de parar de inventar desculpa.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;