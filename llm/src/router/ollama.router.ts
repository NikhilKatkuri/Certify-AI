import { Ollama } from "ollama";
import express from "express";
import promptForFormat from "../prompts/Format";

const router = express.Router();

const ollama = new Ollama();

// Keep-alive configuration (in milliseconds)
export const KEEP_ALIVE_INTERVAL = 30 * 1000; // 30s

// Keep-alive call counter
let keepAliveCallCount = 0;

// Keep Ollama awake by periodicalWly checking if it's running
export const keepOllamaAwake = async () => {
    keepAliveCallCount++;
    try {
        await ollama.list();
        console.log(`[${new Date().toISOString()}] Ollama keep-alive ping successful - Call #${keepAliveCallCount}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Ollama keep-alive ping failed - Call #${keepAliveCallCount}:`, error);
    }
};

console.log(`Ollama keep-alive started with interval: ${KEEP_ALIVE_INTERVAL / 1000}s`);

router.post("/", async (req, res) => {
    const { model, messages,type} = req.body as {model: string, messages: any[], type: string};
    if (!model) {
        return res.status(400).json({ error: "Model is required" });
    }
    if (!messages) {
        return res.status(400).json({ error: "Messages are required" });
    }
    
    try {
        // Prepare messages array with optional system prompt
        let chatMessages = messages;
        
        // If system prompt is provided separately, prepend it to messages
        if (type === "format") {
            chatMessages = [
                { role: "system", content: promptForFormat },
                ...messages
            ];
        }
        console.log("pinged by client with IP:", req.ip);
        
        const response = await ollama.chat({
            model: model,
            messages: chatMessages
        });
        res.json(response);

    } catch (error) {
        res.status(500).json({ error: "Failed to process the request" });

    }
});

router.get("/models", async (_req, res) => {
    try {
        const models = await ollama.list(); 
        return res.status(200).json(models);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

export default router;