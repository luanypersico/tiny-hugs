import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, CheckCircle, ShieldAlert, X, Brain, RotateCcw } from "lucide-react";
import ShaderBackground from "@/components/ShaderBackground";
import Reveal from "@/components/Reveal";

const STORAGE_KEY = "me-amo-quiz-progress";

type Profile = "ML" | "IF" | "SE" | "FE" | "ER";

type ScoredProfile = "ML" | "IF" | "SE" | "FE";

type Scores = {
  ML: number;
  IF: number;
  SE: number;
  FE: number;
};

type QuizOption = {
  text: string;
  profile: Profile;
  points: number;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: QuizOption[];
};

type QuizAnswer = {
  questionId: number;
  question: string;
  answer: string;
  profile: Profile;
  points: number;
  regulated: boolean;
};

type QuizProgress = {
  step: "intro" | "quiz" | "transition" | "processing" | "lead" | "result";
  currentQuestion: number;
  selectedOption: QuizOption | null;
  answers: QuizAnswer[];
  scores: Scores;
  regulatedCount: number;
  primaryResult: Profile | null;
  secondaryResult: ScoredProfile | null;
};

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      "A conversa está boa. A pessoa deixa claro que está interessada em você. Qual merda começa a acontecer na sua cabeça?",
      {
        text: "Começo a pensar no que devo fazer para ela continuar gostando.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Desconfio. Ninguém se interessa assim sem querer alguma coisa.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Perco um pouco da vontade e começo a demorar para responder.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Tento descobrir os problemas dela e onde posso ser útil.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Fico ansiosa, mas não viro outra pessoa nem invento um teste.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 2,
    question:
      "Você recebe uma mensagem carinhosa de alguém de quem gosta. O que costuma fazer?",
    options: [
      {
        text: "Leio procurando uma intenção escondida.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Respondo do jeito mais agradável possível, mesmo sem estar bem.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Recebo o carinho sem transformar aquilo em dívida.",
        profile: "ER",
        points: 0,
      },
      {
        text: "Já penso no que posso fazer para retribuir em dobro.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Gosto, mas deixo para responder depois porque ficou íntimo demais.",
        profile: "FE",
        points: 3,
      },
    ],
  },
  {
    id: 3,
    question:
      "Alguma coisa incomodou você. A pessoa pergunta se está tudo bem. Sua resposta real costuma ser:",
    options: [
      {
        text: "Está tudo bem.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Eu desapareço por algumas horas ou dias.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Digo que não foi nada e fico fria.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Não sei explicar perfeitamente, mas digo que alguma coisa me pegou.",
        profile: "ER",
        points: 0,
      },
      {
        text: "Esqueço o que senti e começo a tentar entender o lado da pessoa.",
        profile: "SE",
        points: 3,
      },
    ],
  },
  {
    id: 4,
    question:
      "Quando você percebe que está gostando mais do que planejava, você:",
    options: [
      {
        text: "Reduzo o contato antes de parecer emocionada demais.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Começo a fazer muito pela pessoa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Procuro um defeito que prove que isso vai acabar mal.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Escondo o que quero para não assustar.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Admito para mim mesma que estou envolvida e continuo observando os fatos.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 5,
    question:
      "Pense na última pessoa emocionalmente indisponível que mexeu com você. O que prendia você ali?",
    options: [
      {
        text: "A sensação de que, comigo, ela poderia mudar.",
        profile: "SE",
        points: 3,
      },
      {
        text: "A vontade de finalmente ser escolhida.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Era confortável querer alguém que nunca chegaria perto demais.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Quando percebo indisponibilidade repetida, paro de romantizar e me afasto.",
        profile: "ER",
        points: 0,
      },
      {
        text: "Enquanto aquilo era impossível, eu não precisava viver uma relação de verdade.",
        profile: "FE",
        points: 3,
      },
    ],
  },
  {
    id: 6,
    question: "Qual situação aperta um botão feio dentro de você?",
    options: [
      {
        text: "Perceber que alguém ficou decepcionado comigo.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Sentir que estou precisando emocionalmente de alguém.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Ver alguém de quem gosto tomando decisões sem pedir minha ajuda.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Perceber que a pessoa está começando a me conhecer de verdade.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Essas coisas ainda mexem comigo, mas não decidem tudo por mim.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 7,
    question:
      "Quando uma relação está tranquila demais, sem joguinho e sem caos, você:",
    options: [
      {
        text: "Começo a achar que tem alguma coisa errada.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Perco intensidade e confundo paz com falta de química.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Encontro algum problema para resolver.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Faço de tudo para não criar incômodo e estragar aquilo.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Estranho um pouco, mas não invento problema só para sentir alguma coisa.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 8,
    question:
      "Qual frase você já pensou, mesmo que tenha vergonha de admitir?",
    options: [
      {
        text: "Quando a pessoa gosta demais de mim, eu brocho.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Talvez, se eu fosse mais fácil de lidar, ela ficaria.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Eu sei que essa pessoa é complicada, mas comigo vai ser diferente.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Eu prefiro não depender de ninguém. Ninguém mesmo.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Eu posso gostar de alguém sem entregar minha vida inteira na mão dela.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 9,
    question:
      "Depois de uma rejeição, qual comportamento mais parece com você?",
    options: [
      {
        text: "Reviso tudo o que fiz procurando onde deixei de ser suficiente.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Finjo que não liguei e corto qualquer sinal de sentimento.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Fecho a porta para todo mundo por um bom tempo.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Tento mostrar para a pessoa tudo o que ela perdeu.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Eu sofro, mas não transformo a rejeição em prova de que não tenho valor.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 10,
    question:
      "Alguém pede uma coisa que você não quer fazer. O que costuma acontecer?",
    options: [
      {
        text: "Eu aceito e fico com raiva de ter aceitado.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Digo não, mas volto atrás quando a pessoa faz cara de sofrimento.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Recuso de um jeito tão frio que ninguém tenta pedir novamente.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Demoro para responder até o assunto morrer.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Digo não sem escrever uma tese tentando justificar minha existência.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 11,
    question:
      "Você está mal e alguém oferece ajuda. Sua reação mais automática é:",
    options: [
      {
        text: "Não preciso. Eu resolvo.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Tem gente com problemas maiores. Não quero incomodar.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Começo a falar dos problemas da outra pessoa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Mudo de assunto e desapareço depois.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Talvez eu diga que nem sei do que preciso, mas aceito companhia.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 12,
    question: "Qual personagem as pessoas costumam conhecer primeiro?",
    options: [
      {
        text: "A que resolve tudo e sempre sabe o que fazer.",
        profile: "SE",
        points: 3,
      },
      {
        text: "A agradável, leve e que nunca dá trabalho.",
        profile: "ML",
        points: 3,
      },
      {
        text: "A desapegada que vai embora sem olhar para trás.",
        profile: "FE",
        points: 3,
      },
      {
        text: "A forte que não precisa de porra nenhuma.",
        profile: "IF",
        points: 3,
      },
      {
        text: "A que não está sempre bem, mas também não transforma toda dor em espetáculo.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 13,
    question:
      "Quando você percebe que errou com alguém, o que faz primeiro?",
    options: [
      {
        text: "Peço desculpa dez vezes e tento compensar até a pessoa cansar.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Explico todos os motivos para não precisar admitir que doeu.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Evito a conversa porque estou com vergonha.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Começo a listar tudo o que já fiz de bom pela pessoa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Assumo o que fiz, reparo o possível e não me transformo no pior ser humano da Terra.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 14,
    question:
      "Qual dessas verdades você está mais cansada de fingir que não sabe?",
    options: [
      {
        text: "Eu me abandono para evitar que alguém me abandone.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Minha independência também virou uma desculpa para não confiar.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Eu ajudo todo mundo porque ser necessária me faz sentir segura.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Eu chamo de perda de interesse aquilo que muitas vezes é medo.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Eu já reconheço meus padrões, mas ainda preciso parar de voltar para eles quando estou frágil.",
        profile: "ER",
        points: 0,
      },
    ],
  },
];

const TRANSITIONS = [
  {
    afterQuestion: 4,
    title:
      "VOCÊ NÃO RESPONDEU SOBRE AMOR. RESPONDEU SOBRE O QUE FAZ QUANDO ELE CHEGA PERTO.",
    text:
      "Até aqui já apareceu uma coisa importante: quando existe risco de alguém conhecer você de verdade, você tenta agradar, controlar, salvar ou sumir. Agora a desculpa começa a ficar mais difícil.",
    button: "CONTINUAR",
  },
  {
    afterQuestion: 8,
    title: "AGORA FICOU MENOS BONITO.",
    text:
      "Até aqui você já mostrou como costuma se defender: virando a mulher perfeita, virando pedra, virando enfermeira emocional ou virando fumaça. A próxima parte é sobre o que acontece depois que a merda já aconteceu.",
    button: "EU NÃO VOU SUMIR AGORA",
  },
  {
    afterQuestion: 12,
    title: "FALTAM DUAS.",
    text:
      "Não escolhe a resposta mais madura. Escolhe a que você já fez e depois fingiu que não fez. A resposta bonita não muda sua vida. A resposta verdadeira talvez mude.",
    button: "RASGAR A ÚLTIMA DESCULPA",
  },
];

export default function QuizLanding() {
  const [step, setStep] = useState<"intro" | "quiz" | "transition" | "processing" | "lead" | "result">("intro");
  const [formData, setFormData] = useState({ name: "", contact: "" });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [scores, setScores] = useState<Scores>({
    ML: 0,
    IF: 0,
    SE: 0,
    FE: 0,
  });
  const [regulatedCount, setRegulatedCount] = useState(0);
  const [primaryResult, setPrimaryResult] = useState<Profile | null>(null);
  const [secondaryResult, setSecondaryResult] = useState<ScoredProfile | null>(null);

  const [activeTransition, setActiveTransition] = useState<any>(null);

  const calculateQuizResult = (
    finalAnswers: QuizAnswer[],
    finalScores: Scores,
    finalRegulatedCount: number
  ) => {
    const sortedProfiles = (Object.entries(finalScores) as [ScoredProfile, number][]).sort(
      (a, b) => b[1] - a[1]
    );

    const first = sortedProfiles[0];
    const second = sortedProfiles[1];

    if (!first || !second) {
      setPrimaryResult("ER");
      setSecondaryResult(null);
      return;
    }

    const topScore = first[1];
    const secondScore = second[1];
    const diffTopTwo = topScore - secondScore;

    if (finalRegulatedCount >= 8 || (finalRegulatedCount >= 6 && diffTopTwo <= 2)) {
      setPrimaryResult("ER");
      setSecondaryResult(null);
      return;
    }

    const maxScore = first[1];
    const tiedProfiles = sortedProfiles.filter(([_, score]) => score === maxScore).map(([p, _]) => p);

    let winner: ScoredProfile = tiedProfiles[0] || "ML";

    if (tiedProfiles.length > 1) {
      const q14Answer = finalAnswers.find((a) => a.questionId === 14);
      if (q14Answer && q14Answer.profile !== "ER" && tiedProfiles.includes(q14Answer.profile as ScoredProfile)) {
        winner = q14Answer.profile as ScoredProfile;
      } else {
        const subsetAnswers = finalAnswers.filter((a) => a.questionId >= 9 && a.questionId <= 13);
        const counts = tiedProfiles.map((p) => ({
          profile: p,
          count: subsetAnswers.filter((a) => a.profile === p).length,
        }));
        const maxCount = Math.max(...counts.map((c) => c.count));
        const winnersByCount = counts.filter((c) => c.count === maxCount);

        const soleWinner = winnersByCount.at(0);

        if (winnersByCount.length === 1 && soleWinner) {
          winner = soleWinner.profile;
        } else {
          const reversedAnswers = [...finalAnswers].reverse();

          const latestTied = reversedAnswers.find(
            (answer) =>
              !answer.regulated &&
              tiedProfiles.includes(answer.profile as ScoredProfile)
          );

          winner = latestTied
            ? (latestTied.profile as ScoredProfile)
            : (tiedProfiles.at(0) ?? "ML");
        }
      }
    }

    setPrimaryResult(winner);

    const remainingProfiles = (Object.entries(finalScores) as [ScoredProfile, number][])
      .filter(([p, _]) => p !== winner)
      .sort((a, b) => b[1] - a[1]);

    const runnerUp = remainingProfiles[0];
    if (runnerUp && (finalScores[winner] || 0) - runnerUp[1] <= 2) {
      setSecondaryResult(runnerUp[0]);
    } else {
      setSecondaryResult(null);
    }
  };

  const confirmAnswer = () => {
    if (!selectedOption) return;

    const currentQuestionData = QUESTIONS[currentQuestion];
    if (!currentQuestionData) return;

    const confirmedAnswer: QuizAnswer = {
      questionId: currentQuestionData.id,
      question: currentQuestionData.question,
      answer: selectedOption.text,
      profile: selectedOption.profile,
      points: selectedOption.points,
      regulated: selectedOption.profile === "ER",
    };

    const nextAnswers = [...answers, confirmedAnswer];
    let nextScores = { ...scores };
    let nextRegulatedCount = regulatedCount;

    if (confirmedAnswer.profile === "ER") {
      nextRegulatedCount += 1;
    } else {
      const p = confirmedAnswer.profile as ScoredProfile;
      nextScores[p] += confirmedAnswer.points;
    }

    setAnswers(nextAnswers);
    setScores(nextScores);
    setRegulatedCount(nextRegulatedCount);
    setSelectedOption(null);

    const nextQ = currentQuestion + 1;

    if (nextQ >= QUESTIONS.length) {
      calculateQuizResult(nextAnswers, nextScores, nextRegulatedCount);
      setStep("processing");
      setTimeout(() => setStep("lead"), 3000);
      return;
    }

    const transition = TRANSITIONS.find((t) => t.afterQuestion === nextQ);
    if (transition) {
      setActiveTransition(transition);
      setStep("transition");
    } else {
      setCurrentQuestion(nextQ);
    }
  };

  const getResult = () => {
    return primaryResult || "ER";
  };

  return (
    <div className="relative min-h-screen bg-[#0a0807] text-[#c8c0ba] font-sans selection:bg-[#8f2f3f] selection:text-white overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 z-0"><ShaderBackground /></div>
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6 w-full max-w-full py-20">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 max-w-2xl px-4">
              <div className="space-y-4">
                <span className="kicker !text-[#8f2f3f]">Diagnóstico Comportamental</span>
                <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase leading-[0.85] tracking-tighter">
                  Você é realmente independente… <br />
                  <span className="text-white/40">ou só aprendeu a fugir antes que alguém pudesse abandoná-la?</span>
                </h1>
              </div>
              
              <div className="space-y-6 max-w-lg mx-auto">
                <p className="text-lg md:text-xl italic text-white/70 leading-tight">
                  Talvez todo mundo ache você forte, segura e resolvida. Mas ninguém vê o que acontece quando você começa a gostar de alguém.
                </p>
                <p className="text-sm uppercase tracking-widest text-[#8f2f3f] font-black">
                  Este teste vai revelar qual personagem emocional você criou para sobreviver.
                </p>
              </div>

              <div className="pt-6 space-y-4">
                <button onClick={() => setStep("quiz")} className="w-full md:w-auto bg-[#8f2f3f] text-white px-12 py-7 rounded-2xl text-xl uppercase font-black tracking-tighter hover:bg-[#a9414a] transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(143,47,63,0.5)]">
                  COMEÇAR O CONFRONTO
                </button>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Leva menos de 4 minutos. As respostas são confidenciais.</p>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl space-y-10 px-4 md:px-0">
               <div className="text-center space-y-3">
                 <div className="flex justify-between items-end">
                   <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f2f3f] font-black">
                     CONFRONTO {(currentQuestion + 1).toString().padStart(2, "0")} DE {QUESTIONS.length}
                   </p>
                   <p className="text-[10px] text-white/30 font-black">
                     {Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}%
                   </p>
                 </div>
                 <div className="h-1.5 bg-white/5 w-full rounded-full overflow-hidden border border-white/5">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                     className="h-full bg-[#8f2f3f] shadow-[0_0_15px_rgba(143,47,63,0.5)]" 
                   />
                 </div>
               </div>
               <div className="space-y-4">
                 <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase leading-[0.9] tracking-tighter">
                   {QUESTIONS[currentQuestion]?.question}
                 </h2>
               </div>
               <div className="grid gap-3 md:gap-4">
                 {QUESTIONS[currentQuestion]?.options.map((opt, i: number) => {
                   const isSelected = selectedOption?.text === opt.text;
                   return (
                     <button 
                       key={i} 
                       onClick={() => setSelectedOption(opt)} 
                       aria-pressed={isSelected}
                       className={`group w-full p-6 text-left border transition-all rounded-2xl active:scale-[0.98] flex items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#8f2f3f] ${
                         isSelected 
                           ? "border-[#8f2f3f] bg-[#8f2f3f]/10 shadow-[0_0_20px_rgba(143,47,63,0.2)]" 
                           : "border-white/10 bg-white/[0.02] hover:border-[#8f2f3f]/50 hover:bg-[#8f2f3f]/5"
                       }`}
                     >
                       <span className={`text-base md:text-lg transition-colors leading-snug ${
                         isSelected ? "text-white font-bold" : "text-white/80 group-hover:text-white"
                       }`}>
                         {opt.text}
                       </span>
                       <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                         isSelected ? "border-[#8f2f3f] bg-[#8f2f3f]" : "border-white/20 group-hover:border-[#8f2f3f]/50"
                       }`}>
                         {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                       </div>
                     </button>
                   );
                 })}
               </div>

               <AnimatePresence>
                 {selectedOption && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 10 }}
                     className="space-y-8"
                   >
                     <div className="p-6 border-l-2 border-[#8f2f3f] bg-white/[0.02] italic text-white/90 text-lg">
                       {selectedOption.profile === "ML" && "“Você não evita conflito. Você evita o risco de desagradar.”"}
                       {selectedOption.profile === "IF" && "“Nem toda distância é paz. Às vezes é medo bem vestido.”"}
                       {selectedOption.profile === "SE" && "“Ser necessária não é a mesma coisa que ser amada.”"}
                       {selectedOption.profile === "FE" && "“Sumir dá sensação de controle. Também mata qualquer chance de profundidade.”"}
                       {selectedOption.profile === "ER" && "“Isso não é perfeição. É conseguir ficar presente sem se abandonar.”"}
                     </div>

                     <button 
                       onClick={confirmAnswer}
                       className="w-full bg-[#8f2f3f] text-white py-6 rounded-2xl text-xl uppercase font-black tracking-tighter hover:bg-[#a9414a] transition-all active:scale-95 shadow-[0_20px_40px_-10px_rgba(143,47,63,0.5)]"
                     >
                       CONTINUAR
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          )}

          {step === "transition" && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10 max-w-xl px-4">
              <div className="space-y-4">
                <span className="kicker !text-[#8f2f3f]">Avançando no Confronto</span>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">{activeTransition?.title}</h2>
              </div>
              <p className="text-lg md:text-xl italic text-white/80 leading-tight">{activeTransition?.text}</p>
              <button 
                onClick={() => { setStep("quiz"); setCurrentQuestion(currentQuestion + 1); }} 
                 className="w-full md:w-auto bg-[#8f2f3f] px-12 py-6 rounded-2xl text-white uppercase font-black tracking-tighter shadow-[0_20px_40px_-10px_rgba(143,47,63,0.5)] active:scale-95"
               >
                 {activeTransition?.button || "CONTINUAR"}
               </button>
            </motion.div>
          )}

          {step === "processing" && (
            <div className="text-center space-y-12 max-w-xl">
              <div className="relative">
                <div className="w-24 h-24 border-2 border-white/5 border-t-[#8f2f3f] rounded-full animate-spin mx-auto" />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#8f2f3f] animate-pulse" />
              </div>
              <motion.h2 
                key={currentQuestion} // Reuse state for animation rhythm if needed
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter"
              >
                ANALISANDO A PERSONAGEM QUE VOCÊ CRIOU…
              </motion.h2>
              <div className="space-y-4">
                 <p className="text-[#8f2f3f] font-black tracking-widest text-xs uppercase animate-pulse">Identificando seus mecanismos de proteção…</p>
                 <p className="text-white/40 text-xs uppercase tracking-widest">Analisando os padrões que você repete…</p>
              </div>
            </div>
          )}

          {step === "lead" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg space-y-10 px-4">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Seu padrão apareceu.</h2>
                <p className="text-[#c8c0ba]/80 italic">Preencha os dados abaixo para revelar seu perfil dominante e o preço silencioso que você paga.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8f2f3f] font-black">Primeiro Nome</label>
                  <input 
                    type="text" 
                    placeholder="Como você quer ser chamada?"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 focus:border-[#8f2f3f] outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8f2f3f] font-black">E-mail ou WhatsApp</label>
                  <input 
                    type="text" 
                    placeholder="Para onde enviamos seu diagnóstico?"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 focus:border-[#8f2f3f] outline-none transition-all text-white"
                  />
                </div>
                
                <button 
                  onClick={() => setStep("result")}
                  disabled={!formData.name || !formData.contact}
                  className="w-full bg-[#8f2f3f] text-white py-6 rounded-xl font-black uppercase tracking-tighter hover:bg-[#a9414a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_-10px_rgba(143,47,63,0.4)]"
                >
                  REVELAR MEU RESULTADO
                </button>
                
                <p className="text-[10px] text-center text-white/30 uppercase tracking-widest leading-relaxed">
                  Seus dados serão usados apenas para entregar seu resultado e conteúdos relacionados. Nada de mensagens infinitas.
                </p>
              </div>
            </motion.div>
          )}

          {step === "result" && (
             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl space-y-12 pb-20 px-4">
               {(() => {
                 const resCode = getResult();
                 const content: any = {
                   ML: {
                     name: "A MULHER LEGAL QUE SE ABANDONA",
                     headline: "Todo mundo gosta de você. O problema é que você aprendeu a desaparecer.",
                     desc: "Você percebe rapidamente o que os outros esperam e se transforma na versão mais confortável para eles. Evita conflitos, esconde necessidades, pede desculpas por sentir.",
                     pattern: "Você abandona a si mesma antes que alguém tenha a oportunidade de abandoná-la.",
                     price: "Relações em que todos conhecem sua versão agradável, mas quase ninguém conhece você de verdade.",
                     confront: "Antes de dizer “sim”, pergunte: “Eu realmente quero isso ou estou tentando impedir que alguém se decepcione?”",
                     punch: "Você não precisa continuar sendo conveniente para merecer permanência.",
                     cta: "PARAR DE ME ABANDONAR",
                     icon: <ShieldAlert className="w-12 h-12 text-[#8f2f3f]" />
                   },
                   IF: {
                     name: "A INDEPENDENTE FERIDA",
                     headline: "Você chama de independência aquilo que nasceu do medo de precisar.",
                     desc: "Você construiu uma armadura eficiente. Resolve problemas, evita demonstrar fragilidade e tenta manter controle. Quando alguém se aproxima, você procura o risco.",
                     pattern: "Você se protege tanto contra a possibilidade de sofrer que também bloqueia a possibilidade de ser acolhida.",
                     price: "Ser admirada pela força e, ao mesmo tempo, sentir que ninguém consegue chegar perto de verdade.",
                     confront: "Na próxima vez que oferecerem ajuda, não responda que não precisa. Descubra se é autonomia ou apenas defesa.",
                     punch: "Sua força não desaparece quando você permite que alguém esteja ao seu lado.",
                     cta: "COMEÇAR A BAIXAR A ARMADURA",
                     icon: <Brain className="w-12 h-12 text-[#8f2f3f]" />
                   },
                   SE: {
                     name: "A SALVADORA EXAUSTA",
                     headline: "Você se tornou necessária para todo mundo. E ficou ausente da própria vida.",
                     desc: "Você identifica dores e problemas antes mesmo que peçam ajuda. Sente valor quando orienta e resolve. Pode acabar escolhendo pessoas emocionalmente confusas.",
                     pattern: "Você tenta conquistar amor sendo indispensável.",
                     price: "Cansaço, ressentimento e relações em que você oferece transformação, mas recebe migalhas.",
                     confront: "Antes de correr para resolver algo, pergunte: “Essa pessoa pediu ajuda ou eu estou tentando provar meu valor?”",
                     punch: "Amor não deveria depender da quantidade de problemas que você consegue resolver.",
                     cta: "PARAR DE SALVAR TODO MUNDO",
                     icon: <Sparkles className="w-12 h-12 text-[#8f2f3f]" />
                   },
                   FE: {
                     name: "A FUGITIVA EMOCIONAL",
                     headline: "Você não perde o interesse de repente. Você foge quando percebe que pode ser vista.",
                     desc: "No início você se envolve, mas quando exige presença ou vulnerabilidade, você esfria. Vai embora primeiro para não correr o risco de ser deixada depois.",
                     pattern: "Você vai embora primeiro para não correr o risco de ser deixada depois.",
                     price: "Histórias interrompidas antes que tivessem a oportunidade de se tornar seguras.",
                     confront: "Quando sentir vontade de desaparecer, permaneça na conversa por mais alguns minutos. Escreva o que está sentindo.",
                     punch: "Ficar presente não garante que nunca será ferida. Mas fugir garante que nada profundo permaneça.",
                     cta: "PARAR DE FUGIR DE MIM",
                     icon: <X className="w-12 h-12 text-[#8f2f3f]" />
                   },
                   ER: {
                     name: "A MULHER EM RECONSTRUÇÃO",
                     headline: "Você já começou a desmontar a personagem. Agora evite que ela assuma o controle.",
                     desc: "Você reconhece necessidades, estabelece limites e aceita apoio. Não significa que os padrões sumiram, mas que você já tem consciência para escolher diferente.",
                     pattern: "Você está deixando de reagir automaticamente e começando a agir com intenção.",
                     price: "Voltar aos comportamentos antigos quando estiver cansada ou sobrecarregada.",
                     confront: "Observe quais situações fazem você voltar a agradar ou fugir. A recaída começa antes da decisão final.",
                     punch: "Você não precisa voltar a ser quem foi apenas porque essa versão ainda parece familiar.",
                     cta: "CONSOLIDAR MINHA NOVA IDENTIDADE",
                     icon: <CheckCircle className="w-12 h-12 text-[#8f2f3f]" />
                   }
                 };

                 const result = content[resCode] || content.ER;

                 return (
                   <div className="space-y-16">
                     <header className="space-y-6 text-center">
                        <span className="kicker !text-[#8f2f3f]">Seu Perfil Revelado</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase leading-[0.8] tracking-tighter">
                          {result.name}
                        </h2>
                        <p className="text-2xl md:text-3xl text-white/90 italic font-light max-w-2xl mx-auto leading-tight">
                          “{result.headline}”
                        </p>
                     </header>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="surface-noir p-8 rounded-3xl space-y-6 border-[#8f2f3f]/20">
                         <div className="flex items-center gap-4">
                           {result.icon}
                           <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">O Diagnóstico</h4>
                         </div>
                         <p className="text-white/70 leading-relaxed italic">{result.desc}</p>
                         <div className="pt-6 border-t border-white/5 space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f2f3f] font-black">Padrão Central</p>
                            <p className="text-white font-bold italic text-lg">{result.pattern}</p>
                         </div>
                       </div>

                       <div className="space-y-8">
                         <div className="p-8 bg-white/5 rounded-3xl space-y-4 border border-white/5">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f2f3f] font-black">Preço Silencioso</p>
                            <p className="text-white/80 italic">{result.price}</p>
                         </div>
                         <div className="p-8 bg-[#8f2f3f]/5 rounded-3xl space-y-4 border border-[#8f2f3f]/10">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4726a] font-black">Primeiro Confronto</p>
                            <p className="text-white/80 italic">{result.confront}</p>
                         </div>
                       </div>
                     </div>

                     <div className="text-center space-y-10 py-10">
                        <p className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter ember-glow">
                          {result.punch}
                        </p>
                        <div className="ember-rule" />
                     </div>

                     <section className="surface-noir p-10 md:p-16 rounded-[3rem] text-center space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#8f2f3f]/10 to-transparent pointer-events-none" />
                        
                        <div className="relative space-y-6">
                          <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                            VOCÊ DESCOBRIU A PERSONAGEM.<br />AGORA PRECISA DESMONTÁ-LA.
                          </h3>
                          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto italic">
                            O “ME AMO, MAS ME ODEIO™” é um processo guiado de 14 dias para confrontar os comportamentos que você usa para agradar, controlar, salvar ou fugir.
                          </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-6">
                           <div className="text-left">
                              <p className="text-xs uppercase tracking-widest text-white/30 mb-1">De R$ 97,00</p>
                              <p className="text-6xl font-black text-white tracking-tighter ember-glow">R$ 29,90</p>
                           </div>
                           <button className="w-full md:w-auto bg-[#8f2f3f] hover:bg-[#a9414a] text-white px-12 py-8 rounded-2xl text-xl font-black uppercase tracking-tighter transition-all shadow-[0_20px_50px_-10px_rgba(143,47,63,0.5)] active:scale-95">
                             {result.cta}
                           </button>
                        </div>

                        <p className="text-xs text-white/30 uppercase tracking-widest italic pt-4">
                          Pagamento único. Acesso imediato e vitalício.
                        </p>
                     </section>
                   </div>
                 );
               })()}
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}