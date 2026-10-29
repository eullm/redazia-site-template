import { BASE, absolute } from '../lib/site';

export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absolute(`${BASE}/sitemap-index.xml`)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
