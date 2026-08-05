import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, CheckCircle } from "lucide-react";
import ShaderBackground from "@/components/ShaderBackground";
import Reveal from "@/components/Reveal";

const QUESTIONS = [
  {
    id: 1,
    question: "Quando alguém começa a gostar de você de verdade, qual é a sua reação mais comum?",
    options: [
      { label: "Eu viro a versão mais fácil, agradável e conveniente de mim mesma.", code: "ML", points: 3 },
      { label: "Começo a procurar defeitos na pessoa e motivos para não confiar.", code: "IF", points: 3 },
      { label: "Tento descobrir tudo o que a pessoa precisa para me tornar indispensável.", code: "SE", points: 3 },
      { label: "Sinto vontade de me afastar antes que a relação fique séria.", code: "FE", points: 3 },
      { label: "Continuo sendo eu mesma, comunico meus limites e deixo a conexão crescer no ritmo certo.", code: "ER", points: 0 },
    ],
  },
  {
    id: 2,
    question: "Quando você está emocionalmente destruída, o que costuma fazer?",
    options: [
      { label: "Sorrio, continuo ajudando todo mundo e digo que está tudo bem.", code: "ML", points: 3 },
      { label: "Eu me isolo e digo que só preciso da minha própria companhia.", code: "IF", points: 2 },
      { label: "Procuro alguém com um problema maior que o meu para tentar resolver.", code: "SE", points: 3 },
      { label: "Desapareço das conversas e evito explicar o que está acontecendo.", code: "FE", points: 3 },
      { label: "Reconheço que não estou bem e procuro apoio em alguém de confiança.", code: "ER", points: 0 },
    ],
  },
  {
    id: 3,
    question: "Quando surge um conflito em uma relação, você geralmente…",
    options: [
      { label: "Pede desculpas rapidamente, mesmo quando não fez nada errado.", code: "ML", points: 3 },
      { label: "Fica fria, racional e evita demonstrar que aquilo machucou.", code: "IF", points: 3 },
      { label: "Assume a responsabilidade de resolver o conflito pelas duas pessoas.", code: "SE", points: 2 },
      { label: "Corta o contato, demora para responder ou simplesmente desaparece.", code: "FE", points: 3 },
      { label: "Explica o que sentiu, escuta a outra pessoa e estabelece um limite claro.", code: "ER", points: 0 },
    ],
  },
  {
    id: 4,
    question: "Como você reage quando alguém demonstra carinho sem pedir nada em troca?",
    options: [
      { label: "Sinto que preciso retribuir imediatamente e fazer ainda mais pela pessoa.", code: "ML", points: 2 },
      { label: "Desconfio e começo a pensar no que a pessoa realmente quer de mim.", code: "IF", points: 3 },
      { label: "Uso isso como sinal de que devo cuidar, orientar ou salvar aquela pessoa.", code: "SE", points: 2 },
      { label: "Fico desconfortável e começo a perder o interesse.", code: "FE", points: 3 },
      { label: "Aceito o carinho sem sentir que preciso pagar por ele.", code: "ER", points: 0 },
    ],
  },
  {
    id: 5,
    question: "Por que você acredita que já se envolveu com pessoas emocionalmente indisponíveis?",
    options: [
      { label: "Porque eu achava que precisava me adaptar para finalmente ser escolhida.", code: "ML", points: 3 },
      { label: "Porque pessoas indisponíveis nunca conseguem chegar perto demais de mim.", code: "IF", points: 3 },
      { label: "Porque eu acreditava que conseguiria curar ou transformar aquela pessoa.", code: "SE", points: 3 },
      { label: "Porque era mais seguro desejar alguém que nunca exigiria presença emocional real.", code: "FE", points: 3 },
      { label: "Quando percebo indisponibilidade constante, eu me afasto e preservo meus limites.", code: "ER", points: 0 },
    ],
  },
  {
    id: 6,
    question: "Qual destas possibilidades assusta você mais?",
    options: [
      { label: "Decepcionar alguém e deixar de ser considerada uma pessoa boa.", code: "ML", points: 3 },
      { label: "Precisar emocionalmente de outra pessoa.", code: "IF", points: 3 },
      { label: "Descobrir que alguém consegue viver perfeitamente sem a minha ajuda.", code: "SE", points: 3 },
      { label: "Ser conhecida por inteiro e depois rejeitada.", code: "FE", points: 3 },
      { label: "Nenhuma delas controla minhas decisões como já controlou no passado.", code: "ER", points: 0 },
    ],
  },
  {
    id: 7,
    question: "Quando algo começa a dar certo na sua vida afetiva, você…",
    options: [
      { label: "Começa a esconder suas necessidades para não estragar a relação.", code: "ML", points: 3 },
      { label: "Procura sinais de perigo e imagina tudo o que pode dar errado.", code: "IF", points: 2 },
      { label: "Cria problemas para resolver e provar o seu valor.", code: "SE", points: 3 },
      { label: "Fica distante, demora para responder ou reduz o contato.", code: "FE", points: 3 },
      { label: "Tolera a insegurança inicial sem sabotar aquilo que está funcionando.", code: "ER", points: 0 },
    ],
  },
  {
    id: 8,
    question: "Qual frase parece ter sido arrancada de dentro da sua cabeça?",
    options: [
      { label: "“Eu não quero dar trabalho para ninguém.”", code: "ML", points: 3 },
      { label: "“Eu não preciso de ninguém.”", code: "IF", points: 3 },
      { label: "“Eu consigo consertar essa pessoa.”", code: "SE", points: 3 },
      { label: "“É melhor ir embora antes que piore.”", code: "FE", points: 3 },
      { label: "“Eu posso precisar de alguém sem abandonar quem eu sou.”", code: "ER", points: 0 },
    ],
  },
  {
    id: 9,
    question: "Depois de uma rejeição, qual é a sua reação mais comum?",
    options: [
      { label: "Tento descobrir o que deveria mudar em mim para ser escolhida.", code: "ML", points: 3 },
      { label: "Finjo que não me importo e tento apagar qualquer sentimento.", code: "IF", points: 3 },
      { label: "Tento provar que a pessoa perdeu alguém incrível.", code: "SE", points: 2 },
      { label: "Fecho todas as portas e evito novas conexões por muito tempo.", code: "FE", points: 3 },
      { label: "Permito que a rejeição doa sem transformá-la em uma sentença sobre meu valor.", code: "ER", points: 0 },
    ],
  },
  {
    id: 10,
    question: "O que acontece quando você precisa estabelecer um limite?",
    options: [
      { label: "Eu digo “sim” para evitar culpa, discussão ou desapontamento.", code: "ML", points: 3 },
      { label: "Transformo o limite em uma muralha e não permito nenhuma aproximação.", code: "IF", points: 2 },
      { label: "Estabeleço o limite, mas volto atrás quando a pessoa demonstra sofrimento.", code: "SE", points: 3 },
      { label: "Eu desapareço porque explicar o limite parece difícil demais.", code: "FE", points: 3 },
      { label: "Digo “não” de maneira clara sem atacar a pessoa nem me abandonar.", code: "ER", points: 0 },
    ],
  },
  {
    id: 11,
    question: "O que você costuma chamar de independência?",
    options: [
      { label: "Resolver tudo sozinha para nunca incomodar ninguém.", code: "ML", points: 2 },
      { label: "Recusar apoio mesmo quando estou exausta.", code: "IF", points: 3 },
      { label: "Controlar todos os detalhes porque acredito que ninguém fará direito.", code: "SE", points: 2 },
      { label: "Evitar vínculos que possam exigir vulnerabilidade.", code: "FE", points: 3 },
      { label: "Ter autonomia sem precisar viver emocionalmente isolada.", code: "ER", points: 0 },
    ],
  },
  {
    id: 12,
    question: "Qual imagem você sente que precisa sustentar diante das outras pessoas?",
    options: [
      { label: "A mulher agradável, leve e que nunca cria problemas.", code: "ML", points: 3 },
      { label: "A mulher fria, forte e impossível de ferir.", code: "IF", points: 3 },
      { label: "A mulher que sempre sabe o que fazer e salva todo mundo.", code: "SE", points: 3 },
      { label: "A mulher desapegada que pode ir embora a qualquer momento.", code: "FE", points: 3 },
      { label: "Não preciso parecer perfeita para ser respeitada.", code: "ER", points: 0 },
    ],
  },
  {
    id: 13,
    question: "Quando você comete um erro, o que normalmente acontece?",
    options: [
      { label: "Eu me culpo, exagero no pedido de desculpas e tento compensar.", code: "ML", points: 3 },
      { label: "Crio justificativas para não precisar admitir que fui afetada.", code: "IF", points: 2 },
      { label: "Desvio minha atenção para os problemas de outra pessoa.", code: "SE", points: 2 },
      { label: "Abandono o projeto, a conversa ou a relação por vergonha.", code: "FE", points: 3 },
      { label: "Assumo o erro, reparo o que for possível e continuo avançando.", code: "ER", points: 0 },
    ],
  },
  {
    id: 14,
    question: "Qual confronto você mais precisa viver neste momento?",
    options: [
      { label: "Parar de pedir permissão para existir e decepcionar algumas pessoas.", code: "ML", points: 4 },
      { label: "Admitir que existe medo escondido debaixo da minha armadura.", code: "IF", points: 4 },
      { label: "Parar de salvar todo mundo para finalmente cuidar da minha própria vida.", code: "SE", points: 4 },
      { label: "Continuar presente quando minha vontade automática é fugir.", code: "FE", points: 4 },
      { label: "Consolidar a mulher que estou construindo sem voltar aos padrões antigos.", code: "ER", points: 0 },
    ],
  },
];

