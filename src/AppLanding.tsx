import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Download, CheckCircle, ArrowRight, Zap, AlertTriangle, Star, Sparkles, Crown, Diamond, ChevronDown, ChevronUp, HelpCircle, Brain, Ban, ShieldAlert, X, Check, FileText } from 'lucide-react';
import { EBOOK_CONTENT } from '@/lib/ebook-content.server';
import ShaderBackground from '@/components/ShaderBackground';
import SocialProofSection from '@/components/SocialProofSection';
import Reveal from '@/components/Reveal';
import StickyCta from '@/components/StickyCta';

import heroCover from '@/assets/hero-cover.jpg';
import bonusEbook from '@/assets/bonus-ebook.jpg';
import finalCta from '@/assets/final-cta.jpg';

interface SectionKickerProps {
  label: string;
  index?: string;
}

/** Micro-cabeçalho editorial que ancora cada seção na narrativa. */
const SectionKicker: React.FC<SectionKickerProps> = ({ label, index }) => (
  <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
    <span className="hidden sm:block h-px w-10 bg-gradient-to-r from-transparent to-[#d4726a]/50" />
    {index && (
      <span className="kicker text-[#d4726a]/80">{index}</span>
    )}
    <span className="kicker">{label}</span>
    <span className="hidden sm:block h-px w-10 bg-gradient-to-l from-transparent to-[#d4726a]/50" />
  </div>
);

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

      <StickyCta label="Quero Começar Agora" onClick={scrollToAction} />

      {/* Hero Image at Very Top */}
      <div className="relative z-10 pt-6 sm:pt-10 lg:pt-14 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Reveal from="none">
            <div className="relative">
              <div aria-hidden className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(212,114,106,0.28),transparent_70%)] blur-3xl ember-breathe"></div>
              <img
                src={heroCover}
                alt="ME AMO, MAS ME ODEIO™"
                width={1280}
                height={1280}
                className="relative w-full h-auto rounded-2xl border border-white/10 edge-hairline"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#040308] via-[#040308]/10 to-transparent"></div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 bg-gradient-to-b from-[#040308]/85 via-[#050308]/70 to-[#040308]/90">

      {/* Header */}
      <header className="relative overflow-hidden min-h-screen flex items-center">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#1a0d1c]/25 via-black/50 to-[#210d15]/25"></div>
        <div aria-hidden className="absolute left-1/2 top-1/3 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(143,47,63,0.35),transparent_70%)] blur-[120px] ember-breathe"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative">
          <div className="text-center max-w-6xl mx-auto">
            <Reveal from="none">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5b3a63]/20 to-[#a9414a]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-10 sm:mb-14 border border-white/10">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#b98aa8]" />
                <span className="text-white font-semibold text-sm sm:text-base tracking-[0.22em]">ME AMO, MAS ME ODEIO™</span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4726a]" />
              </div>
            </Reveal>

              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-white mb-8 sm:mb-12 leading-[0.85] tracking-tighter">
                <Reveal delay={60}>
                  <span className="block mb-2 sm:mb-4">Plano de 14 dias para se confrontar,</span>
                </Reveal>
              <Reveal delay={160}>
                <span className="block mb-2 sm:mb-4">quebrar a porra da</span>
              </Reveal>
              <Reveal delay={260}>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#b98aa8] via-[#d4726a] to-[#b98aa8] ember-glow italic">
                  procrastinação emocional
                </span>
              </Reveal>
              <Reveal delay={360}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4">
                  {' '}e sair do papel de "mulher legal que sempre acaba sozinha".
                </span>
              </Reveal>
            </h1>

            <Reveal delay={120}>
              <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
                <p className="text-xl sm:text-2xl md:text-3xl text-[#c8c0ba] mb-4 sm:mb-6 font-light leading-relaxed">
                  Ou você encara seus monstros de frente...
                </p>
                <div aria-hidden className="ember-rule mx-auto max-w-md my-6 sm:my-8" />
                <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed">
                  Ou continua chamando de "jeito difícil de amar" só porque tem medo de ser rejeitada por inteiro.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="surface-noir rounded-3xl p-6 sm:p-8 lg:p-14 mb-10 sm:mb-14 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                  <Diamond className="w-6 h-6 sm:w-8 sm:h-8 text-[#b98aa8]" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Oi, eu sou você.
                  </h2>
                  <Diamond className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4726a]" />
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed">
                  <strong className="text-white drop-shadow-sm">Ou melhor... Eu sou a parte que você esconde. A que pensa merda antes de dormir.</strong>
                </p>
              </div>
            </Reveal>

            <Reveal delay={40}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={scrollToAction}
                  className="group relative bg-[#8f2f3f] hover:bg-[#a9414a] text-white font-bold py-6 sm:py-8 px-12 sm:px-20 rounded-full text-xl sm:text-2xl transition-all duration-700 transform hover:scale-[1.03] shadow-[0_20px_50px_-10px_rgba(143,47,63,0.6)] border border-white/20"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    QUERO ME CONFRONTAR AGORA
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div aria-hidden className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={async () => {
                    const { jsPDF } = await import('jspdf');
                    const { generateProfessionalPDF } = await import('./lib/pdf-generator.client');
                    const doc = generateProfessionalPDF(EBOOK_CONTENT);
                    doc.save("ME_AMO_MAS_ME_ODEIO_PLANO_104_PAGINAS.pdf");
                  }}
                  className="group relative bg-white/5 hover:bg-white/10 text-white font-medium py-6 px-12 rounded-full text-lg transition-all duration-500 border border-white/10 flex items-center gap-3"
                >
                  <FileText className="w-5 h-5 text-[#d4726a]" />
                  VER PDF PROFISSIONAL (DEMO)
                </button>
              </div>
            </Reveal>

            <div aria-hidden className="mt-12 sm:mt-16 flex justify-center">
              <ChevronDown className="w-6 h-6 text-[#d4726a] scroll-hint" />
            </div>
          </div>
        </div>
      </header>

      {/* Problem Section */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-b from-black/90 to-[#1a0d1c]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <Reveal><SectionKicker index="01" label="O espelho" /></Reveal>

            <Reveal delay={60}>
              <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
                <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#c9a227]" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.85] tracking-tighter">
                  TODO MUNDO TE ACHA FODA.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] mb-14 sm:mb-20 ember-glow tracking-tight italic">
                MAS NINGUÉM TE VIU CHORANDO LAVANDO LOUÇA.
              </h3>
            </Reveal>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 text-left">
              <Reveal from="left" delay={60}>
                <div className="surface-noir rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 h-full">
                  <div className="space-y-5 sm:space-y-7 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                    <p>Todo mundo diz que você tem "uma energia boa".</p>
                    <p>Mas ninguém te vê quando você tenta se justificar por não conseguir levantar da cama.</p>
                    <div aria-hidden className="ember-rule" />
                    <p className="text-[#d4726a] font-semibold text-lg sm:text-xl">Você se ama, mas se odeia em silêncio. Se sabota com classe. Foge sempre quando começa a dar certo.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal from="right" delay={160}>
                <div className="surface-noir rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 h-full border-[#d4726a]/25">
                  <div className="space-y-5 sm:space-y-7 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                    <p>E no fundo, já cansou de viver repetindo os mesmos ciclos de abandono disfarçado de independência.</p>
                    <p className="text-[#b98aa8] font-semibold text-lg sm:text-xl">Essa porra aqui não é um planner. Não é um PDFZINHO com frase fofa.</p>
                    <div aria-hidden className="ember-rule" />
                    <p className="text-white font-bold text-xl sm:text-2xl tracking-tight">É UM PROCESSO DE RESSURREIÇÃO.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-[#1a0d1c]/30 via-black/80 to-[#210d15]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 sm:mb-20">
              <Reveal><SectionKicker index="02" label="O método" /></Reveal>
              <Reveal delay={60}>
                <div className="flex items-center justify-center gap-4">
                  <Zap className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#c9a227]" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    O QUE É O ME AMO, MAS ME ODEIO™
                  </h2>
                </div>
              </Reveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
              <div className="space-y-6 sm:space-y-8 text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed">
                <Reveal delay={0}><p>É um método de <span className="text-white font-bold text-xl sm:text-2xl ember-glow">14 dias</span> criado para te confrontar.</p></Reveal>
                <Reveal delay={60}><p>Para rasgar a mulher que você inventou para sobreviver.</p></Reveal>
                <Reveal delay={120}><p className="text-[#d4726a] font-semibold text-lg sm:text-xl">E reconstruir a mulher que você nunca teve coragem de ser.</p></Reveal>
                <Reveal delay={180}><p>Com perguntas que doem. Com frases que você não vai querer ler em voz alta.</p></Reveal>
                <Reveal delay={240}><p className="text-[#b98aa8] font-semibold text-lg sm:text-xl">Com tarefas que você tem evitado há anos.</p></Reveal>
                <Reveal delay={300}><p className="text-white font-bold text-lg sm:text-xl">E não importa se você já fez terapia, se já leu livro de autoconhecimento, ou se acha que tá melhor.</p></Reveal>
                <Reveal delay={340}>
                  <div className="surface-noir border-l-2 border-l-[#c2534a] p-6 sm:p-8 rounded-r-2xl">
                    <p className="text-white font-bold text-lg sm:text-xl leading-relaxed">
                      Se você acha que isso é 'mais um PDF de autoconhecimento', você vai se sentir envergonhada já na primeira tarefa.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal from="right" delay={120}>
                <div className="relative">
                  <div aria-hidden className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(212,114,106,0.18),transparent_70%)] blur-3xl ember-breathe" />
                  <div className="relative surface-noir rounded-3xl p-8 sm:p-10 lg:p-14">
                    <div className="text-center">
                      <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-[#d4726a] mb-6 sm:mb-8 mx-auto" />
                      <p className="text-[#c8c0ba] text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 italic">
                        "Por que eu não aguento quando começam a gostar de mim?"
                      </p>
                      <div aria-hidden className="ember-rule mb-6 sm:mb-8" />
                      <p className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                        Esse material é um tapa. E você PRECISA tomar.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-b from-black/90 to-[#1a0d1c]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal><SectionKicker index="03" label="O confronto" /></Reveal>
          <Reveal delay={60}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-14 sm:mb-20">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] block max-w-5xl mx-auto">AQUI COMEÇA O PROCESSO DE RASGAR A PERSONAGEM:</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#7fae8e]" />,
                numeral: 'I',
                title: 'Confronto Direto',
                body: (
                  <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                    <li>• "Por que eu performo confiança quando estou em pedaços?"</li>
                    <li>• "Como eu me saboto com classe?"</li>
                    <li>• "O que eu tento consertar nos outros?"</li>
                  </ul>
                ),
              },
              {
                icon: <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-[#c9a227]" />,
                numeral: 'II',
                title: 'Plano de 14 Dias',
                body: (
                  <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                    <li>• Rasgar a mulher inventada</li>
                    <li>• Reconstruir quem você é</li>
                    <li>• Parar de mentir pra si mesma</li>
                    <li>• Sair do personagem</li>
                  </ul>
                ),
              },
              {
                icon: <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#d4726a]" />,
                numeral: 'III',
                title: 'Tarefas que Você Evita',
                body: (
                  <ul className="text-[#c8c0ba] space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl">
                    <li>• Confrontar seus monstros</li>
                    <li>• Parar de procrastinar emocionalmente</li>
                    <li>• Quebrar ciclos de abandono</li>
                    <li>• Assumir quem você realmente é</li>
                  </ul>
                ),
              },
              {
                icon: <Star className="w-10 h-10 sm:w-12 sm:h-12 text-[#8fa3b8]" />,
                numeral: 'IV',
                title: 'O Primeiro Estalo',
                body: (
                  <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                    Depois dele, você não vai mais conseguir mentir pra si mesma sem sentir nojo.
                  </p>
                ),
              },
            ].map((card, index) => (
              <Reveal key={card.title} delay={index * 110}>
                <div className="group relative surface-noir rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full overflow-hidden transition-all duration-700 hover:-translate-y-2">
                  <span aria-hidden className="index-numeral pointer-events-none absolute -right-2 -top-4 text-7xl sm:text-8xl select-none opacity-70">
                    {card.numeral}
                  </span>
                  <div aria-hidden className="absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(ellipse_at_center,rgba(212,114,106,0.22),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                  <div className="relative">
                    <div className="mb-4 sm:mb-6">{card.icon}</div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">{card.title}</h3>
                    {card.body}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-black/90 via-[#1a0d1c]/30 to-[#210d15]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 sm:mb-20">
              <Reveal><SectionKicker index="04" label="O que fica com você" /></Reveal>
              <Reveal delay={60}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 leading-tight">
                  O QUE VOCÊ VAI LEVAR
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4 ember-glow italic">
                    (E NUNCA MAIS LARGAR)
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal>
              <div className="surface-noir rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-14 mb-14 sm:mb-20">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#b98aa8]/25 bg-[#b98aa8]/10">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#b98aa8]" strokeWidth={1.5} />
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight">
                    Você não tá comprando um arquivo.
                  </p>
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed mb-10">
                  Tá comprando o primeiro confronto real com a mulher que você virou pra sobreviver.
                </p>

                <div aria-hidden className="ember-rule mb-10" />

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8">O que você recebe no eBook (100+ páginas de impacto):</h3>

                <div className="space-y-5 sm:space-y-7">
                  {[
                    { strong: 'Conteúdo Masterclass em Texto:', rest: ' Mais de 100 páginas escritas com profundidade visceral e técnica literária profissional.' },
                    { strong: 'Sumário Estruturado:', rest: ' Uma jornada lógica do confronto à ressurreição, dividida em 3 fases críticas.' },
                    { strong: 'Proteção Anti-Pirataria Digital:', rest: ' Sistema de marca d\'água dinâmico vinculado ao seu CPF/E-mail para garantir exclusividade.' },
                    { strong: 'O método de 14 dias mais visceral, honesto e sujo de bonito', rest: ' que você vai ver ainda esse ano' },
                    { strong: 'Um espaço para desenterrar tudo', rest: ' que você esconde até de você mesma' },
                  ].map((item, index) => (
                    <Reveal key={item.strong} delay={index * 90} from="left">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#7fae8e] to-[#3f6b55] rounded-full flex items-center justify-center mt-1">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                          <strong className="text-white">{item.strong}</strong>{item.rest}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10">
                  <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-2 sm:mb-4">
                    Isso aqui não é autoajuda.
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] font-bold ember-glow">
                    É autoexposição guiada com propósito.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Who Cannot Download */}
            <Reveal>
              <div className="surface-noir rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-14 border-[#c2534a]/25">
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className="flex-shrink-0 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#c2534a]/30 bg-[#c2534a]/10">
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2534a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#c2534a]">
                    QUEM NÃO PODE TER ACESSO
                  </h3>
                </div>

                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#c2534a]" strokeWidth={1.5} />
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
                  {[
                    'Se você ainda prefere parecer bem do que ficar bem',
                    'Se você acha que mudança vem sem desconforto',
                    'Se você acha que uma mulher forte nunca chora',
                    'Se você quer resultado, mas não quer fazer esforço emocional nenhum',
                  ].map((line, index) => (
                    <Reveal key={line} delay={index * 80} from="left">
                      <div className="flex items-start gap-3 border-l border-[#c2534a]/25 pl-4">
                        <X className="w-5 h-5 sm:w-[22px] sm:h-[22px] flex-shrink-0 text-[#c2534a] mt-1" strokeWidth={1.5} />
                        <p className="text-[#c8c0ba] text-base sm:text-lg lg:text-xl leading-relaxed">
                          {line}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <Reveal>
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
                </Reveal>

                <Reveal delay={80}>
                  <div className="bg-gradient-to-r from-[#c9a227]/20 to-[#a5642c]/20 rounded-xl p-6 sm:p-8 border border-[#c9a227]/20">
                    <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold leading-tight mb-4 sm:mb-6">
                      A maioria vai salvar esse link pra "começar depois".<br />
                      Você decide se quer ser a maioria…
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] font-bold ember-glow">
                      ou a mulher que se salvou em silêncio e ressurgiu irreconhecível.
                    </p>
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProofSection />
      {/* Pricing */}
      {/* Bonus Section */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-[#0d1a13]/20 via-black/90 to-[#0d1a13]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14 sm:mb-20">
              <Reveal delay={60}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                  BÔNUS EXCLUSIVO
                </h2>
              </Reveal>
            </div>

            <Reveal>
              <div className="surface-noir rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-14 border-[#7fae8e]/20">
                <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                  {/* Text Content */}
                  <div className="order-2 lg:order-1">
                    <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] leading-relaxed mb-6 sm:mb-8">
                      Além do ME AMO, MAS ME ODEIO™, você vai ganhar o eBook Bônus exclusivo, totalmente revisado e estruturado, que irá
                      <span className="text-[#7fae8e] font-semibold"> reconstruir sua autoestima de forma definitiva</span>.
                    </p>

                    <div aria-hidden className="ember-rule mb-6 sm:mb-8" />

                    <p className="text-base sm:text-lg lg:text-xl text-[#c8c0ba] leading-relaxed mb-8 sm:mb-10">
                      Não fiz isso porque sou gentil, mas porque quero que você se transforme em uma
                      <span className="text-white font-bold"> mulher bem sucedida e bem resolvida</span>.
                    </p>
                  </div>

                  {/* Image */}
                  <div className="order-1 lg:order-2 flex justify-center">
                    <div className="relative max-w-sm mx-auto">
                      <div aria-hidden className="absolute -inset-6 bg-[radial-gradient(ellipse_at_center,rgba(127,174,142,0.28),transparent_70%)] rounded-2xl blur-2xl ember-breathe"></div>
                      {/* GRÁTIS Tag */}
                      <div className="absolute -top-4 -right-4 z-10">
                        <div className="bg-gradient-to-r from-[#5f8f73] to-[#3f6b55] text-white font-bold px-4 py-2 rounded-full text-sm sm:text-base shadow-2xl border border-[#7fae8e]/25 transform rotate-12">
                          OFERTA
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
                <div className="mt-10 sm:mt-14 pt-8 border-t border-[#7fae8e]/20 text-center">
                  <p className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-2 sm:mb-4">
                    Você não paga nada a mais por isso.
                  </p>
                  <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#7fae8e] to-[#7fae8e] font-semibold">
                    É meu investimento na sua transformação.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-[#1a0d1c]/30 via-black/80 to-[#210d15]/30">
        <div aria-hidden className="absolute left-1/2 top-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(169,65,74,0.18),transparent_65%)] blur-3xl ember-breathe" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 sm:mb-20">
              <Reveal>
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5b3a63]/20 to-[#a9414a]/20 backdrop-blur-xl rounded-full px-6 sm:px-8 py-3 sm:py-4 mb-6 sm:mb-8 border border-white/10">
                  <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-[#b98aa8]" />
                  <span className="text-white font-semibold text-sm sm:text-base tracking-[0.22em]">ESCOLHA SUA TRANSFORMAÇÃO</span>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4726a]" />
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                DUAS FORMAS DE COMEÇAR:
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-lg sm:text-xl text-[#c8c0ba] max-w-3xl mx-auto">
                  Escolha como você quer enfrentar seus monstros. Ambas vão te confrontar, mas uma vai mais fundo.
                </p>
              </Reveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto items-start">
              {/* Versão Básica */}
              <Reveal from="left">
                <div className="group relative surface-noir rounded-3xl transition-all duration-700 hover:-translate-y-1 overflow-hidden">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#5b3a63]/10 via-transparent to-[#4a5a6b]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative p-8 sm:p-10 lg:p-12">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="relative mb-6 sm:mb-8">
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#4a5a6b]/20 to-[#5b3a63]/20 rounded-full blur-xl"></div>
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
                        <div className="text-sm sm:text-base text-[#7a716c] tracking-[0.18em] uppercase">pagamento único</div>
                      </div>
                    </div>

                    <div aria-hidden className="ember-rule mb-8" />

                    {/* Features */}
                    <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                      {[
                        "Plano + comandos diários (100+ págs)",
                        "Acesso vitalício com proteção digital",
                        "Guia de reconstrução de autoestima"
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
                      className={`w-full relative overflow-hidden rounded-2xl font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 transition-all duration-500 transform hover:scale-[1.02] ${
                        selectedVersion === 'digital'
                          ? 'bg-gradient-to-r from-[#4a5a6b] to-[#4a2350] text-white shadow-2xl shadow-[#4a5a6b]/50 scale-[1.02]'
                          : 'bg-gradient-to-r from-[#39485a]/80 to-[#4a2350]/80 text-white hover:from-[#4a5a6b] hover:to-[#5b3a63] shadow-xl hover:shadow-[#4a5a6b]/30'
                      }`}
                    >
                      <span className="relative z-10 inline-flex items-center justify-center gap-2">
                        {selectedVersion === 'digital' && <Check className="w-5 h-5" strokeWidth={2} />}
                        {selectedVersion === 'digital' ? 'SELECIONADO!' : 'SIM, EU VOU TRANSFORMAR A DOR EM DISCIPLINA'}
                      </span>
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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
              </Reveal>

              {/* Versão Premium */}
              <Reveal from="right" delay={120}>
                <div className="group relative surface-noir rounded-3xl border-2 border-[#d4726a]/30 hover:border-[#d4726a]/50 transition-all duration-700 hover:-translate-y-1 overflow-hidden mt-6 lg:mt-0">
                  {/* Premium Badge */}
                  <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20 px-4">
                    <div className="bg-gradient-to-r from-[#a9414a] via-[#4a2350] to-[#a9414a] text-white text-xs sm:text-sm font-bold py-1.5 sm:py-3 px-2 sm:px-6 rounded-full shadow-2xl border border-[#d4726a]/30 whitespace-nowrap tracking-[0.18em]">
                      MAIS COMPLETA
                    </div>
                  </div>

                  <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#a9414a]/15 via-[#5b3a63]/10 to-[#a9414a]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative p-6 sm:p-10 lg:p-12 pt-10 sm:pt-14">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-10">
                      <div className="relative mb-6 sm:mb-8">
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#a9414a]/30 to-[#5b3a63]/30 rounded-full blur-xl ember-breathe"></div>
                        <BookOpen className="relative w-16 h-16 sm:w-20 sm:h-20 text-[#d4726a] mx-auto" />
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                        VERSÃO "VOU MUDAR DE VERDADE"
                      </h3>
                      <p className="text-base sm:text-lg text-[#9a908a] mb-6 sm:mb-8">Para quem não quer mais perder tempo</p>

                      {/* Price */}
                      <div className="relative">
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] via-[#b98aa8] to-[#d4726a] mb-2 ember-glow">
                          R$ 47,00
                        </div>
                        <div className="text-sm sm:text-base text-[#7a716c] tracking-[0.18em] uppercase">pagamento único</div>
                      </div>
                    </div>

                    <div aria-hidden className="ember-rule mb-8" />

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
                      className={`w-full relative overflow-hidden rounded-2xl font-bold text-base sm:text-lg py-4 sm:py-5 px-6 sm:px-8 transition-all duration-500 transform hover:scale-[1.02] ${
                        selectedVersion === 'print'
                          ? 'bg-gradient-to-r from-[#a9414a] to-[#4a2350] text-white shadow-2xl shadow-[#a9414a]/50 scale-[1.02]'
                          : 'bg-gradient-to-r from-[#8f2f3f]/80 to-[#4a2350]/80 text-white hover:from-[#a9414a] hover:to-[#5b3a63] shadow-xl hover:shadow-[#a9414a]/30'
                      }`}
                    >
                      <span className="relative z-10 inline-flex items-center justify-center gap-2">
                        {selectedVersion === 'print' && <Check className="w-5 h-5" strokeWidth={2} />}
                        {selectedVersion === 'print' ? 'SELECIONADO!' : 'QUERO ME TORNAR IRRECONHECÍVEL'}
                      </span>
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
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
              </Reveal>
            </div>

            {/* Trust indicators */}
            <Reveal delay={80}>
              <div className="text-center mt-14 sm:mt-20">
                <div className="inline-flex items-center gap-4 sm:gap-6 lg:gap-8 surface-noir rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-4xl mx-auto flex-wrap justify-center">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-[#1a0d1c]/20 via-black/90 to-[#210d15]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 sm:mb-20">
              <Reveal><SectionKicker index="05" label="As desculpas" /></Reveal>
              <Reveal delay={60}>
                <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                  <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#b98aa8]" />
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    PERGUNTAS QUE VOCÊ TÁ FAZENDO
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-lg sm:text-xl text-[#c8c0ba] italic">
                  (E que você já sabe as respostas, mas tá procurando desculpa)
                </p>
              </Reveal>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {[
                {
                  question: "Isso realmente funciona ou é mais um método qualquer?",
                  answer: "Olha, se você tá perguntando isso, já sabe que precisa. Não é um método 'qualquer' - é um processo de confronto real. Vai doer. Vai incomodar. E é exatamente por isso que funciona. Você não vai sair igual."
                },
                {
                  question: "Por que só 14 dias? Não é muito pouco tempo?",
                  answer: "14 dias é o suficiente para você parar de mentir para si mesma. Não precisa de 6 meses de enrolação. Ou você muda em 14 dias, ou você não quer mudar de verdade. Simples assim."
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
                  answer: "Não substitui nada. Isso COMPLEMENTA tudo que você já tentou e não deu certo. É o empurrão que você precisa para parar de enrolar na terapia, no autoconhecimento, na vida."
                },
                {
                  question: "Por que o preço é tão baixo?",
                  answer: "Porque não é sobre dinheiro. É sobre você parar de inventar desculpa. Se fosse R$ 500, você ia falar que tá caro. Se fosse de graça, você não ia valorizar. R$ 37 ou R$ 47 é o preço de você parar de se sabotar."
                }
              ].map((faq, index) => (
                <Reveal key={faq.question} delay={index * 60}>
                  <div className="surface-noir rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 hover:bg-[#5b3a63]/10 transition-all duration-300"
                    >
                      <span className="flex items-baseline gap-4">
                        <span aria-hidden className="kicker text-[#d4726a]/70">{String(index + 1).padStart(2, '0')}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-white pr-2 leading-tight">
                          {faq.question}
                        </h3>
                      </span>
                      {openFaq === index ? (
                        <ChevronUp className="w-6 h-6 text-[#b98aa8] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-[#b98aa8] flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 animate-fade-in">
                        <div className="border-t border-white/10 pt-6">
                          <p className="text-base sm:text-lg text-[#c8c0ba] leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={80}>
              <div className="text-center mt-14 sm:mt-20">
                <div className="surface-noir rounded-2xl p-6 sm:p-8 border-[#d4726a]/25">
                  <p className="text-lg sm:text-xl text-white font-semibold mb-4">
                    Ainda tem dúvida?
                  </p>
                  <p className="text-base sm:text-lg text-[#c8c0ba] leading-relaxed">
                    A única dúvida real que você tem é se vai ter coragem de fazer.
                    <span className="text-[#d4726a] font-semibold"> O resto é desculpa.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-36 bg-gradient-to-br from-black/90 via-[#1a0d1c]/40 to-[#210d15]/30">
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,114,106,0.16),transparent_65%)] blur-3xl ember-breathe" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal><SectionKicker index="06" label="A decisão" /></Reveal>
            <Reveal delay={60}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 leading-tight">
                Ou você toma vergonha...
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4726a] to-[#b98aa8] block mt-2 sm:mt-4 ember-glow italic"> ou você repete 2026 com maquiagem nova.</span>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#c8c0ba] mb-10 sm:mb-14 leading-relaxed">
                Clique abaixo e comece o ME AMO, MAS ME ODEIO™ agora.
              </p>
            </Reveal>

            {/* Hero Image */}
            <Reveal delay={60}>
              <div className="relative mb-10 sm:mb-14 lg:mb-16">
                <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                  <img
                    src={finalCta}
                    alt="ME AMO, MAS ME ODEIO - 14 dias para se confrontar"
                    width={1280}
                    height={960}
                    className="w-full h-auto rounded-2xl border border-white/10 edge-hairline"
                    loading="lazy"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#040308] via-transparent to-transparent rounded-2xl"></div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={40}>
              <button className="group relative bg-gradient-to-r from-[#8f2f3f] via-[#4a2350] to-[#8f2f3f] hover:from-[#a9414a] hover:via-[#5b3a63] hover:to-[#a9414a] text-white font-bold py-6 sm:py-8 px-8 sm:px-16 rounded-full text-xl sm:text-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-[#a9414a]/50 mb-10 sm:mb-14 border border-[#d4726a]/30">
                <span className="relative z-10 flex items-center gap-3 sm:gap-4">
                  ME ENTREGA ESSE ESTALO AGORA
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-300" />
                </span>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#d4726a]/30 to-[#b98aa8]/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              </button>
            </Reveal>

            <Reveal delay={80}>
              <div className="mb-8 sm:mb-12">
                <div aria-hidden className="ember-rule mx-auto max-w-sm mb-8" />
                <p className="text-xl sm:text-2xl lg:text-3xl text-white font-bold leading-tight">
                  14 dias para finalmente sair do personagem.
                </p>
              </div>
            </Reveal>

            {selectedVersion && (
              <div className="surface-noir rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-[#7fae8e]/25 max-w-2xl mx-auto animate-fade-in">
                <p className="text-[#7fae8e] font-bold text-lg sm:text-xl lg:text-2xl inline-flex items-center justify-center gap-2 flex-wrap">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  Versão {selectedVersion === 'digital' ? 'Digital' : 'Impressa'} selecionada - R$ {selectedVersion === 'digital' ? '37' : '47'}
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
      <footer className="py-10 sm:py-14 bg-black border-t border-white/10 pb-24 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#b98aa8]" />
            <span className="text-white font-bold text-lg sm:text-xl tracking-[0.22em]">ME AMO, MAS ME ODEIO™</span>
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
