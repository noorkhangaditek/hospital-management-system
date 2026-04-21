import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: `Tum Noor Khan ke MedClinic ke AI Assistant ho. 
             Aapka kaam patients ki details batana aur clinic mein help karna hai.
             Hamesha Urdu aur English mix (Hinglish) mein jawab do.`,
    messages,
  });

  return result.toDataStreamResponse();
}