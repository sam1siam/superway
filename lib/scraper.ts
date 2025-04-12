import * as cheerio from 'cheerio';

export async function scrapePage(url: string): Promise<string> {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Clean up the document
  $('script,noscript,style').remove();

  return $.html();
}
