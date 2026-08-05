import { createFileRoute } from "@tanstack/react-router";
import QuizLanding from "@/components/QuizLanding";

export const Route = createFileRoute("/desafioquiz")({
  head: () => ({
    meta: [
      { title: "QUIZ: O Fim da Personagem — ME AMO, MAS ME ODEIO™" },
      {
        name: "description",
        content:
          "Descubra qual o nível de sabotagem emocional que está travando sua vida em menos de 2 minutos.",
      },
      { property: "og:title", content: "QUIZ: O Fim da Personagem — ME AMO, MAS ME ODEIO™" },
      {
        property: "og:description",
        content:
          "Descubra qual o nível de sabotagem emocional que está travando sua vida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizLanding,
});
