import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldAlert, Zap, CheckCircle, ChevronRight, Brain, Sparkles } from "lucide-react";
import ShaderBackground from "@/components/ShaderBackground";
import Reveal from "@/components/Reveal";

const QUESTIONS = [
  {
    id: 1,
    question: "Como você reage quando algo começa a dar 'certo demais' na sua vida?",
    options: [
      { label: "Sinto um frio na barriga e espero o desastre acontecer", value: "fear" },
      { label: "Encontro um defeito ou motivo para me afastar", value: "sabotage" },
      { label: "Fico paralisada sem saber como agir", value: "freeze" },
      { label: "Aproveito, mas sempre com um pé atrás", value: "anxious" }
    ]
  },
  {
    id: 2,
    question: "Qual dessas frases mais ressoa com o seu silêncio?",
    options: [
      { label: "'Eu não sou tão boa quanto eles pensam'", value: "imposter" },
      { label: "'Sempre acabo sozinha, não importa o que eu faça'", value: "lonely" },
      { label: "'Se eles souberem quem eu sou de verdade, vão embora'", value: "mask" },
      { label: "'Eu prefiro sofrer sozinha do que ser rejeitada'", value: "avoidant" }
    ]
  },
  {
    id: 3,
    question: "Sobre a 'Mulher Legal': você sente que...",
    options: [
      { label: "Sufoca suas vontades para não desagradar", value: "pleaser" },
      { label: "Aceita menos do que merece por medo de perder", value: "low-worth" },
      { label: "É a conselheira de todos, mas ninguém te ouve", value: "invisible" },
      { label: "Atrai sempre o mesmo tipo de homem problemático", value: "cycle" }
    ]
  },
  {
    id: 4,
    question: "O que você faz quando sente que está sendo 'demais' para alguém?",
    options: [
      { label: "Me diminuo para caber no espaço do outro", value: "shrink" },
      { label: "Peço desculpas por existir ou sentir", value: "apologize" },
      { label: "Sumo antes que a pessoa me mande embora", value: "ghost" },
      { label: "Finjo que não me importo", value: "numb" }
    ]
  },
  {
    id: 5,
    question: "Se você pudesse parar de fingir hoje, qual seria o seu maior medo?",
    options: [
      { label: "Ser julgada como egoísta ou 'louca'", value: "judgment" },
      { label: "Ficar completamente sozinha", value: "abandonment" },
      { label: "Descobrir que não sei quem eu sou sem a máscara", value: "identity" },
      { label: "O peso da responsabilidade de ser livre", value: "freedom" }
    ]
  }
];

const RESULTS = {
  sabotage: {
    title: "A AUTO-SABOTADORA DIPLOMATA",
    description: "Você construiu uma vida onde o sucesso é um perigo. Sempre que a felicidade se aproxima, você 'diplomaticamente' cria um caos para restaurar o desconforto familiar. Você se ama, mas odeia o risco de ser vulnerável.",
    icon: <Brain className="w-12 h-12 text-[#8f2f3f]" />
  },
  mask: {
    title: "A REFÉM DA PERSONAGEM",
    description: "Você é a 'mulher legal' perfeita. Todos te admiram, mas ninguém te conhece. Você está exausta de sustentar uma máscara que não te deixa respirar, e por isso seus ciclos sempre terminam em vazio.",
    icon: <ShieldAlert className="w-12 h-12 text-[#8f2f3f]" />
  },
  generic: {
    title: "O CICLO DA MULHER INVISÍVEL",
    description: "Você se tornou mestre em se diminuir. Seu maior medo não é a solidão, mas sim ser vista de verdade e não ser o suficiente. Você está presa em um ciclo de auto-anulação que precisa ser quebrado hoje.",
    icon: <Sparkles className="w-12 h-12 text-[#8f2f3f]" />
  }
};

