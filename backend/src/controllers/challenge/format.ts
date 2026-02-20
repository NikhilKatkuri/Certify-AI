import { Request, Response } from 'express';
import 'dotenv/config';
import axios from 'axios';

/**
 * system prompt for the format challenge
 */

const aiServerURL = process.env['AI_SERVER_URL'];

const systemPrompt = `

`;

const FormatChallenge = async (req: Request, res: Response) => {
  if (!aiServerURL) {
    throw new Error('AI_SERVER_URL is not defined in environment variables');
  }

  const { message } = req.body as { message: string };

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const body = {
    model: 'llama3.2',
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  };

  const serevr_res = await axios.post(`${aiServerURL}/api/ollama`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = serevr_res.data;

  res.status(200).json({ result: data.message.content });
};

export default FormatChallenge;
