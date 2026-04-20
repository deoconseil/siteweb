import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock invokeLLM
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    id: "test-id",
    created: Date.now(),
    model: "gemini-2.5-flash",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "DEO Conseil propose 6 expertises RH : Conseil en Stratégie RH, Coaching de Dirigeants, Formation & Développement, Conduite du Changement, Assessment & Talents, et Culture & Engagement.",
        },
        finish_reason: "stop",
      },
    ],
  }),
}));

import express from "express";
import request from "supertest";
import { chatRouter } from "./chat";

const app = express();
app.use(express.json());
app.use(chatRouter);

describe("POST /api/chat", () => {
  it("retourne une réponse valide pour un message", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: "Quels sont vos services ?" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reply");
    expect(typeof res.body.reply).toBe("string");
    expect(res.body.reply.length).toBeGreaterThan(0);
  });

  it("retourne 400 si le message est manquant", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("retourne 400 si le message n'est pas une chaîne", async () => {
    const res = await request(app)
      .post("/api/chat")
      .send({ message: 123 });

    expect(res.status).toBe(400);
  });
});
