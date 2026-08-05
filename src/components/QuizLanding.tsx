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

type DisplayedAnswer = QuizAnswer & {
  label: string;
};

const PROFILE_NAMES: Record<Profile, string> = {
  ML: "A ARQUITETA DE SEGUNDA-FEIRA",
  IF: "A PERFECCIONISTA PARALISADA",
  SE: "A VICIADA EM ALÍVIO IMEDIATO",
  FE: "A RECOMEÇADORA COMPULSIVA",
  ER: "A MULHER QUE ESTÁ RECONSTRUINDO A PRÓPRIA PALAVRA",
};

const PROFILE_HEADLINES: Record<Profile, string> = {
  ML: "Você planeja uma vida foda e executa uma desculpa por dia.",
  IF: "Você chama de perfeccionismo. Muitas vezes é medo usando roupa bonita.",
  SE: "Você troca o próprio futuro por alguns minutos de alívio.",
  FE: "Você não aprendeu a continuar. Só ficou muito boa em recomeçar.",
  ER: "Você está começando a provar que sua palavra ainda vale alguma coisa.",
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
      "Segunda-feira chegou. Você decidiu que agora sua vida vai mudar. O que costuma acontecer primeiro?",
    options: [
      {
        text: "Eu monto uma rotina perfeita, escolho aplicativo, cor, horário e nome para o projeto.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Eu percebo que ainda preciso pesquisar mais antes de começar direito.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Eu faço uma coisinha, sinto que mereço descansar e desapareço no celular.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Eu começo com força total porque dessa vez preciso compensar tudo o que não fiz.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Eu escolho uma ação pequena e começo antes de transformar isso em um evento.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 2,
    question:
      "Existe uma tarefa importante que levaria vinte minutos. O que você faz?",
    options: [
      {
        text: "Abro o celular por cinco minutos e volto quarenta minutos depois.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Espero ter silêncio, energia e concentração suficientes para fazer bem.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Organizo a lista de tarefas antes de começar a tarefa.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Faço uma versão simples, mesmo sem estar com vontade.",
        profile: "ER",
        points: 0,
      },
      {
        text: "Penso que agora já está tarde e decido começar amanhã cedo.",
        profile: "FE",
        points: 3,
      },
    ],
  },
  {
    id: 3,
    question:
      "Você falhou um dia na rotina. Qual é sua reação automática?",
    options: [
      {
        text: "Já que estraguei hoje, segunda-feira eu recomeço direito.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Procuro alguma coisa para me distrair da culpa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Concluo que o plano não estava bom o suficiente.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Crio uma rotina nova para substituir a rotina que eu não cumpri.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Retomo na próxima ação sem transformar o erro em funeral.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 4,
    question:
      "Quando chega a hora de começar algo que realmente importa, qual palhaçada sua cabeça costuma inventar?",
    options: [
      {
        text: "Eu ainda não estou pronta.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Preciso organizar tudo primeiro.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Só vou descansar um pouco para começar melhor.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Hoje já não conta. Amanhã faço do jeito certo.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Posso começar mal e melhorar enquanto faço.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 5,
    question:
      "Quando você vê outra pessoa avançando em algo que também queria fazer, o que acontece?",
    options: [
      {
        text: "Penso que ela provavelmente tinha mais preparo, dinheiro ou oportunidade.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Eu me comparo, me sinto uma merda e procuro alguma distração.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Salvo mais conteúdos e monto outro plano para recuperar o atraso.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Decido que amanhã vou mudar tudo de uma vez.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Uso o desconforto para escolher uma ação real que cabe no meu dia.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 6,
    question:
      "Qual é sua relação com planners, listas, aplicativos e métodos de produtividade?",
    options: [
      {
        text: "Eu amo montar o sistema. Cumprir o sistema já é outra história.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Continuo procurando o método perfeito que finalmente vai funcionar comigo.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Uso por alguns dias e abandono quando perde a novidade.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Compro ou crio outro toda vez que decido recomeçar.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Uso somente o suficiente para lembrar o que precisa ser feito.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 7,
    question: "O prazo ainda está longe. O que você costuma fazer?",
    options: [
      {
        text: "Escolho o alívio de agora e deixo a pressão para minha versão do futuro.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Espero ter clareza suficiente para fazer sem errar.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Divido a tarefa em tantas partes que gasto mais tempo planejando do que fazendo.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Deixo acumular até precisar de um recomeço desesperado.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Faço uma parte pequena enquanto ainda existe espaço para respirar.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 8,
    question: "Qual frase você já usou para encobrir sua procrastinação?",
    options: [
      {
        text: "Eu só preciso me organizar melhor.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Eu funciono melhor quando tenho certeza do que estou fazendo.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Depois eu faço. Agora estou cansada.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Na próxima semana vou começar direito.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Não estou motivada, mas ainda consigo fazer uma parte.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 9,
    question: "Depois de abandonar mais um projeto, o que você faz?",
    options: [
      {
        text: "Crio uma data simbólica para recomeçar do zero.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Analiso tudo e desenho uma estratégia ainda mais completa.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Uso o fracasso como prova de que ainda não estou pronta.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Evito pensar nisso até a culpa diminuir.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Descubro o menor ponto possível de retomada e continuo dali.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 10,
    question: "Quando existe risco de seu trabalho não ficar bom, você:",
    options: [
      {
        text: "Adio para não precisar encarar um resultado abaixo do que imaginei.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Continuo melhorando a estrutura antes de produzir a primeira versão.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Procuro uma tarefa mais fácil para sentir que fiz alguma coisa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Abandono a ideia e prometo voltar numa fase melhor.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Entrego uma primeira versão imperfeita e corrijo depois.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 11,
    question: "Quando a empolgação inicial morre, o que sobra?",
    options: [
      {
        text: "Procuro outra coisa que me dê novidade e prazer rápido.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Interpreto a queda de motivação como sinal de que preciso recomeçar.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Refaço o sistema para tentar recuperar a animação.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Espero voltar a me sentir preparada.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Reduzo a tarefa, mas mantenho algum movimento.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 12,
    question: "Qual destes hábitos mais destrói sua rotina sem fazer barulho?",
    options: [
      {
        text: "Pegar o celular sempre que sinto qualquer desconforto.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Adiar enquanto imagino a forma perfeita de fazer.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Organizar infinitamente aquilo que deveria executar.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Jogar tudo fora depois de um único dia ruim.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Eu ainda escorrego, mas já consigo retomar antes de perder a semana.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 13,
    question: "Quando você promete alguma coisa para si mesma e não cumpre, o que faz?",
    options: [
      {
        text: "Procuro alguma coisa que me faça esquecer a culpa.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Crio uma promessa nova, mais organizada e mais bonita.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Uso isso como prova de que preciso estar mais preparada da próxima vez.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Marco uma nova data para recomeçar tudo.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Reconheço que quebrei a promessa e faço uma versão menor ainda no mesmo dia.",
        profile: "ER",
        points: 0,
      },
    ],
  },
  {
    id: 14,
    question: "Qual dessas verdades você está mais cansada de fingir que não sabe?",
    options: [
      {
        text: "Eu planejo tanto porque planejar me deixa sentir produtiva sem precisar me expor à execução.",
        profile: "ML",
        points: 3,
      },
      {
        text: "Meu perfeccionismo é uma desculpa bonita para não correr o risco de falhar.",
        profile: "IF",
        points: 3,
      },
      {
        text: "Eu troco o que quero no futuro por qualquer coisa que alivie o desconforto agora.",
        profile: "SE",
        points: 3,
      },
      {
        text: "Eu amo recomeçar porque continuar sem empolgação me obriga a encarar quem eu sou de verdade.",
        profile: "FE",
        points: 3,
      },
      {
        text: "Minha confiança vai voltar quando minha palavra começar a valer de novo nas pequenas coisas.",
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
      "VOCÊ NÃO ESTÁ COM FALTA DE PLANO. ESTÁ USANDO O PLANO PARA NÃO ENCOSTAR NA EXECUÇÃO.",
    text:
      "Até aqui já apareceu uma coisa feia: Você planeja para sentir que está avançando. Adia para sentir alívio. E recomeça para fingir que o abandono anterior nunca aconteceu. Agora vamos descobrir onde sua palavra começou a perder valor.",
    button: "CONTINUAR O CONFRONTO",
  },
  {
    afterQuestion: 8,
    title: "AGORA A DESCULPA COMEÇOU A FEDER.",
    text: "Você chama de planejamento.\n\nDe cansaço.\n\nDe perfeccionismo.\n\nDe falta de tempo.\n\nMas o resultado é sempre o mesmo:\n\nA tarefa continua parada e sua confiança em você mesma continua apodrecendo.\n\nA próxima parte mostra o preço dessa merda.",
    button: "MOSTRAR O ESTRAGO",
  },
  {
    afterQuestion: 12,
    title: "FALTAM DUAS.\n\nE NÃO ADIANTA ESCOLHER A RESPOSTA BONITA.",
    text: "Você passou anos explicando por que não começou.\n\nPor que não terminou.\n\nPor que dessa vez foi diferente.\n\nAgora escolha o que você realmente faz.\n\nNão o que gostaria de postar que faz.",
    button: "ARRANCAR A ÚLTIMA DESCULPA",
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
  const [hasRestoredProgress, setHasRestoredProgress] = useState(false);

  const restartQuiz = useCallback(() => {
    if (window.confirm("Isso apagará suas respostas e reiniciará o confronto. Continuar?")) {
      localStorage.removeItem(STORAGE_KEY);
      setStep("intro");
      setFormData({ name: "", contact: "" });
      setCurrentQuestion(0);
      setSelectedOption(null);
      setAnswers([]);
      setScores({ ML: 0, IF: 0, SE: 0, FE: 0 });
      setRegulatedCount(0);
      setPrimaryResult(null);
      setSecondaryResult(null);
      setActiveTransition(null);
    }
  }, []);

  // RESTAURAÇÃO
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const progress = JSON.parse(saved) as QuizProgress;
        if (progress && typeof progress === "object" && progress.step) {
          setStep(progress.step);
          setCurrentQuestion(progress.currentQuestion ?? 0);
          setSelectedOption(progress.selectedOption ?? null);
          setAnswers(progress.answers ?? []);
          setScores(progress.scores ?? { ML: 0, IF: 0, SE: 0, FE: 0 });
          setRegulatedCount(progress.regulatedCount ?? 0);
          setPrimaryResult(progress.primaryResult ?? null);
          setSecondaryResult(progress.secondaryResult ?? null);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHasRestoredProgress(true);
  }, []);

  // SALVAMENTO
  useEffect(() => {
    if (hasRestoredProgress) {
      const progress: QuizProgress = {
        step,
        currentQuestion,
        selectedOption,
        answers,
        scores,
        regulatedCount,
        primaryResult,
        secondaryResult
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [step, currentQuestion, selectedOption, answers, scores, regulatedCount, primaryResult, secondaryResult, hasRestoredProgress]);

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
    <div className="min-h-screen bg-[#090909] text-[#F2EDE5] font-sans selection:bg-[#9B2636] selection:text-white">
      <main className="mx-auto w-full max-w-[520px] px-6 py-12 sm:px-8 sm:py-16">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-left"
            >
              <span className="block text-[11px] sm:text-[12px] font-sans font-bold uppercase tracking-wider text-[#A8283D]">
                QUIZ DE AUTOSSABOTAGEM
              </span>

              <h1 className="mt-4 font-serif font-bold text-[#F2EDE5] text-[clamp(42px,12vw,62px)] leading-[0.92] tracking-[-0.04em]">
                DESTRUINDO HÁBITOS PODRES™
              </h1>

              <h2 className="mt-6 font-sans font-bold text-[#F2EDE5] text-[21px] sm:text-[27px] leading-[1.12]">
                365 hábitos para quem monta uma vida nova toda segunda-feira e enterra a porra toda antes de chegar no fim da semana.
              </h2>

              <p className="mt-7 max-w-[42ch] text-[17px] leading-[1.55] text-[#AAA39B]">
                Antes de montar outra rotina perfeita e abandonar tudo três dias depois, descubra qual hábito podre está mantendo sua procrastinação viva.
              </p>

              <button 
                onClick={() => setStep("quiz")} 
                className="mt-8 w-full min-h-[56px] sm:min-h-[60px] px-5 py-4 rounded-md bg-[#A8283D] text-white text-center text-[15px] leading-5 font-black uppercase tracking-tight hover:brightness-110 transition-all active:scale-[0.98] outline-none"
              >
                DESCOBRIR MEU HÁBITO PODRE
              </button>

              <div className="mt-4 space-y-2 text-left">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#AAA39B]">
                  14 situações reais • menos de 4 minutos
                </p>
                <p className="text-[11px] leading-4 text-[#AAA39B]/60">
                  Isso não é avaliação psicológica ou médica.
                </p>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl space-y-10 px-4 md:px-0">
               <div className="flex justify-between items-center">
                 <button onClick={restartQuiz} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-[#8f2f3f] transition-colors font-black">
                   <RotateCcw className="w-3 h-3" />
                   RECOMEÇAR O CONFRONTO
                 </button>
               </div>
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
                        {selectedOption.profile === "ML" && "“Você não está organizando a execução. Está decorando a fuga.”"}
                        {selectedOption.profile === "IF" && "“Perfeccionismo é medo com vocabulário bonito.”"}
                        {selectedOption.profile === "SE" && "“Você compra alguns minutos de alívio e paga com dias de culpa.”"}
                        {selectedOption.profile === "FE" && "“Recomeçar dá esperança. Continuar é o que realmente muda a vida.”"}
                        {selectedOption.profile === "ER" && "“Autoestima também é conseguir acreditar no que você promete para si.”"}
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
            <div className="text-left space-y-12 max-w-[520px]">
              <div className="relative">
                <div className="w-16 h-16 border border-white/5 border-t-[#A8283D] rounded-full animate-spin" />
              </div>
              
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#A8283D]">1.</span>
                  <p className="text-xl font-bold italic uppercase tracking-tight text-white">Você respondeu 14 situações.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className="space-y-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#A8283D]">2.</span>
                  <p className="text-xl font-bold italic uppercase tracking-tight text-white">Algumas desculpas apareceram mais vezes do que deveriam.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.5 }}
                  className="space-y-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#A8283D]">3.</span>
                  <p className="text-xl font-bold italic uppercase tracking-tight text-white">Estamos cruzando como você planeja, adia, abandona e recomeça.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.5 }}
                  className="space-y-2"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#A8283D]">4.</span>
                  <p className="text-xl font-bold italic uppercase tracking-tight text-white">O hábito podre que mais destrói sua palavra apareceu.</p>
                </motion.div>
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
                    placeholder="Para onde enviamos seu resultado?"
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
                      name: "A ARQUITETA DE SEGUNDA-FEIRA",
                      headline: "VOCÊ PLANEJA UMA VIDA FODA. E EXECUTA uma desculpa por dia.",
                      headline_l1: "VOCÊ PLANEJA UMA VIDA FODA.",
                      headline_l2: "E EXECUTA UMA DESCULPA POR DIA.",
                      desc: "Você sabe montar rotina. Criar lista. Organizar aplicativo. Escolher horário. Separar material. O problema começa quando planejar precisa virar execução. Enquanto estrutura tudo, você sente que está avançando. Mas no final do dia a tarefa importante continua intacta. Você não está sem capacidade. Está usando organização para fugir da parte em que pode falhar.",
                      pattern: "“Eu só preciso me organizar melhor.”",
                      price: "Projetos que nunca passam da preparação. Dias inteiros ocupados sem nada realmente importante concluído. E uma autoestima que não entende por que você trabalha tanto e continua parada.",
                      confront: "Durante sete dias, você está proibida de criar um sistema novo antes de executar dez minutos da tarefa principal. Primeiro faz. Depois organiza.",
                      punch: "Seu próximo plano não precisa ser melhor. Precisa sobreviver à primeira terça-feira.",
                      cta: "PARAR DE DECORAR A MINHA FUGA",
                      icon: <ShieldAlert className="w-12 h-12 text-[#A8283D]" />
                    },
                    IF: {
                      name: "A PERFECCIONISTA PARALISADA",
                      headline: "VOCÊ CHAMA DE PERFECCIONISMO. MUITAS VEZES É MEDO USANDO ROUPA BONITA.",
                      headline_l1: "VOCÊ CHAMA DE PERFECCIONISMO.",
                      headline_l2: "MUITAS VEZES É MEDO USANDO ROUPA BONITA.",
                      desc: "Você não adia porque não se importa. Você adia porque se importa tanto com o resultado que prefere não produzir nada a produzir algo imperfeito. Espera segurança. Clareza. Preparação. Confiança. E enquanto espera se sentir pronta, a vida continua andando sem você.",
                      pattern: "“Eu começo quando souber fazer direito.”",
                      price: "Experiência que só viria depois da prática. Confiança que só nasceria depois da exposição. E projetos que morrem perfeitos dentro da sua cabeça.",
                      confront: "Escolha uma tarefa e produza deliberadamente a primeira versão mais simples e imperfeita possível. Não corrija enquanto estiver criando.",
                      punch: "A perfeição não está protegendo seu talento. Está impedindo que ele exista fora da sua cabeça.",
                      cta: "PARAR DE USAR PERFEIÇÃO COMO ESCONDERIJO",
                      icon: <Brain className="w-12 h-12 text-[#A8283D]" />
                    },
                   SE: {
                     name: "A VICIADA EM ALÍVIO IMEDIATO",
                     headline: "VOCÊ TROCA O PRÓPRIO FUTURO POR ALGUNS MINUTOS DE ALÍVIO.",
                     headline_l1: "VOCÊ TROCA O PRÓPRIO FUTURO",
                     headline_l2: "POR ALGUNS MINUTOS DE ALÍVIO.",
                     desc: "A tarefa aperta.\n\nVocê pega o celular.\n\nA ansiedade aparece.\n\nVocê procura comida, vídeo, conversa ou qualquer coisa que tire aquela sensação por alguns minutos.\n\nO alívio chega rápido.\n\nA culpa chega logo depois.\n\nVocê não é incapaz de fazer.\n\nSó treinou sua cabeça a fugir toda vez que alguma coisa fica desconfortável.",
                     pattern: "“Eu descanso só um pouco e depois começo.”",
                     price: "Horas que desaparecem.\n\nPrazos que viram emergência.\n\nE a confiança de que você consegue suportar desconforto sem fugir imediatamente.",
                     confront: "Antes de qualquer distração, faça dois minutos da tarefa que está evitando.\n\nO alívio deixa de ser a primeira resposta.",
                     punch: "Você não precisa amar a tarefa.\n\nPrecisa parar de fugir no primeiro desconforto.",
                     cta: "PARAR DE COMPRAR ALÍVIO COM O MEU FUTURO",
                     icon: <Sparkles className="w-12 h-12 text-[#8f2f3f]" />
                   },
                   FE: {
                     name: "A RECOMEÇADORA COMPULSIVA",
                     headline: "VOCÊ NÃO APRENDEU A CONTINUAR. SÓ FICOU MUITO BOA EM RECOMEÇAR.",
                     headline_l1: "VOCÊ NÃO APRENDEU A CONTINUAR.",
                     headline_l2: "SÓ FICOU MUITO BOA EM RECOMEÇAR.",
                     desc: "Você ama a energia do primeiro dia.\n\nA agenda limpa.\n\nA promessa nova.\n\nA sensação de que agora vai.\n\nMas basta uma falha para transformar o plano inteiro em lixo.\n\nVocê não retoma.\n\nVocê espera outra segunda-feira, outro mês ou outra versão de si mesma.\n\nRecomeçar mantém a fantasia viva.\n\nContinuar exige aceitar que mudança real é feia, repetitiva e imperfeita.",
                     pattern: "“Já estraguei hoje. Amanhã começo direito.”",
                     price: "Constância.\n\nConfiança.\n\nE qualquer resultado que precise sobreviver depois que a empolgação termina.",
                     confront: "Quando falhar, retome na próxima ação disponível.\n\nSem nova data.\n\nSem nova rotina.\n\nSem cerimônia.",
                     punch: "Um dia ruim não destrói seu progresso.\n\nO funeral que você organiza depois dele destrói.",
                     cta: "PARAR DE ENTERRAR TUDO DEPOIS DE UM ERRO",
                     icon: <X className="w-12 h-12 text-[#8f2f3f]" />
                   },
                    ER: {
                      name: "A MULHER QUE ESTÁ RECONSTRUINDO A PRÓPRIA PALAVRA",
                      headline: "VOCÊ ESTÁ COMEÇANDO A PROVAR QUE SUA PALAVRA AINDA VALE ALGUMA COISA.",
                      headline_l1: "VOCÊ ESTÁ COMEÇANDO A PROVAR",
                      headline_l2: "QUE SUA PALAVRA AINDA VALE ALGUMA COISA.",
                      desc: "Suas respostas mostram que você já consegue começar sem motivação perfeita.\n\nRetomar depois de falhar.\n\nFazer uma versão pequena.\n\nE continuar mesmo quando a novidade acaba.\n\nIsso não significa que a autossabotagem desapareceu.\n\nSignifica que ela já não consegue convencer você com qualquer desculpa barata.",
                      pattern: "“Quando eu escorrego, ainda sinto vontade de voltar aos hábitos antigos.”",
                      price: "A sequência de pequenas promessas cumpridas.\n\nÉ ela que está reconstruindo sua confiança.\n\nE é ela que precisa ser protegida quando o cansaço, a pressão e a vontade de desistir voltarem.",
                      confront: "Identifique qual desculpa antiga reaparece primeiro nos dias ruins.\n\nCrie uma resposta pequena, específica e impossível de negociar para ela.",
                      punch: "Sua autoestima não precisa de outro discurso.\n\nPrecisa de mais provas de que você faz o que diz.",
                      cta: "FAZER MINHA PALAVRA VALER DE NOVO",
                      icon: <CheckCircle className="w-12 h-12 text-[#8f2f3f]" />
                    }
                 };

                 const result = content[resCode] || content.ER;

                 return (
                    <div className="space-y-16">
                      <div className="flex justify-center">
                        <button onClick={restartQuiz} className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 hover:text-[#8f2f3f] transition-colors font-black">
                          <RotateCcw className="w-3 h-3" />
                          RECOMEÇAR O CONFRONTO
                        </button>
                      </div>
                      <header className="space-y-6 text-left">
                         <span className="text-[11px] font-black uppercase tracking-widest text-[#A8283D]">Seu Perfil Revelado</span>
                         <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-[0.9] tracking-tighter">
                           {result.name}
                         </h2>
                         {secondaryResult && (
                           <div className="space-y-1 mt-6">
                             <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8283D] font-black">VOCÊ TAMBÉM CARREGA UM SEGUNDO HÁBITO PODRE:</p>
                             <p className="text-lg md:text-xl text-white/50 font-black italic uppercase tracking-tighter">
                               {PROFILE_NAMES[secondaryResult]}
                             </p>
                             <p className="text-sm text-white/30 italic max-w-md">
                               Ele não manda em você o tempo inteiro.
                               Mas costuma aparecer quando a pressão aumenta e sua disciplina diminui.
                             </p>
                           </div>
                         )}
                         <div className="pt-6 space-y-1">
                            <p className="text-2xl md:text-4xl text-white font-black italic uppercase leading-none tracking-tighter">
                              {result.headline_l1 || result.headline}
                            </p>
                            {result.headline_l2 && (
                              <p className="text-2xl md:text-4xl text-[#A8283D] font-black italic uppercase leading-none tracking-tighter">
                                {result.headline_l2}
                              </p>
                            )}
                         </div>
                      </header>

                     <div className="grid md:grid-cols-2 gap-8">
                       <div className="surface-noir p-8 rounded-3xl space-y-6 border-[#8f2f3f]/20">
                         <div className="flex items-center gap-4">
                           {result.icon}
                            <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">O TEXTO PRINCIPAL</h4>
                          </div>
                          <p className="text-white/70 leading-relaxed italic whitespace-pre-line">{result.desc}</p>
                         <div className="pt-6 border-t border-white/5 space-y-4">
                             <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8283D] font-black">A DESCULPA PODRE</p>
                             <p className="text-white font-bold italic text-lg">{result.pattern}</p>
                         </div>
                       </div>

                       <div className="space-y-8">
                         <div className="p-8 bg-white/5 rounded-3xl space-y-4 border border-white/5">
                             <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8283D] font-black">O QUE ELA ESTÁ ENTERRANDO</p>
                             <p className="text-white/80 italic">{result.price}</p>
                         </div>
                         <div className="p-8 bg-[#8f2f3f]/5 rounded-3xl space-y-4 border border-[#8f2f3f]/10">
                             <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4726a] font-black">PRIMEIRA DESTRUIÇÃO</p>
                             <p className="text-white/80 italic">{result.confront}</p>
                         </div>
                       </div>
                     </div>

                     <div className="text-center space-y-10 py-10">
                        <p className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                          {result.punch}
                        </p>
                        <div className="ember-rule" />
                     </div>

                     <section className="space-y-8 py-10">
                        <div className="text-center">
                          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">TRÊS RESPOSTAS QUE ENTREGARAM SUA AUTOSSABOTAGEM</h3>
                        </div>
                        <div className="grid gap-4">
                          {(() => {
                             const primaryAnswers = answers.filter(a => a.profile === primaryResult);
                             let displayedAnswers: DisplayedAnswer[] = primaryAnswers.map(a => ({...a, label: "VOCÊ ADMITIU QUE:"}));
                             
                             if (primaryResult === "ER") {
                               const regulated = answers.filter(a => a.regulated);
                               const nonRegulated = answers.filter(a => !a.regulated);
                               displayedAnswers = regulated.map(a => ({...a, label: "VOCÊ ADMITIU QUE:"}));
                               if (displayedAnswers.length < 3) {
                                 nonRegulated.forEach(item => {
                                   if (displayedAnswers.length < 3 && !displayedAnswers.find(da => da.questionId === item.questionId)) {
                                     displayedAnswers.push({...item, label: "UMA DESCULPA QUE AINDA TENTA VOLTAR:"});
                                   }
                                 });
                               }
                             } else {
                               if (displayedAnswers.length < 3 && secondaryResult) {
                                 answers.filter(a => a.profile === secondaryResult).forEach(item => {
                                   if (displayedAnswers.length < 3 && !displayedAnswers.find(da => da.questionId === item.questionId)) {
                                     displayedAnswers.push({...item, label: "OUTRO HÁBITO QUE APARECEU:"});
                                   }
                                 });
                               }
                               if (displayedAnswers.length < 3) {
                                 answers.filter(a => a.profile !== primaryResult && a.profile !== secondaryResult && !a.regulated).forEach(item => {
                                   if (displayedAnswers.length < 3 && !displayedAnswers.find(da => da.questionId === item.questionId)) {
                                     displayedAnswers.push({...item, label: "UMA DESCULPA QUE AINDA TENTA VOLTAR:"});
                                   }
                                 });
                               }
                             }

                             return displayedAnswers.slice(0, 3).map((ans) => (
                               <div key={ans.questionId} className="surface-noir p-6 rounded-2xl border-white/5 space-y-2">
                                 <p className="text-sm text-white/40 uppercase tracking-widest font-bold">
                                   {ans.label}
                                 </p>
                                 <p className="text-white italic text-lg leading-tight">“{ans.answer}”</p>
                               </div>
                             ));
                          })()}
                        </div>
                     </section>

                     <section className="space-y-12 py-10">
                       <div className="space-y-6">
                         <p className="text-sm text-[#A8283D] font-black uppercase tracking-[0.2em]">VOCÊ DESCOBRIU QUAL HÁBITO PODRE ESTÁ NO COMANDO</p>
                         <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                           SABER O NOME DA MERDA NÃO FAZ ELA DESAPARECER.
                         </h3>
                         <div className="space-y-4 text-lg md:text-xl text-white/70 italic max-w-2xl">
                           <p>Você já sabe se costuma planejar sem executar, esperar perfeição, fugir para o alívio ou abandonar tudo depois de um erro.</p>
                           <p>Mas reconhecer o ciclo é só o começo.</p>
                           <p>Porque amanhã sua cabeça vai apresentar a mesma desculpa com outra roupa.</p>
                           <p>E se você não tiver uma ação prática para usar no lugar, vai acreditar nela de novo.</p>
                         </div>
                       </div>

                       <div className="space-y-8 pt-10 border-t border-white/5">
                         <div className="space-y-2">
                           <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none">
                             DESTRUINDO HÁBITOS PODRES™
                           </h2>
                           <p className="text-xl md:text-2xl text-[#A8283D] font-black italic uppercase tracking-tighter">
                             365 hábitos para quem monta uma vida nova toda segunda-feira e enterra a porra toda antes de chegar no fim da semana.
                           </p>
                         </div>
                         
                         <div className="space-y-4 text-lg md:text-xl text-white/70 italic max-w-2xl">
                           <p>Não é uma coleção de frases bonitas para salvar e esquecer.</p>
                           <p>É uma apostila de aplicação diária criada para substituir pequenas sabotagens por pequenas ações que você consegue cumprir.</p>
                           <p>Um hábito por dia.</p>
                           <p>Uma desculpa por vez.</p>
                           <p>Uma prova pequena de que sua palavra ainda pode valer alguma coisa.</p>
                         </div>
                       </div>

                       <div className="space-y-12 pt-10 border-t border-white/5">
                         <div className="space-y-6">
                           <p className="text-sm text-[#A8283D] font-black uppercase tracking-[0.2em]">O QUE VOCÊ ESTÁ COMPRANDO DE VERDADE</p>
                           <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                             PARAR DE QUEBRAR A PRÓPRIA PALAVRA E VOLTAR A CONFIAR EM SI.
                           </h3>
                           <div className="space-y-4 text-lg md:text-xl text-white/70 italic max-w-2xl">
                             <p>A procrastinação não destrói somente tarefas.</p>
                             <p>Toda promessa quebrada também ensina você a confiar menos em si mesma.</p>
                             <p>Cada “amanhã eu começo”.</p>
                             <p>Cada plano abandonado.</p>
                             <p>Cada tarefa simples transformada em mais uma semana de culpa.</p>
                             <p>A apostila foi construída para interromper esse ciclo com pequenas ações cumpridas de verdade.</p>
                             <p>Não com motivação.</p>
                             <p>Não com rotina perfeita.</p>
                             <p>Com provas.</p>
                           </div>
                         </div>

                         <div className="space-y-6 pt-10 border-t border-white/5">
                           <p className="text-sm text-[#A8283D] font-black uppercase tracking-[0.2em]">O MECANISMO</p>
                           <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                             ROTA DE DESTRUIÇÃO™
                           </h3>
                           <div className="space-y-4 text-lg md:text-xl text-white/70 italic max-w-2xl">
                             <p>Você não precisa abrir uma apostila com 365 hábitos e tentar fazer tudo de uma vez.</p>
                             <p>Isso seria só outra rotina perfeita esperando para ser enterrada.</p>
                             <p>O resultado do quiz mostra qual hábito podre aparece mais na sua vida.</p>
                             <p>A partir dele, você começa pela rota correspondente.</p>
                             <p>Um hábito por dia.</p>
                             <p>Uma ação pequena.</p>
                             <p>Uma prova de que sua palavra ainda pode valer alguma coisa.</p>
                           </div>
                         </div>

                         <div className="space-y-4 pt-10 text-left">
                           <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                             VOCÊ NÃO PRECISA FAZER 365 COISAS.
                           </h3>
                           <p className="text-2xl md:text-4xl text-[#A8283D] font-black italic uppercase tracking-tighter">
                             PRECISA PARAR DE REPETIR A MESMA COISA PODRE TODOS OS DIAS.
                           </p>
                         </div>

                         <div className="space-y-12 pt-10 border-t border-white/5">
                           <div className="space-y-4 pb-8 border-b border-white/5">
                             <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">ROTA 01: DESTRUIR O PLANEJAMENTO QUE NÃO EXECUTA</h4>
                             <p className="text-sm text-[#A8283D] font-black uppercase tracking-widest">Para a Arquiteta de Segunda-Feira.</p>
                             <p className="text-white/70 italic text-lg">73 hábitos para parar de usar planner, lista, aplicativo e organização como substitutos da execução. Ações para começar antes de deixar o planejamento virar mais uma fuga bem decorada.</p>
                           </div>

                           <div className="space-y-4 pb-8 border-b border-white/5">
                             <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">ROTA 02: DESTRUIR A PERFEIÇÃO QUE PARALISA</h4>
                             <p className="text-sm text-[#A8283D] font-black uppercase tracking-widest">Para a Perfeccionista Paralisada.</p>
                             <p className="text-white/70 italic text-lg">73 hábitos para produzir antes de se sentir pronta, aceitar primeiras versões imperfeitas e parar de enterrar projetos perfeitos dentro da cabeça.</p>
                           </div>

                           <div className="space-y-4 pb-8 border-b border-white/5">
                             <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">ROTA 03: DESTRUIR O VÍCIO EM ALÍVIO IMEDIATO</h4>
                             <p className="text-sm text-[#A8283D] font-black uppercase tracking-widest">Para a Viciada em Alívio Imediato.</p>
                             <p className="text-white/70 italic text-lg">73 hábitos para interromper celular, distração, fuga e conforto rápido antes que alguns minutos de alívio virem mais uma semana de culpa.</p>
                           </div>

                           <div className="space-y-4 pb-8 border-b border-white/5">
                             <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">ROTA 04: DESTRUIR O RECOMEÇO COMPULSIVO</h4>
                             <p className="text-sm text-[#A8283D] font-black uppercase tracking-widest">Para a Recomeçadora Compulsiva.</p>
                             <p className="text-white/70 italic text-lg">73 hábitos para retomar depois de falhar, continuar sem empolgação e parar de transformar um dia ruim no funeral de uma semana inteira.</p>
                           </div>

                           <div className="space-y-4 pb-8">
                             <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">ROTA 05: RECONSTRUIR A PRÓPRIA PALAVRA</h4>
                             <p className="text-sm text-[#A8283D] font-black uppercase tracking-widest">Para a Mulher que Está Reconstruindo a Própria Palavra.</p>
                             <p className="text-white/70 italic text-lg">73 hábitos para criar constância, proteger pequenas promessas cumpridas e construir uma autoestima baseada em evidência.</p>
                           </div>
                         </div>

                         <div className="space-y-6 pt-10 border-t border-white/5">
                           <h3 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
                             73 HÁBITOS POR ROTA.
                           </h3>
                           <p className="text-2xl md:text-4xl text-[#A8283D] font-black italic uppercase tracking-tighter leading-tight">
                             365 FORMAS DE PARAR DE COLABORAR COM A PRÓPRIA ESTAGNAÇÃO.
                           </p>
                           <div className="space-y-4 text-lg md:text-xl text-white/70 italic max-w-2xl">
                             <p>Você começa pela rota indicada no resultado do quiz. Depois avança pelas outras conforme os hábitos antigos forem perdendo força.</p>
                             <p>A apostila não exige perfeição. Exige uma ação possível hoje.</p>
                           </div>
                         </div>
                       </div>

                       {/* TODO: adicionar entregáveis complementares, preço e checkout após validação desta seção. */}
                       
                       <div className="pt-10 border-t border-white/5">
                         <p className="text-sm text-white/30 italic">
                           Os materiais complementares e a condição de acesso entram na próxima etapa.
                         </p>
                       </div>
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