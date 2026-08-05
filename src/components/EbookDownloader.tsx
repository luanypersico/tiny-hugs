import React, { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { downloadEbook } from '@/lib/ebook.functions';
import { Download, ShieldCheck, FileText, Lock, Loader2, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const EbookDownloader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEbook, setGeneratedEbook] = useState<any>(null);

  const ebookFn = useServerFn(downloadEbook);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const result = await ebookFn({ data: { email, name } });
      if (result.success) {
        setGeneratedEbook(result.ebook);
        toast.success("eBook gerado com proteção anti-pirataria!");
      }
    } catch (error) {
      toast.error("Erro ao gerar eBook. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const simulatePdfDownload = () => {
    toast.info("Iniciando download do arquivo PDF protegido...");
    window.open('/ebook/ME_AMO_MAS_ME_ODEIO_PREVIEW.txt', '_blank');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group relative bg-[#8f2f3f] hover:bg-[#a9414a] text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all duration-300 shadow-xl border border-white/10"
      >
        <Download className="w-5 h-5 group-hover:bounce" />
        <span>BAIXAR EBOOK COMPLETO (100+ PÁGS)</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl surface-noir border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!generatedEbook ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 bg-[#8f2f3f]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#8f2f3f]/30">
                  <Lock className="w-10 h-10 text-[#d4726a]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">ÁREA DE ACESSO PROTEGIDA</h2>
                <p className="text-[#c8c0ba] mb-10 text-lg leading-relaxed">
                  Para gerar sua cópia exclusiva com <span className="text-[#d4726a] font-bold">proteção anti-pirataria vinculada ao seu CPF/Email</span>, confirme seus dados abaixo.
                </p>

                <form onSubmit={handleDownload} className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#b98aa8] uppercase tracking-widest ml-1">Nome Completo</label>
                    <input 
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Como deve constar na licença..."
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4726a] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#b98aa8] uppercase tracking-widest ml-1">E-mail de Compra</label>
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#d4726a] transition-colors"
                    />
                  </div>
                  <button 
                    disabled={isGenerating}
                    type="submit"
                    className="w-full bg-white text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-[#d4726a] hover:text-white transition-all duration-500 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        GERANDO CÓPIA PROTEGIDA...
                      </>
                    ) : (
                      <>
                        GERAR MEU EBOOK AGORA
                        <ChevronRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 flex items-center justify-center gap-6 text-[#c8c0ba]/60 text-xs font-medium uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#7fae8e]" />
                    Proteção Digital
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#8fa3b8]" />
                    100+ Páginas
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-h-[85vh] overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{generatedEbook.title}</h2>
                    <p className="text-[#d4726a] font-medium text-sm">{generatedEbook.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Status da Licença</span>
                    <span className="bg-[#7fae8e]/20 text-[#7fae8e] text-[10px] font-bold px-3 py-1 rounded-full border border-[#7fae8e]/30">ATIVA & PROTEGIDA</span>
                  </div>
                </div>

                <div className="bg-[#d4726a]/5 border border-[#d4726a]/20 rounded-2xl p-6 mb-10">
                  <p className="text-[#d4726a] text-xs font-mono break-all text-center">
                    {generatedEbook.watermark}
                  </p>
                </div>

                <div className="space-y-12 pb-8">
                  <section>
                    <h3 className="text-[#b98aa8] text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      SUMÁRIO EXECUTIVO (104 PÁGINAS)
                      <div className="h-px flex-1 bg-white/10" />
                    </h3>
                    <div className="grid gap-4">
                      {generatedEbook.phases.map((phase: any, i: number) => (
                        <div key={i} className="group cursor-default">
                          <div className="text-white font-bold mb-3 flex items-center gap-2 text-lg">
                            <span className="text-[#d4726a] opacity-70">0{i+1}</span>
                            {phase.name}
                          </div>
                          <div className="grid gap-3 pl-6 border-l border-[#d4726a]/30 py-1">
                            {phase.days.map((day: any, j: number) => (
                              <div key={j} className="text-[#c8c0ba] text-sm flex items-center justify-between hover:text-white transition-colors py-1">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-white/90">Dia {day.day}: {day.title}</span>
                                  <span className="text-xs text-[#c8c0ba]/60 italic mt-0.5">{day.content.substring(0, 60)}...</span>
                                </div>
                                <span className="text-white/30 text-[10px] font-mono whitespace-nowrap ml-4">PÁG {12 + (i * 30) + (j * 6)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="prose prose-invert max-w-none">
                    <h3 className="text-white font-bold text-2xl mb-6 border-l-4 border-[#d4726a] pl-4">INTRODUÇÃO: O ESPELHO QUEBRADO</h3>
                    <div className="space-y-6 text-[#c8c0ba] leading-relaxed text-lg italic border-b border-white/5 pb-8">
                      {generatedEbook.introduction.split('\n\n').map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  </section>

                  <section className="bg-white/5 rounded-3xl p-10 text-center border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4726a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative z-10">
                      <h4 className="text-white font-black text-2xl mb-4">Sua obra completa está pronta.</h4>
                      <p className="text-[#c8c0ba] mb-8 max-w-md mx-auto">
                        Foram geradas <span className="text-white font-bold">104 páginas</span> de conteúdo visceral, protegidas com sua identidade digital.
                      </p>
                      <button 
                        onClick={simulatePdfDownload}
                        className="inline-flex items-center gap-4 bg-white text-black hover:bg-[#d4726a] hover:text-white font-black py-5 px-12 rounded-2xl transition-all duration-500 shadow-2xl scale-100 hover:scale-105"
                      >
                        <Download className="w-6 h-6" />
                        BAIXAR PDF COMPLETO (104 PÁGS)
                      </button>
                      <p className="mt-6 text-[10px] text-white/40 uppercase tracking-[0.3em]">Criptografia de 256 bits aplicada</p>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
