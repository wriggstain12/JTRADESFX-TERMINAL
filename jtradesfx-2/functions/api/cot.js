export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const isTest = searchParams.get('test') === '1';

  try {
    const res = await fetch(
      'https://publicreporting.cftc.gov/api/views/6dqn-4d3e/rows.json?accessType=DOWNLOAD&$limit=50',
      { headers: { 'User-Agent': 'JtradesFX/1.0' } }
    );

    if (!res.ok) throw new Error(`CFTC responded ${res.status}`);
    const data = await res.json();

    const body = isTest
      ? { ok: true, rows: data?.data?.length || 0 }
      : data;

    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message, data: null }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
