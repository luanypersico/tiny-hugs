import React from 'react';
import { Heart, Star, Users, Clock, ArrowRight, CheckCircle, Zap, Target, Flame } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 sm:mb-12 border border-red-500/30">
          <Flame className="w-5 h-5 text-red-400" />
          <span className="text-red-400 font-semibold text-sm sm:text-base tracking-wider">
            MÉTODO REVOLUCIONÁRIO
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-[0.9] tracking-tight">
          <span className="text-white">ME AMO,</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-orange-400">
            MAS ME ODEIO™
          </span>
        </h1>

        {/* Subtitle */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-gray-200 leading-tight">
          <span className="block mb-2 sm:mb-4">14 dias pra se confrontar</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-medium">
            e parar de ser aquela{' '}
            <span className="text-pink-400 font-bold">"mulher legal que sempre acaba sozinha"</span>
          </span>
        </div>

        {/* Hero Image */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img 
              src="https://gabrielamendonca.com/wp-content/uploads/2025/06/CAPA-MEAMO-MEODEIO-scaled.jpg" 
              alt="ME AMO, MAS ME ODEIO - 14 dias pra se confrontar"
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl border border-pink-500/20 group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8 sm:mb-12 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img 
              src="https://gabrielamendonca.com/wp-content/uploads/2025/06/CAPA-MEAMO-MEODEIO-scaled.jpg" 
              alt="ME AMO, MAS ME ODEIO - 14 dias pra se confrontar"
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl border border-pink-500/20 group-hover:scale-105 transition-transform duration-500"
        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
          <button className="group relative bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 text-white font-bold py-4 sm:py-5 px-8 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 hover:scale-105 border border-pink-400/30 w-full sm:w-auto">
            <span className="flex items-center justify-center gap-3">
              QUERO ME CONFRONTAR AGORA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-900/40 to-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">+10.000</div>
            <div className="text-gray-400 text-sm sm:text-base">Mulheres transformadas</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-900/40 to-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-pink-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-gray-400 text-sm sm:text-base">Avaliação média</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-900/40 to-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-2">14 dias</div>
            <div className="text-gray-400 text-sm sm:text-base">Para sua transformação</div>
          </div>
        </div>
      </div>
    </section>
  )
  );
};

export default HeroSection;