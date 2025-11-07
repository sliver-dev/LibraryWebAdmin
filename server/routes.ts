import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatResponse } from "./lib/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for AI assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const response = await getChatResponse(messages);
      res.json({ message: response });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
