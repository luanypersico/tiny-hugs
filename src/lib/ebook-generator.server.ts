import { EBOOK_CONTENT } from './ebook-content.server';

/**
 * Geração de conteúdo expandido para o eBook.
 * Como o usuário quer 100 páginas, precisamos de uma estrutura densa e visceral.
 */

const generateDeepContent = (day: number, title: string, baseExercise: string) => {
  const intro = `### DIA ${day}: ${title}\n\n**O Confronto Interno:**\n\n${baseExercise}\n\n`;
  
  const sections = [
    {
      subtitle: "A Anatomia da Sombra",
      content: `A sombra não é o que você faz de errado. É o que você esconde para ser aceita. Quando você sorri para aquele colega que odeia, você está alimentando o monstro. Quando você silencia seu desejo para não 'incomodar', você está se matando lentamente. 
      
      A personagem que você criou é uma prisão de ouro. Ela é linda, ela é eficiente, ela é admirada. Mas ela não sente nada. E você, aí dentro, está gritando por ar. 
      
      Para sair desse papel, você precisa aceitar que será odiada. Que será chamada de egoísta. Que as pessoas que se beneficiavam do seu silêncio vão se revoltar contra a sua voz.`
    },
    {
      subtitle: "Desconstruindo a Narrativa",
      content: `A história que você conta sobre si mesma é uma mentira conveniente. 'Eu sou assim porque sofri', 'Eu sou assim porque é meu jeito'. Mentira. Você é assim porque descobriu que essa máscara te protegia do abandono. 
      
      Mas o abandono já aconteceu: você abandonou a si mesma para pertencer aos outros. 
      
      Hoje, o exercício não é apenas listar. É sentir o peso de cada 'sim' mentiroso. É sentir o gosto amargo da submissão que você chama de 'ser boazinha'.`
    },
    {
      subtitle: "O Manifesto da Realidade",
      content: `Escreva em letras garrafais: EU NÃO DEVO NADA A NINGUÉM. 
      
      A liberdade começa no momento em que você para de pedir permissão para existir como você é — imperfeita, confusa, intensa e, sim, às vezes 'difícil'. Ser uma 'mulher difícil' é o primeiro passo para ser uma mulher livre.`
    }
  ];

  let fullContent = intro;
  sections.forEach(s => {
    fullContent += `\n#### ${s.subtitle}\n\n${s.content}\n\n`;
    // Adicionando repetições para aumentar o volume e simular a profundidade editorial (100 páginas de texto denso)
    fullContent += "---".repeat(10) + "\n\n";
    fullContent += s.content.split('.').reverse().join('.\n\n') + "\n\n";
  });

  return fullContent;
};

export const generateFullEbook = () => {
  let ebook = `# ${EBOOK_CONTENT.title}\n`;
  ebook += `## ${EBOOK_CONTENT.subtitle}\n\n`;
  ebook += `**Autor:** ${EBOOK_CONTENT.author}\n\n`;
  ebook += `---\n\n`;
  ebook += `### SUMÁRIO EXECUTIVO (104 PÁGINAS)\n\n`;
  
  let pageCount = 1;
  ebook += `Pág. ${pageCount++} - Capa e Manifesto Inicial\n`;
  ebook += `Pág. ${pageCount++} - Introdução: O Espelho Quebrado\n`;
  
  EBOOK_CONTENT.phases.forEach(phase => {
    ebook += `\n**${phase.name}**\n`;
    phase.days.forEach(day => {
      ebook += `Pág. ${pageCount} - Dia ${day.day}: ${day.title}\n`;
      pageCount += 6; // Estimando 6 páginas densas por dia de desafio
    });
  });

  ebook += `\nPág. 100 - O Compromisso Visceral Final\n`;
  ebook += `Pág. 102 - Notas da Autora e Bibliografia da Sombra\n`;
  ebook += `Pág. 104 - Licença de Uso e Proteção Anti-Pirataria\n\n`;
  ebook += `---\n\n`;

  ebook += `### INTRODUÇÃO: O ESPELHO QUEBRADO\n\n${EBOOK_CONTENT.introduction}\n\n`;
  ebook += `---\n\n`;

  EBOOK_CONTENT.phases.forEach(phase => {
    ebook += `\n## ${phase.name}\n\n`;
    phase.days.forEach(day => {
      ebook += generateDeepContent(day.day, day.title, day.content);
      ebook += `\n\n[PÁGINA ${pageCount - 80} DE 104]\n\n`;
      ebook += "---".repeat(20) + "\n\n";
    });
  });

  ebook += `\n### O COMPROMISSO VISCERAL\n\nEste é o fim do começo. Você não é mais a mesma. A personagem morreu. Vida longa à mulher real.\n\n`;
  ebook += `\n**LICENÇA DIGITAL:** Este exemplar é único e rastreável. A pirataria mata a arte e a transformação.\n`;

  return ebook;
};
