import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    system: "Tum Noor Khan ke assistant ho.",
    messages,
  });

  // VS Code ke mutabiq sahi function ye hai:
  return result.toTextStreamResponse();
}