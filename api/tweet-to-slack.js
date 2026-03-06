export const config = { runtime: 'edge' };

export default async function handler(req) {
  let url;

  if (req.method === 'GET') {
    const params = new URL(req.url).searchParams;
    url = params.get('url');
  } else if (req.method === 'POST') {
    const body = await req.json();
    url = body.url;
  } else {
    return new Response('GET or POST only', { status: 405 });
  }

  if (!url) {
    return new Response('Missing url', { status: 400 });
  }

  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
  if (!SLACK_WEBHOOK) {
    return new Response('No webhook configured', { status: 500 });
  }

  let slackText = url;
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
    const oembedRes = await fetch(oembedUrl);

    if (oembedRes.ok) {
      const data = await oembedRes.json();
      const htmlText = data.html || '';
      const match = htmlText.match(/<p[^>]*>([\s\S]*?)<\/p>/);
      let tweetText = match ? match[1] : '';
      tweetText = tweetText
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<a[^>]*>pic\.twitter\.com[^<]*<\/a>/g, '')
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, '$1')
        .replace(/&mdash;/g, '\u2014')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\u2026/g, '...')
        .trim();

      const author = data.author_name || '';
      if (author && tweetText) {
        slackText = `*${author}:* ${tweetText}\n${url}`;
      }
    }
  } catch (e) {
    // Fall back to just the URL
  }

  const slackRes = await fetch(SLACK_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `payload=${encodeURIComponent(JSON.stringify({ text: slackText }))}`,
  });

  if (!slackRes.ok) {
    return new Response('Slack error', { status: 500 });
  }

  return new Response('ok');
}
