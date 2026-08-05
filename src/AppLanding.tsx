import React, { useState } from 'react';
import { Heart, BookOpen, Download, CheckCircle, ArrowRight, Zap, AlertTriangle, Clock, Star, Sparkles, Crown, Diamond, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import ShaderBackground from '@/components/ShaderBackground';
import SocialProofSection from '@/components/SocialProofSection';
import heroCover from '@/assets/hero-cover.jpg';
import bonusEbook from '@/assets/bonus-ebook.jpg';
import finalCta from '@/assets/final-cta.jpg';


interface PricingCardProps {
  title: string;
  price: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  features: string[];
  buttonText: string;
  isSelected: boolean;
  onClick: () => void;
  badge?: string;
  footerText?: string;
  paymentMethods?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, subtitle, icon: Icon, features, buttonText, isSelected, onClick, badge, footerText, paymentMethods }) => {
  return (
    <div className="pricing-card">
      {/* Card content */}
      {footerText && (
        <div className="mt-6 text-center">
          <p className="text-[#9a908a] text-sm sm:text-base italic mb-2">{footerText}</p>
          {paymentMethods && (
            <p className="text-[#b98aa8] font-semibold text-sm sm:text-base">{paymentMethods}</p>
          )}
        </div>
      )}
    </div>
  );
};

