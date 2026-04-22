import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'), // Naye SDK mein ye bilkul sahi chalega
    messages,
    system: "Tum Noor Khan ke MedClinic ke AI Assistant ho. Urdu aur English mix mein jawab do.",
  });

  return result.toDataStreamResponse();
}