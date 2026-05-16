export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const series = searchParams.get('series');
  const isTest = searchParams.get('test') === '1';
  const key = context.env.FRED_API_KEY;

  if (!key) return jsonError('FRED_API_KEY not configured', 500);
  if (!series) return jsonError('series param required', 400);

  try {
    const url = isTest
      ? `https://api.stlouisfed.org/fred/series?series_id=${series}&api_key=${key}&file_type=json`
      : `https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=${key}&file_type=json&limit=13&sort_order=desc`;

    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
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
