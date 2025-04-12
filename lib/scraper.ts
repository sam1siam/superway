import * as cheerio from 'cheerio';

export async function scrapePage(url: string): Promise<string> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout
  
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
  
      const html = await res.text();
      const $ = cheerio.load(html);
      $('script,noscript,style').remove();
  
      return $.html();
    } catch (error) {
      console.error(`Failed to scrape ${url}:`, error);
      return '';
    }
  }
  