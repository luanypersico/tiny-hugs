import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-black via-red-900/20 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Image */}
          <div className="mb-8 sm:mb-12 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <img 
                src="https://fimdosciclos.com/wp-content/uploads/2025/09/Design-sem-nome-41.png" 
                alt="ME AMO, MAS ME ODEIO™"
                className="relative w-full max-w-xs sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl border border-pink-500/20 group-hover:scale-105 transition-transform duration-500 bg-transparent"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;