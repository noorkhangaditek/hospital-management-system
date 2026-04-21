import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      // Hum yahan model ka naam bilkul sahi wala likh rahe hain
      model: google('gemini-1.5-flash-latest'), 
      messages,
      system: "Tum Noor Khan ke MedClinic ke AI Assistant ho. Urdu aur English mix mein jawab do.",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI Route Error:", error);
    return new Response(JSON.stringify({ error: "Model error" }), { status: 500 });
  }
}