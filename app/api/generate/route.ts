// File: /app/api/generate/route.ts
import { OpenAIStream, StreamingTextResponse, experimental_buildOpenAI } from 'ai';
import { scrapePage } from '@/lib/scraper';
import { buildPrompt } from '@/lib/prompt';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { inspirationUrl, currentUrl } = await req.json();

  const [inspoHTML, currentHTML] = await Promise.all([
    scrapePage(inspirationUrl),
    scrapePage(currentUrl),
  ]);

  const prompt = buildPrompt({ inspirationUrl, inspoHTML, currentUrl, currentHTML });

  const ai = experimental_buildOpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const response = await ai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
