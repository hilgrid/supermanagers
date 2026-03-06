export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('POST only', { status: 405 });
  }

  const { url } = await req.json();
  if (!url) {
    return new Response('Missing url', { status: 400 });
  }

  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;

  // Try to get tweet content via oEmbed
  let slackText = url;
  try {
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
    const oembedRes = await fetch(oembedUrl);

    if (oembedRes.ok) {
      const data = await oembedRes.json();
      // Extract text from the HTML blockquote
      const htmlText = data.html || '';
      const match = htmlText.match(/<p[^>]*>([\s\S]*?)<\/p>/);
      let tweetText = match ? match[1] : '';
      // Clean HTML tags and entities
      tweetText = tweetText
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<a[^>]*>pic\.twitter\.com[^<]*<\/a>/g, '')
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, '$1')
        .replace(/&mdash;/g, '—')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\u2026/g, '...')
        .trim();

      const author = data.author_name || '';
      slackText = `*${author}:* ${tweetText}\n${url}`;
    }
  } catch {
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
