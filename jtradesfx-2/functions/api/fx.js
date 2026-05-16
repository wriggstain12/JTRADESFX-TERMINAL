export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const base = searchParams.get('base') || 'USD';
  const key = context.env.EXCHANGERATE_API_KEY;

  if (!key) return jsonError('EXCHANGERATE_API_KEY not configured', 500);

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/${base}`);
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
