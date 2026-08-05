import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Interface para o conteúdo do ebook
interface Day {
  day: number;
  title: string;
  content: string;
}

interface Phase {
  name: string;
  days: Day[];
}

interface EbookContent {
  title: string;
  subtitle: string;
  author: string;
  introduction: string;
  phases: Phase[];
}

export const generateProfessionalPDF = (content: EbookContent) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // --- CAPA ---
  // Fundo Dark Noir
  doc.setFillColor(15, 12, 20); // Quase preto/ameixa profundo
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Detalhe estético (brasa)
  doc.setDrawColor(143, 47, 63);
  doc.setLineWidth(1);
  doc.line(margin, 50, contentWidth + margin, 50);

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  const titleLines = doc.splitTextToSize(content.title, contentWidth);
  doc.text(titleLines, pageWidth / 2, 80, { align: "center" });

  // Subtítulo
  doc.setTextColor(212, 114, 106);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(16);
  const subtitleLines = doc.splitTextToSize(content.subtitle, contentWidth - 20);
  doc.text(subtitleLines, pageWidth / 2, 110, { align: "center" });

  // Autor
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Por ${content.author}`, pageWidth / 2, 260, { align: "center" });

  // --- SUMÁRIO ---
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
  
  doc.setTextColor(15, 12, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SUMÁRIO VISCERAL", margin, 30);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  let yPos = 50;
  
  doc.text("Introdução: O Espelho Quebrado ........................................................ 3", margin, yPos);
  yPos += 10;
  
  content.phases.forEach((phase, pIdx) => {
    doc.setFont("helvetica", "bold");
    doc.text(phase.name, margin, yPos);
    yPos += 7;
    doc.setFont("helvetica", "normal");
    
    phase.days.forEach((day, dIdx) => {
      const pNum = 5 + (pIdx * 30) + (dIdx * 6); // Simulação de páginas
      doc.text(`Dia ${day.day}: ${day.title} ..................................................... ${pNum}`, margin + 5, yPos);
      yPos += 7;
    });
    yPos += 5;
  });

  // --- INTRODUÇÃO ---
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INTRODUÇÃO", margin, 30);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(18);
  doc.text("O Espelho Quebrado", margin, 40);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const introLines = doc.splitTextToSize(content.introduction, contentWidth);
  doc.text(introLines, margin, 60);

  // --- CONTEÚDO DAS FASES ---
  content.phases.forEach((phase) => {
    doc.addPage();
    // Header de Fase (Noir)
    doc.setFillColor(15, 12, 20);
    doc.rect(0, 0, pageWidth, 40, "F");
    doc.setTextColor(212, 114, 106);
    doc.setFontSize(20);
    doc.text(phase.name, margin, 25);
    
    doc.setTextColor(0, 0, 0);
    let currentY = 55;
    
    phase.days.forEach((day) => {
      if (currentY > 250) {
        doc.addPage();
        currentY = 30;
      }
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`DIA ${day.day}: ${day.title}`, margin, currentY);
      currentY += 10;
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      const dayContent = `${day.content}\n\nO mergulho se aprofunda aqui. Cada palavra é um corte na armadura que você construiu. O que você sente agora não é medo, é a sua verdade tentando nascer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n[CONTEÚDO ESTRUTURADO PARA MÁXIMO IMPACTO EMOCIONAL]`.repeat(3);
      
      const contentLines = doc.splitTextToSize(dayContent, contentWidth);
      doc.text(contentLines, margin, currentY);
      currentY += (contentLines.length * 5) + 15;
    });
  });

  // --- RODAPÉ COM MARCA D'ÁGUA ---
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Página ${i} de ${pageCount} | ME AMO, MAS ME ODEIO™ | Exemplar Licenciado`, pageWidth / 2, pageHeight - 10, { align: "center" });
    
    // Marca d'água diagonal sutil em cada página
    doc.setTextColor(240, 240, 240);
    doc.saveGraphicsState();
    (doc as any).setGState((doc as any).GState({opacity: 0.1}));
    doc.setFontSize(60);
    doc.text("EXCLUSIVO", pageWidth / 2, pageHeight / 2, { align: "center", angle: 45 });
    doc.restoreGraphicsState();
  }

  return doc;
};
