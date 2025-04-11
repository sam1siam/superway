type PromptInput = {
    inspirationUrl: string;
    inspoHTML: string;
    currentUrl: string;
    currentHTML: string;
  };
  
  export function buildPrompt({
    inspirationUrl,
    inspoHTML,
    currentUrl,
    currentHTML,
  }: PromptInput): string {
    return `
  You are an expert web designer and AI developer.
  
  You are given two pages:
  1. Inspiration page (${inspirationUrl})
  2. The user's current page (${currentUrl})
  
  Extract the design layout and copywriting tone from the **inspiration** page. 
  Extract the branding (logos, images, colors, fonts) from the **current** page.
  
  Generate a new landing page that:
  - Uses branding and assets from the current page
  - Uses copy structure and design inspiration from the inspiration page
  
  Return only:
  1. HTML in a code block
  2. CSS in a code block
  `;
  }
  