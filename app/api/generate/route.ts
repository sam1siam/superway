// File: /app/api/generate/route.ts

import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { scrapePage } from '@/lib/scraper';
import { buildPrompt } from '@/lib/prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { inspirationUrl, currentUrl } = await req.json();

  await Promise.all([
    scrapePage(inspirationUrl),
    scrapePage(currentUrl),
  ]);  

  const prompt = buildPrompt({ inspirationUrl, currentUrl });

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  const output = completion.choices[0].message?.content ?? 'No content returned.';

  return NextResponse.json({ result: output });
}