function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<'digital' | 'print' | null>(null);

  const scrollToAction = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#040308] relative overflow-x-hidden">
      {/* Animated Shader Background */}
      <ShaderBackground />

      {/* Cinematic overlays */}
      <div aria-hidden className="vignette-overlay" />
      <div aria-hidden className="grain-overlay" />

      {/* Hero Image at Very Top */}
      <div className="relative z-10 pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(212,114,106,0.18),transparent_70%)] blur-2xl"></div>
            <img
              src={heroCover}
              alt="ME AMO, MAS ME ODEIO™"
              width={1280}
              height={1280}
              className="relative w-full h-auto rounded-2xl border border-white/10 edge-hairline"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#040308] via-transparent to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-gradient-to-b from-[#040308]/85 via-[#050308]/70 to-[#040308]/90">

      {/* Header */}
      <header className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d1c]/20 via-black/40 to-[#210d15]/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5b3a63]/20 to-[#a9414a]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 sm:mb-12 border border-white/10">
              <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#b98aa8]" />
              <span className="text-white font-semibold text-sm sm:text-base tracking-wider">ME AMO, MAS ME ODEIO™</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4726a]" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
              <span className="block mb-2 sm:mb-4">Plano de 14 dias pra se confrontar,</span>
              <span className="block mb-2 sm:mb-4">quebrar a porra da</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b98aa8] via-[#d4726a] to-[#b98aa8]">
                procrastinação emocional
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4">
                {' '}e sair do papel de "mulher legal que sempre acaba sozinha".
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
              <p className="text-xl sm:text-2xl md:text-3xl text-[#c8c0ba] mb-4 sm:mb-6 font-light leading-relaxed">
                Ou você encara seus monstros de frente...
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
                Ou continua chamando de "jeito difícil de amar" só porque tem medo de ser rejeitada por inteiro.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#1a0d1c]/40 via-black/60 to-[#210d15]/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <Diamond className="w-6 h-6 sm:w-8 sm:h-8 text-[#b98aa8]" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                  Oi, eu sou você.
                </h2>
                <Diamond className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4726a]" />
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed">
                <strong className="text-white">Ou melhor... Eu sou a parte que você esconde. A que pensa merda antes de dormir.</strong>
              </p>
            </div>

            <button 
              onClick={scrollToAction}
              className="group relative bg-gradient-to-r from-[#4a2350] via-[#8f2f3f] to-[#4a2350] hover:from-[#5b3a63] hover:via-[#a9414a] hover:to-[#5b3a63] text-white font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-full text-lg sm:text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-[#5b3a63]/50 border border-white/15"
            >
              <span className="relative z-10 flex items-center gap-3">
                Quero Começar Agora
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#b98aa8]/20 to-[#d4726a]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-black/90 to-[#1a0d1c]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
              <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#c9a227]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                TODO MUNDO TE ACHA FODA.
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] mb-12 sm:mb-16">
              MAS NINGUÉM TE VIU CHORANDO LAVANDO LOUÇA.
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 text-left">
              <div className="bg-gradient-to-br from-[#1a0d1c]/30 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl">
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                  <p>Todo mundo diz que você tem "uma energia boa".</p>
                  <p>Mas ninguém te vê quando você tenta se justificar por não conseguir levantar da cama.</p>
                  <p className="text-[#d4726a] font-semibold text-lg sm:text-xl">Você se ama, mas se odeia em silêncio. Se sabota com classe. Foge sempre quando começa a dar certo.</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#210d15]/30 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#d4726a]/25 shadow-2xl">
                <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                  <p>E no fundo, já cansou de viver repetindo os mesmos ciclos de abandono disfarçado de independência.</p>
                  <p className="text-[#b98aa8] font-semibold text-lg sm:text-xl">Essa porra aqui não é um planner. Não é um PDFZINHO com frase fofa.</p>
                  <p className="text-white font-bold text-xl sm:text-2xl">É UM PROCESSO DE RESSURREIÇÃO.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-[#1a0d1c]/30 via-black/80 to-[#210d15]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#c9a227]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  O QUE É O ME AMO, MAS ME ODEIO™
                </h2>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                <p>É um método de <span className="text-white font-bold text-xl sm:text-2xl">14 dias</span> criado pra te confrontar.</p>
                <p>Pra rasgar a mulher que você inventou pra sobreviver.</p>
                <p className="text-[#d4726a] font-semibold text-lg sm:text-xl">E reconstruir a mulher que você nunca teve coragem de ser.</p>
                <p>Com perguntas que doem. Com frases que você não vai querer ler em voz alta.</p>
                <p className="text-[#b98aa8] font-semibold text-lg sm:text-xl">Com tarefas que você tem evitado há anos.</p>
                <p className="text-white font-bold text-lg sm:text-xl">E não importa se você já fez terapia, se já leu livro de autoconhecimento, ou se acha que tá melhor.</p>
                <div className="bg-gradient-to-br from-[#1c0b0a]/40 to-black/60 backdrop-blur-xl border-l-4 border-l-[#c2534a] p-6 sm:p-8 rounded-r-2xl shadow-2xl">
                  <p className="text-white font-bold text-lg sm:text-xl leading-relaxed">
                    Se você acha que isso é 'mais um PDF de autoconhecimento', você vai se sentir envergonhada já na primeira tarefa.
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-black/60 via-[#1a0d1c]/40 to-[#210d15]/40 backdrop-blur-xl rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/10 shadow-2xl">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#d4726a] mb-6 sm:mb-8 mx-auto" />
                  <p className="text-[#c8c0ba] text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 italic">
                    "Por que eu não aguento quando começam a gostar de mim?"
                  </p>
                  <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                    Esse material é um tapa. E você PRECISA tomar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-b from-black/90 to-[#1a0d1c]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">AQUI COMEÇA O PROCESSO DE RASGAR A PERSONAGEM:</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-[#a9414a]/20 via-[#5b3a63]/20 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#d4726a]/25 shadow-2xl hover:scale-105 transition-all duration-500">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#7fae8e] mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Confronto Direto</h3>
              <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                <li>• "Por que eu performo confiança quando estou em pedaços?"</li>
                <li>• "Como eu me saboto com classe?"</li>
                <li>• "O que eu tento consertar nos outros?"</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#5b3a63]/20 via-[#a9414a]/20 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
              <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227] mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">14 Dias de Processo</h3>
              <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                <li>• Rasgar a mulher inventada</li>
                <li>• Reconstruir quem você é</li>
                <li>• Parar de mentir pra si mesma</li>
                <li>• Sair do personagem</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#c9a227]/20 via-[#a5642c]/20 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#c9a227]/20 shadow-2xl hover:scale-105 transition-all duration-500">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#d4726a] mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">Tarefas que Você Evita</h3>
              <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                <li>• Confrontar seus monstros</li>
                <li>• Parar de procrastinar emocionalmente</li>
                <li>• Quebrar ciclos de abandono</li>
                <li>• Assumir quem você realmente é</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#4a5a6b]/20 via-[#5b3a63]/20 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
              <Star className="w-10 h-10 sm:w-12 sm:h-12 text-[#8fa3b8] mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">O Primeiro Estalo</h3>
              <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                Depois dele, você não vai mais conseguir mentir pra si mesma sem sentir nojo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-black/90 via-[#1a0d1c]/30 to-[#210d15]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 leading-tight">
                O QUE VOCÊ VAI LEVAR
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4">
                  (E NUNCA MAIS LARGAR)
                </span>
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#1a0d1c]/40 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/10 shadow-2xl mb-12 sm:mb-16">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl">🧠</div>
                <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight">
                  Você não tá comprando um arquivo.
                </p>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed mb-8 sm:mb-10">
                Tá comprando o primeiro confronto real com a mulher que você virou pra sobreviver.
              </p>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8">O que você recebe:</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    <strong className="text-white">O método de 14 dias mais visceral, honesto e sujo de bonito</strong> que você vai ver ainda esse ano
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    <strong className="text-white">Um espaço pra desenterrar tudo</strong> que você esconde até de você mesma
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    <strong className="text-white">Perguntas que vão travar sua garganta,</strong> mas abrir sua clareza
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    <strong className="text-white">Exercícios que vão curar a mulher</strong> que você zoa pra ninguém perceber que dói
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    <strong className="text-white">Opção de versão digital ou impressa,</strong> porque até a forma de se curar é escolha sua
                  </p>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10">
                <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-2 sm:mb-4">
                  Isso aqui não é autoajuda.
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] font-bold">
                  É autoexposição guiada com propósito.
                </p>
              </div>
            </div>
            
            {/* Who Cannot Download */}
            <div className="bg-gradient-to-br from-[#1c0b0a]/40 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 border border-[#c2534a]/20 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl">⛔️</div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#c2534a]">
                  QUEM NÃO PODE BAIXAR
                </h3>
              </div>
              
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl">🚫</div>
                  <p className="text-lg sm:text-xl text-white font-semibold">
                    Esse material não é pra quem quer uma dose de dopamina e vai embora.
                  </p>
                </div>
                
                <p className="text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed mb-6 sm:mb-8">
                  Mas cuidado: Se você achar que isso aqui é "só mais um PDF", 
                  vai continuar procrastinando sua cura e depois vai culpar o universo por tudo.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                <div className="flex items-start gap-3">
                  <div className="text-[#c2534a] text-xl sm:text-2xl mt-1">❌</div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    Se você ainda prefere parecer bem do que ficar bem
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-[#c2534a] text-xl sm:text-2xl mt-1">❌</div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    Se você acha que mudança vem sem desconforto
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-[#c2534a] text-xl sm:text-2xl mt-1">❌</div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    Se você acha que uma mulher forte nunca chora
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-[#c2534a] text-xl sm:text-2xl mt-1">❌</div>
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    Se você quer resultado, mas não quer fazer esforço emocional nenhum
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#5f8f73]/20 to-[#3f6b55]/20 rounded-xl p-6 sm:p-8 border border-[#7fae8e]/20 mb-8 sm:mb-10">
                <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-4 sm:mb-6 leading-tight">
                  Agora, se você leu até aqui com o coração acelerado…<br />
                  Se deu aquele sorriso triste porque se reconheceu…<br />
                  E se sentiu vergonha de continuar fingindo…
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#7fae8e] to-[#7fae8e] font-bold">
                  Então VOCÊ É EXATAMENTE PRA QUEM ESSE MÉTODO FOI FEITO.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#c9a227]/20 to-[#a5642c]/20 rounded-xl p-6 sm:p-8 border border-[#c9a227]/20">
                <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight mb-4 sm:mb-6">
                  A maioria vai salvar esse link pra "começar depois".<br />
                  Você decide se quer ser a maioria…
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] font-bold">
                  ou a mulher que se salvou em silêncio e ressurgiu irreconhecível.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProofSection />
      {/* Pricing */}
      {/* Bonus Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-[#0d1a13]/20 via-black/90 to-[#0d1a13]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5f8f73]/20 to-[#3f6b55]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-8 sm:mb-12 border border-[#7fae8e]/20">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#7fae8e]" />
                <span className="text-[#7fae8e] font-semibold text-sm sm:text-base tracking-wider">
                  BÔNUS EXCLUSIVO
                </span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#7fae8e]" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                BÔNUS EXCLUSIVO
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#0d1a13]/40 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 border border-[#7fae8e]/20 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* Text Content */}
                <div className="order-2 lg:order-1">
                  <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed mb-6 sm:mb-8">
                    Além do ME AMO, MAS ME ODEIO™, você vai ganhar o e-book que irá 
                    <span className="text-[#7fae8e] font-semibold"> reconstruir sua autoestima</span>.
                  </p>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed mb-8 sm:mb-10">
                    Não fiz isso porque sou gentil, mas porque quero que você se transforme em uma 
                    <span className="text-white font-bold"> mulher bem sucedida e bem resolvida</span>.
                  </p>
                </div>
                
                {/* Image */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative max-w-sm mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7fae8e]/30 to-[#7fae8e]/30 rounded-2xl blur-xl"></div>
                    {/* GRÁTIS Tag */}
                    <div className="absolute -top-4 -right-4 z-10">
                      <div className="bg-gradient-to-r from-[#5f8f73] to-[#3f6b55] text-white font-bold px-4 py-2 rounded-full text-sm sm:text-base shadow-2xl border border-[#7fae8e]/25 transform rotate-12">
                        GRÁTIS
                      </div>
                    </div>
                    <img
                      src={bonusEbook}
                      alt="E-book bônus para reconstruir autoestima"
                      width={1024}
                      height={1024}
                      className="relative w-full h-auto rounded-2xl border border-[#7fae8e]/20 edge-hairline"
                      loading="lazy"
                    />

                  </div>
                </div>
              </div>
              
              {/* Bottom highlight */}
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#7fae8e]/20 text-center">
                <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-2 sm:mb-4">
                  Você não paga nada a mais por isso.
                </p>
                <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#7fae8e] to-[#7fae8e] font-semibold">
                  É meu investimento na sua transformação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-[#1a0d1c]/30 via-black/80 to-[#210d15]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5b3a63]/20 to-[#a9414a]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6 sm:mb-8 border border-white/10">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#b98aa8]" />
                <span className="text-white font-semibold text-sm sm:text-base tracking-wider">ESCOLHA SUA TRANSFORMAÇÃO</span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4726a]" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              DUAS FORMAS DE COMEÇAR:
              </h2>
              <p className="text-lg sm:text-xl text-[#c8c0ba] max-w-3xl mx-auto">
                Escolha como você quer enfrentar seus monstros. Ambas vão te confrontar, mas uma vai mais fundo.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Versão Básica */}
              <div className="group relative bg-gradient-to-br from-[#0a0a0c]/90 via-[#1a0d1c]/40 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/15 transition-all duration-700 shadow-2xl hover:shadow-[#5b3a63]/25 overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5b3a63]/10 via-transparent to-[#4a5a6b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative p-8 sm:p-10 lg:p-12">
                  {/* Header */}
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="relative mb-6 sm:mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4a5a6b]/20 to-[#5b3a63]/20 rounded-full blur-xl"></div>
                      <Download className="relative w-16 h-16 sm:w-20 sm:h-20 text-[#8fa3b8] mx-auto" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      VERSÃO "AINDA TEM MEDO"
                    </h3>
                    <p className="text-base sm:text-lg text-[#9a908a] mb-6 sm:mb-8">Para quem quer começar devagar</p>
                    
                    {/* Price */}
                    <div className="relative">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8fa3b8] to-[#b98aa8] mb-2">
                        R$ 37,00
                      </div>
                      <div className="text-sm sm:text-base text-[#7a716c]">pagamento único</div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                    {[
                      "Plano + comandos diários",
                      "Acesso vitalício\u00a0", 
                      "Reconstrução de autoestima em 5 dias"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-[#c8c0ba] text-base sm:text-lg leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => setSelectedVersion('digital')}
                    className={`w-full relative overflow-hidden rounded-2xl font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 transition-all duration-500 transform hover:scale-105 ${
                      selectedVersion === 'digital' 
                        ? 'bg-gradient-to-r from-[#4a5a6b] to-[#4a2350] text-white shadow-2xl shadow-[#4a5a6b]/50 scale-105' 
                        : 'bg-gradient-to-r from-[#39485a]/80 to-[#4a2350]/80 text-white hover:from-[#4a5a6b] hover:to-[#5b3a63] shadow-xl hover:shadow-[#4a5a6b]/30'
                    }`}
                  >
                    <span className="relative z-10">
                      {selectedVersion === 'digital' ? '✓ SELECIONADO!' : 'SIM, EU VOU TRANSFORMAR A DOR EM DISCIPLINA'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Footer */}
                  <div className="mt-6 sm:mt-8 text-center border-t border-white/10 pt-6 sm:pt-8">
                    <p className="text-[#9a908a] text-sm sm:text-base italic mb-3 sm:mb-4 leading-relaxed">
                      "É o preço de um lanche. Mas você vai inventar que não tem dinheiro."
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[#b98aa8] font-semibold text-sm sm:text-base">
                    </div>
                  </div>
                </div>
              </div>

              {/* Versão Premium */}
              <div className="group relative bg-gradient-to-br from-[#210d15]/90 via-[#1a0d1c]/60 to-black/90 backdrop-blur-xl rounded-3xl border-2 border-[#d4726a]/25 hover:border-[#d4726a]/30 transition-all duration-700 shadow-2xl hover:shadow-[#a9414a]/30 overflow-hidden">
                {/* Premium Badge */}
                <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20 px-4">
                  <div className="bg-gradient-to-r from-[#a9414a] via-[#4a2350] to-[#a9414a] text-white text-xs sm:text-sm font-bold py-1.5 sm:py-3 px-2 sm:px-6 rounded-full shadow-2xl border border-[#d4726a]/30 whitespace-nowrap">
                    MAIS COMPLETA
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#a9414a]/15 via-[#5b3a63]/10 to-[#a9414a]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="relative p-6 sm:p-10 lg:p-12 pt-8 sm:pt-14">
                  {/* Header */}
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="relative mb-6 sm:mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#a9414a]/30 to-[#5b3a63]/30 rounded-full blur-xl"></div>
                      <BookOpen className="relative w-16 h-16 sm:w-20 sm:h-20 text-[#d4726a] mx-auto" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      VERSÃO "VOU MUDAR DE VERDADE"
                    </h3>
                    <p className="text-base sm:text-lg text-[#9a908a] mb-6 sm:mb-8">Para quem não quer mais perder tempo</p>
                    
                    {/* Price */}
                    <div className="relative">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] via-[#b98aa8] to-[#d4726a] mb-2">
                        R$ 47,00
                      </div>
                      <div className="text-sm sm:text-base text-[#7a716c]">pagamento único</div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                    {[
                      "Tudo da versão básica",
                      "Acesso vitalício ao Plano de 14 dias",
                      "Reconstrução de autoestima em 5 dias",
                      "14 dias pra esmurrar sua insegurança emocional",
                      "Método pra parar de correr quando alguém gosta de você",
                      "Tarefas pra não aceitar mais migalha e chamar de afeto",
                      "Perguntas que desmontam seu medo de rejeição",
                      "Ordens surpresa",
                      "Reforço comportamental nos bastidores",
                      "Declaração Final da Nova Identidade"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-[#d4726a] to-[#5b3a63] rounded-full flex items-center justify-center mt-0.5">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <span className="text-[#c8c0ba] text-base sm:text-lg leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => setSelectedVersion('print')}
                    className={`w-full relative overflow-hidden rounded-2xl font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 transition-all duration-500 transform hover:scale-105 ${
                      selectedVersion === 'print' 
                        ? 'bg-gradient-to-r from-[#a9414a] to-[#4a2350] text-white shadow-2xl shadow-[#a9414a]/50 scale-105' 
                        : 'bg-gradient-to-r from-[#8f2f3f]/80 to-[#4a2350]/80 text-white hover:from-[#a9414a] hover:to-[#5b3a63] shadow-xl hover:shadow-[#a9414a]/30'
                    }`}
                  >
                    <span className="relative z-10">
                      {selectedVersion === 'print' ? '✓ SELECIONADO!' : 'QUERO ME TORNAR IRRECONHECÍVEL'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  
                  {/* Footer */}
                  <div className="mt-6 sm:mt-8 text-center border-t border-white/10 pt-6 sm:pt-8">
                    <p className="text-[#9a908a] text-sm sm:text-base italic mb-3 sm:mb-4 leading-relaxed">
                      "Para quem não quer mais fingir que está bem."
                    </p>
                    <div className="flex items-center justify-center gap-3 text-[#d4726a] font-semibold text-sm sm:text-base">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust indicators */}
            <div className="text-center mt-12 sm:mt-16">
              <div className="inline-flex items-center gap-4 sm:gap-6 lg:gap-8 bg-gradient-to-r from-black/60 to-[#1a0d1c]/40 backdrop-blur-xl rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border border-white/10 max-w-4xl mx-auto flex-wrap justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-3 h-3 bg-[#7fae8e] rounded-full"></div>
                  <span className="text-[#c8c0ba] text-sm sm:text-base font-medium">Pagamento Seguro</span>
                </div>
                <div className="w-px h-6 bg-[#3a3439] hidden sm:block"></div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#7fae8e]" />
                  <span className="text-[#c8c0ba] text-sm sm:text-base font-medium">Acesso Imediato</span>
                </div>
                <div className="w-px h-6 bg-[#3a3439] hidden sm:block"></div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-[#b98aa8]" />
                  <span className="text-[#c8c0ba] text-sm sm:text-base font-medium">Garantia Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-[#1a0d1c]/20 via-black/90 to-[#210d15]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#b98aa8]" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  PERGUNTAS QUE VOCÊ TÁ FAZENDO
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-[#c8c0ba]">
                (E que você já sabe as respostas, mas tá procurando desculpa)
              </p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  question: "Isso realmente funciona ou é mais um método qualquer?",
                  answer: "Olha, se você tá perguntando isso, já sabe que precisa. Não é um método 'qualquer' - é um processo de confronto real. Vai doer. Vai incomodar. E é exatamente por isso que funciona. Você não vai sair igual."
                },
                {
                  question: "Por que só 14 dias? Não é muito pouco tempo?",
                  answer: "14 dias é o suficiente pra você parar de mentir pra si mesma. Não precisa de 6 meses de enrolação. Ou você muda em 14 dias, ou você não quer mudar de verdade. Simples assim."
                },
                {
                  question: "E se eu não conseguir fazer as tarefas?",
                  answer: "Aí você vai ter a resposta que já sabia: você não quer mudar, você quer continuar no drama. As tarefas são simples, mas não são fáceis. A diferença é que uma mexe com preguiça, a outra mexe com medo."
                },
                {
                  question: "Qual a diferença entre as duas versões?",
                  answer: "A versão 'Ainda Tem Medo' é pra quem quer começar devagar. A versão 'Vou Mudar de Verdade' tem tudo da primeira MAIS ordens surpresa e reforço comportamental. É pra quem não quer mais perder tempo fingindo que tá bem."
                },
                {
                  question: "Posso fazer no meu tempo ou tem prazo?",
                  answer: "Você PODE fazer no seu tempo. Mas se você fizer 'no seu tempo', vai fazer igual tudo na sua vida: pela metade, quando der vontade, sem compromisso real. Os 14 dias existem pra te tirar da zona de conforto."
                },
                {
                  question: "E se eu não gostar? Tem garantia?",
                  answer: "Tem garantia total. Mas vou te falar uma coisa: se você 'não gostar', é porque funcionou. Ninguém gosta de ser confrontado com a própria mentira. Se você sair confortável, é porque não fez direito."
                },
                {
                  question: "Isso substitui terapia?",
                  answer: "Não substitui nada. Isso COMPLEMENTA tudo que você já tentou e não deu certo. É o empurrão que você precisa pra parar de enrolar na terapia, no autoconhecimento, na vida."
                },
                {
                  question: "Por que o preço é tão baixo?",
                  answer: "Porque não é sobre dinheiro. É sobre você parar de inventar desculpa. Se fosse R$ 500, você ia falar que tá caro. Se fosse de graça, você não ia valorizar. R$ 37 ou R$ 47 é o preço de você parar de se sabotar."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gradient-to-br from-black/60 to-[#1a0d1c]/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-[#5b3a63]/10 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-6 h-6 text-[#b98aa8] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-[#b98aa8] flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <div className="border-t border-white/10 pt-6">
                        <p className="text-base sm:text-lg text-[#c8c0ba] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 sm:mt-16">
              <div className="bg-gradient-to-br from-[#a9414a]/20 to-[#5b3a63]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-[#d4726a]/25">
                <p className="text-lg sm:text-xl text-white font-semibold mb-4">
                  Ainda tem dúvida?
                </p>
                <p className="text-base sm:text-lg text-[#c8c0ba] leading-relaxed">
                  A única dúvida real que você tem é se vai ter coragem de fazer. 
                  <span className="text-[#d4726a] font-semibold"> O resto é desculpa.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-black/90 via-[#1a0d1c]/40 to-[#210d15]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 leading-tight">
              Ou você toma vergonha... 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4"> ou você repete 2026 com maquiagem nova.</span>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] mb-8 sm:mb-12 leading-relaxed">
              Clique abaixo e comece o ME AMO, MAS ME ODEIO™ agora.
            </p>
            
            {/* Hero Image */}
            <div className="relative mb-8 sm:mb-12 lg:mb-16">
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                <img
                  src={finalCta}
                  alt="ME AMO, MAS ME ODEIO - 14 dias pra se confrontar"
                  width={1280}
                  height={960}
                  className="w-full h-auto rounded-2xl border border-white/10 edge-hairline"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040308] via-transparent to-transparent rounded-2xl"></div>

              </div>
            </div>
            
            <button className="group relative bg-gradient-to-r from-[#8f2f3f] via-[#4a2350] to-[#8f2f3f] hover:from-[#a9414a] hover:via-[#5b3a63] hover:to-[#a9414a] text-white font-bold py-6 sm:py-8 px-8 sm:px-16 rounded-full text-xl sm:text-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-[#a9414a]/50 mb-8 sm:mb-12 border border-[#d4726a]/30">
              <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                ME ENTREGA ESSE ESTALO AGORA
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4726a]/30 to-[#b98aa8]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            </button>
            
            <div className="mb-8 sm:mb-12">
              <p className="text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-tight">
                14 dias pra finalmente sair da porra do personagem.
              </p>
            </div>
            
            {selectedVersion && (
              <div className="bg-gradient-to-br from-[#5f8f73]/20 to-black/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#7fae8e]/20 shadow-2xl max-w-2xl mx-auto">
                <p className="text-[#7fae8e] font-bold text-lg sm:text-xl lg:text-2xl">
                  ✅ Versão {selectedVersion === 'digital' ? 'Digital' : 'Impressa'} selecionada - R$ {selectedVersion === 'digital' ? '37' : '47'}
                </p>
                <p className="text-[#c8c0ba] mt-2 sm:mt-4 text-base sm:text-lg">
                  Clique no botão acima para finalizar sua compra
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#b98aa8]" />
            <span className="text-white font-bold text-lg sm:text-xl tracking-wider">ME AMO, MAS ME ODEIO™</span>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4726a]" />
          </div>
          <p className="text-[#9a908a] text-sm sm:text-base">
            © 2025 - Todos os direitos reservados. Para quem está pronta pra parar de fingir.
          </p>
          
        </div>
      </footer>
      </div>
    </div>
  );
}

export default App;