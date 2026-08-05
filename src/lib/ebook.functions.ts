import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { EBOOK_CONTENT } from "./ebook-content.server";

/**
 * Gera o conteúdo do eBook com proteção anti-pirataria (watermark simulada).
 */
export const downloadEbook = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ 
    email: z.string().email(),
    name: z.string().min(2)
  }).parse(data))
  .handler(async ({ data }) => {
    // Simulando delay de geração de PDF protegido
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Injetando "Watermark" digital no conteúdo para proteção
    const protectedContent = {
      ...EBOOK_CONTENT,
      watermark: `Licenciado exclusivamente para: ${data.name} (${data.email}) - ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      generatedAt: new Date().toISOString()
    };

    return {
      success: true,
      ebook: protectedContent,
      message: "eBook gerado com sucesso e protegido com sua marca d'água digital."
    };
  });
