import { Request, Response } from 'express';
import 'dotenv/config';
import axios from 'axios';

/**
 * system prompt for the format challenge
 */

const aiServerURL = process.env['AI_SERVER_URL'];

const FormatChallenge = async (req: Request, res: Response) => {
  if (!aiServerURL) {
    throw new Error('AI_SERVER_URL is not defined in environment variables');
  }

  const { message, type } = req.body as { message: string; type: string };

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const body = {
    model: 'llama3.2',
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
    type: type,
  };

  console.log('sending to AI server with IP', req.ip);
  const serevr_res = await axios.post(`${aiServerURL}/api/ollama`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = serevr_res.data;

  // Helper function to convert nanoseconds to seconds
  const nsToSeconds = (ns: number): number => {
    return Math.round((ns / 1000000000) * 1000) / 1000; // Round to 3 decimal places
  };

  // Log performance metrics
  const performanceMetrics = {
    total_duration: nsToSeconds(data.total_duration),
    load_duration: nsToSeconds(data.load_duration),
    prompt_eval_duration: nsToSeconds(data.prompt_eval_duration),
    eval_duration: nsToSeconds(data.eval_duration),
  };

  console.log('Performance Metrics:', performanceMetrics);

  res.status(200).json({ result: data.message.content });
};

export default FormatChallenge;
