import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';


const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_KEY!,
});

export const runtime = 'edge'; 

export async function POST(request: Request) {
  try {
    const result = await streamText({
      model: openrouter.chat('deepseek/deepseek-v3-base:free'),
      prompt:
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What is a hobby you have recently started?||If you could have dinner with any historical figure, who would it be?||What is a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
      maxTokens: 500,
    });

    await result.consumeStream();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message generated successfully',
        data: result.text,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error("❌ Error generating message:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to generate message',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
