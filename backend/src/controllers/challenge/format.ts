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

  // Parse the AI response as JSON
  const aiResponse = JSON.parse(data.message.content);

  res.status(200).json({
    ...aiResponse,
    document_type: aiResponse.document_type || undefined,
    issuing_organization: aiResponse.issuing_organization || undefined,
    organization_type: aiResponse.organization_type || undefined,
    student_name: aiResponse.student_name || undefined,
    roll_number: aiResponse.roll_number || undefined,
    registration_number: aiResponse.registration_number || undefined,
    course_name: aiResponse.course_name || undefined,
    degree_name: aiResponse.degree_name || undefined,
    issue_date: aiResponse.issue_date || undefined,
    completion_date: aiResponse.completion_date || undefined,
    grade_or_score: aiResponse.grade_or_score || undefined,
    certificate_id: aiResponse.certificate_id || undefined,
    signatory_name: aiResponse.signatory_name || undefined,
    signatory_title: aiResponse.signatory_title || undefined,
  });
};

export default FormatChallenge;
