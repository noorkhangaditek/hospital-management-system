import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: `Tum Noor Khan ke MedClinic ke AI Assistant ho. Hamesha Urdu/English mix mein jawab do.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("AI Error", { status: 500 });
  }
}