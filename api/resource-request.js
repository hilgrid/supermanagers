export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { term, name, context, question } = req.body;

  if (!term || !term.trim()) {
    return res.status(400).json({ error: 'No term provided' });
  }

  const lines = [`*Resource request:* ${term.trim()}`];
  if (name && name.trim()) lines.push(`*From:* ${name.trim()}`);
  if (context && context.trim()) lines.push(`*Where it came up:* ${context.trim()}`);
  if (question && question.trim()) lines.push(`*Question:* ${question.trim()}`);

  try {
    await fetch(process.env.SLACK_RESOURCE_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: lines.join('\n') }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send request' });
  }
}
