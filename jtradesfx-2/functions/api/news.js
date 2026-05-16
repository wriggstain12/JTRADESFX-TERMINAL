export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const q = searchParams.get('q') || 'forex OR "central bank" OR "interest rate" OR EUR OR USD OR JPY';
  const key = context.env.NEWS_API_KEY;

  if (!key) return jsonError('NEWS_API_KEY not configured', 500);

  try {
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', q);
    url.searchParams.set('language', 'en');
    url.searchParams.set('sortBy', 'publishedAt');
    url.searchParams.set('pageSize', '20');
    url.searchParams.set('apiKey', key);

    const res = await fetch(url.toString());
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch (e) {
    return jsonError(e.message, 500);
  }
}

function jsonError(msg, status) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