export default function QuizLanding() {
  const [step, setStep] = useState<"intro" | "quiz" | "calculating" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("calculating");
      setTimeout(() => setStep("result"), 3000);
    }
  };

  const getResult = () => {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    if ((counts["sabotage"] || 0) > 0) return RESULTS.sabotage;
    if ((counts["mask"] || 0) > 0) return RESULTS.mask;
    return RESULTS.generic;
  };

  return (
    <div className="relative min-h-screen bg-[#0a0807] text-[#c8c0ba] font-sans selection:bg-[#8f2f3f] selection:text-white overflow-x-hidden">
      <ShaderBackground />
      
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-1000 opacity-40 lg:opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(143, 47, 63, 0.15), transparent 80%)`
        }}
      />

      <main className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl text-center space-y-12"
            >
              <div className="space-y-6">
                <span className="text-[#8f2f3f] font-black tracking-[0.4em] uppercase text-sm block mb-4">
                  DIAGNÓSTICO DE AUTO-SABOTAGEM
                </span>
                <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                  O FIM DA <br /> PERSONAGEM
                </h1>
                <p className="text-xl md:text-2xl text-[#c8c0ba]/80 font-light max-w-2xl mx-auto leading-relaxed italic">
                  "Descubra qual o nível de sabotagem emocional que está travando sua vida e impedindo você de ser irreconhecível."
                </p>
              </div>

              <button
                onClick={() => setStep("quiz")}
                className="group relative inline-flex items-center gap-6 bg-[#8f2f3f] hover:bg-[#a9414a] text-white font-black px-12 py-8 rounded-full text-2xl transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(143,47,63,0.6)] uppercase tracking-tighter overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  DESCOBRIR MEU PERFIL
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl"
            >
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-xs font-black tracking-widest text-[#8f2f3f] uppercase">
                    Pergunta {currentQuestion + 1} de {QUESTIONS.length}
                  </span>
                  <span className="text-3xl font-black text-white/20 italic">
                    {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    className="h-full bg-[#8f2f3f]"
                  />
                </div>
              </div>

              <div className="space-y-10">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight uppercase italic">
                  {QUESTIONS[currentQuestion].question}
                </h2>

                <div className="grid gap-4">
                  {QUESTIONS[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className="group relative w-full text-left p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-[#8f2f3f]/10 hover:border-[#8f2f3f]/50 transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="text-lg font-light text-[#c8c0ba] group-hover:text-white transition-colors">
                        {option.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-[#8f2f3f] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "calculating" && (
            <motion.div 
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-2 border-white/10 border-t-[#8f2f3f] rounded-full animate-spin mx-auto" />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#8f2f3f] animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                Processando suas respostas...
              </h3>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl w-full"
            >
              {(() => {
                const result = getResult();
                return (
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <span className="inline-block bg-[#8f2f3f]/20 text-[#d4726a] px-4 py-1 rounded-full text-xs font-black tracking-[0.2em] uppercase">
                          DIAGNÓSTICO CONCLUÍDO
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                          {result.title}
                        </h2>
                      </div>
                      
                      <div className="flex gap-6 items-start">
                        <div className="flex-shrink-0 p-4 bg-[#8f2f3f]/10 rounded-2xl">
                          {result.icon}
                        </div>
                        <p className="text-xl md:text-2xl text-[#c8c0ba] font-light leading-relaxed italic">
                          {result.description}
                        </p>
                      </div>

                      <div className="p-8 border border-[#8f2f3f]/30 bg-[#8f2f3f]/5 rounded-3xl space-y-4">
                        <h4 className="text-[#d4726a] font-black uppercase text-sm tracking-widest">⚠️ VEREDITO CRÍTICO:</h4>
                        <p className="text-white text-lg font-bold leading-snug">
                          Seus ciclos não vão mudar enquanto você não matar a personagem que criou para ser aceita. Você está a um passo da ressurreição.
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <Reveal from="right">
                        <div className="surface-noir p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_0_100px_-30px_rgba(143,47,63,0.4)] relative overflow-hidden group">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8f2f3f]/30 to-transparent blur-3xl opacity-50" />
                          
                          <div className="relative space-y-10">
                            <div className="space-y-2">
                              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">
                                A SOLUÇÃO PARA O SEU PERFIL:
                              </h3>
                              <p className="text-[#8f2f3f] font-black tracking-widest text-xs uppercase">PLANO DE 14 DIAS COMPLETO</p>
                            </div>

                            <div className="space-y-4">
                              {[
                                "Plano + comandos diários (100+ págs)",
                                "Acesso vitalício ao conteúdo",
                                "Esmurre sua insegurança emocional",
                                "Método para parar de fugir"
                              ].map((f, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <CheckCircle className="w-5 h-5 text-[#8f2f3f]" />
                                  <span className="text-lg font-light">{f}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-6 border-t border-white/5">
                              <div className="flex items-center gap-4 mb-6">
                                <span className="text-white/30 text-2xl line-through italic">R$ 97,00</span>
                                <span className="text-6xl font-black text-white tracking-tighter ember-glow">R$ 29,90</span>
                              </div>

                              <button
                                onClick={() => window.open('https://pay.hotmart.com/YOUR_LINK', '_blank')}
                                className="group relative w-full overflow-hidden bg-[#8f2f3f] hover:bg-[#a9414a] text-white font-black py-8 rounded-2xl text-xl md:text-2xl transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(143,47,63,0.6)] uppercase tracking-tighter"
                              >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                  QUERO MINHA RESSURREIÇÃO
                                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                                </span>
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-10 left-10 pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[20rem] font-black leading-none uppercase italic tracking-tighter">
          CONFRONTO
        </h2>
      </div>
    </div>
  );
}
