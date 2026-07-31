import { createFileRoute } from "@tanstack/react-router";
import AppLanding from "@/AppLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ME AMO, MAS ME ODEIO™ — 14 dias pra se confrontar" },
      {
        name: "description",
        content:
          "Processo de 14 dias pra quebrar a procrastinação emocional, encarar seus ciclos e sair do papel de 'mulher legal que sempre acaba sozinha'.",
      },
      { property: "og:title", content: "ME AMO, MAS ME ODEIO™ — 14 dias pra se confrontar" },
      {
        property: "og:description",
        content:
          "Não é um planner. É um processo de ressurreição em 14 dias pra parar de fingir.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://fimdosciclos.com/wp-content/uploads/2025/09/Design-sem-nome-40.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content:
          "https://fimdosciclos.com/wp-content/uploads/2025/09/Design-sem-nome-40.png",
      },
    ],
  }),
  component: AppLanding,
});
