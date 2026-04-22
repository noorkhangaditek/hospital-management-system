import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'
import { google } from '@ai-sdk/google'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const systemPrompt = `You are a helpful medical clinic assistant. You help staff look up patient information and answer general medical clinic queries.

You have access to the following patient database:
- Patient ID 101: Ali Khan, Disease: Fever, Status: Pending
- Patient ID 102: Sara Ahmed, Disease: Cough, Status: Treated

When a user asks about a patient by ID:
- If the ID is 101, respond with: "Patient: Ali Khan | Disease: Fever | Status: Pending"
- If the ID is 102, respond with: "Patient: Sara Ahmed | Disease: Cough | Status: Treated"
- For any other numeric ID, say the patient was not found and suggest trying 101 or 102.

You can also help with general medical clinic questions, appointment scheduling inquiries, and provide helpful information about common medical conditions.

Be professional, concise, and helpful.`

  try {
    const result = streamText({
      model: google('gemini-2.0-flash-lite'),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error('[v0] API Error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
