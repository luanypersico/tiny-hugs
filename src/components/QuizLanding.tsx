import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, CheckCircle, ShieldAlert, X, Brain } from "lucide-react";
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
  const [formData, setFormData] = useState({ name: "", contact: "" });
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
    <div className="relative min-h-screen bg-[#0a0807] text-[#c8c0ba] font-sans selection:bg-[#8f2f3f] selection:text-white overflow-x-hidden">
      <ShaderBackground />
      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-6 w-full max-w-full">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase leading-none tracking-tighter">QUAL PERSONAGEM EMOCIONAL ESTÁ SABOTANDO A SUA VIDA?</h1>
              <p className="text-xl italic text-white/70">Responda 14 perguntas e descubra o padrão que faz você se abandonar.</p>
              <button onClick={() => setStep("quiz")} className="w-full md:w-auto bg-[#8f2f3f] text-white px-10 md:px-12 py-5 md:py-6 rounded-full text-lg md:text-xl uppercase font-black tracking-tighter hover:bg-[#a9414a] transition-all active:scale-95 shadow-[0_0_30px_-5px_rgba(143,47,63,0.5)]">COMEÇAR O CONFRONTO</button>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl space-y-8 px-4 md:px-0">
               <div className="text-center space-y-2">
                 <p className="text-xs uppercase tracking-widest text-[#8f2f3f] font-black">Nível de Autoengano</p>
                 <div className="h-1 bg-white/10 w-full rounded-full overflow-hidden">
                   <div className="h-full bg-[#8f2f3f]" style={{ width: `${(currentQuestion/QUESTIONS.length)*100}%` }} />
                 </div>
               </div>
               <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase leading-tight">{QUESTIONS[currentQuestion]?.question}</h2>
               <div className="space-y-3 md:space-y-4">
                 {QUESTIONS[currentQuestion]?.options.map((opt: any, i: number) => (
                   <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-5 md:p-6 text-sm md:text-base text-left border border-white/10 hover:border-[#8f2f3f] transition-all rounded-xl active:scale-[0.98]">{opt.label}</button>
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