const TRANSITIONS = [
  { after: 4, title: "A primeira máscara já caiu.", text: "Até aqui, você respondeu sobre aquilo que mostra para os outros. Agora vamos entrar no padrão que você tenta esconder até de si mesma." },
  { after: 8, title: "Seu padrão já apareceu.", text: "Talvez você ainda esteja tentando justificar algumas respostas. Continue. A parte que mais incomoda geralmente é a que mais precisa ser observada." },
  { after: 12, title: "Faltam duas perguntas.", text: "Você já passou da parte confortável. Agora responda sem escolher aquilo que parece bonito. Escolha aquilo que acontece de verdade." }
];

export default function QuizLanding() {
  const [step, setStep] = useState<"intro" | "quiz" | "transition" | "processing" | "lead" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ ML: 0, IF: 0, SE: 0, FE: 0, ER: 0 });
  const [activeTransition, setActiveTransition] = useState<any>(null);

  const handleAnswer = (option: any) => {
    setScores(prev => ({ ...prev, [option.code]: (prev as any)[option.code] + option.points }));
    
    const nextQ = currentQuestion + 1;
    const transition = TRANSITIONS.find(t => t.after === nextQ);

    if (transition) {
      setActiveTransition(transition);
      setStep("transition");
    } else if (nextQ >= QUESTIONS.length) {
      setStep("processing");
      setTimeout(() => setStep("lead"), 3000);
    } else {
      setCurrentQuestion(nextQ);
    }
  };

  const getResult = () => {
    const { ML, IF, SE, FE } = scores;
    const max = Math.max(ML, IF, SE, FE);
    if (scores.ER >= 8 || (ML + IF + SE + FE) <= 10) return "ER";
    
    // Find highest
    const profiles = [{code: "ML", val: ML}, {code: "IF", val: IF}, {code: "SE", val: SE}, {code: "FE", val: FE}];
    const sorted = profiles.sort((a,b) => b.val - a.val);
    return sorted[0]?.code || "ER";
  };

  return (
    <div className="relative min-h-screen bg-[#0a0807] text-[#c8c0ba] font-sans selection:bg-[#8f2f3f] selection:text-white">
      <ShaderBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-none tracking-tighter">QUAL PERSONAGEM EMOCIONAL ESTÁ SABOTANDO A SUA VIDA?</h1>
              <p className="text-xl italic text-white/70">Responda 14 perguntas e descubra o padrão que faz você se abandonar.</p>
              <button onClick={() => setStep("quiz")} className="bg-[#8f2f3f] text-white px-12 py-6 rounded-full text-xl uppercase font-black tracking-tighter hover:bg-[#a9414a] transition-all">COMEÇAR O CONFRONTO</button>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl space-y-8">
               <div className="text-center space-y-2">
                 <p className="text-xs uppercase tracking-widest text-[#8f2f3f] font-black">Nível de Autoengano</p>
                 <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                   <div className="h-full bg-[#8f2f3f]" style={{ width: `${(currentQuestion/QUESTIONS.length)*100}%` }} />
                 </div>
               </div>
               <h2 className="text-3xl font-black text-white italic uppercase">{QUESTIONS[currentQuestion]?.question}</h2>
               <div className="space-y-4">
                 {QUESTIONS[currentQuestion]?.options.map((opt: any, i: number) => (
                   <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-6 text-left border border-white/10 hover:border-[#8f2f3f] transition-all rounded-xl">{opt.label}</button>
                 ))}
               </div>
            </motion.div>
          )}

          {step === "transition" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8 max-w-xl">
              <h2 className="text-4xl font-black text-white uppercase italic">{activeTransition?.title}</h2>
              <p className="text-lg italic text-white/80">{activeTransition?.text}</p>
              <button onClick={() => { setStep("quiz"); setCurrentQuestion(currentQuestion + 1); }} className="bg-[#8f2f3f] px-12 py-4 rounded-full text-white uppercase font-black">CONTINUAR O CONFRONTO</button>
            </motion.div>
          )}

          {step === "processing" && (
            <div className="text-center">
              <h2 className="text-4xl font-black text-white italic">ANALISANDO A PERSONAGEM…</h2>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}