const pageMeta: Record<string, { title: string; description: string }> = {
  '/session1': {
    title: 'Session 1: Build Your First Custom GPT | Supermanagers',
    description: "Think of feedback you give over and over. By the end of this session, you'll have a Custom GPT that gives it for you.",
  },
  '/session2': {
    title: 'Session 2: Get Your Tool from OK to Great | Supermanagers',
    description: 'Diagnose what\'s wrong with your tool, rethink the scope, and rebuild it with sharper criteria and coaching.',
  },
  '/session4': {
    title: 'Session 4 | Supermanagers',
    description: 'Supermanagers with AI — session guide and materials.',
  },
  '/resources': {
    title: 'Resources | Supermanagers',
    description: 'Tools, templates, and resources from the Supermanagers course.',
  },
  '/managercopilot': {
    title: 'Manager Copilot | WriterBuilder',
    description: 'An AI-powered coaching tool for managers.',
  },
  '/steeringwheel': {
    title: 'Steering Wheel | WriterBuilder',
    description: 'A visual tool for navigating management decisions.',
  },
  '/30days': {
    title: '30 Days of AI | WriterBuilder',
    description: '30 days of practical AI challenges for managers.',
  },
};

const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'Slackbot',
  'WhatsApp',
  'TelegramBot',
  'Discordbot',
  'Applebot',
];

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || '';
  const isBot = BOT_USER_AGENTS.some((bot) => ua.includes(bot));

  if (!isBot) return;

  const url = new URL(request.url);
  const meta = pageMeta[url.pathname];

  if (!meta) return;

  const ogImage = 'https://www.writerbuilder.com/og-image.png';

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.writerbuilder.com${url.pathname}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.title}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${ogImage}">
</head>
<body></body>
</html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}

export const config = {
  matcher: ['/((?!api|assets|favicon|og-image|jobsearch|_next).*)'],
};
