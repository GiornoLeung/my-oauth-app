export default async function handler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      return new Response(
        JSON.stringify({ ok: false, error }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        source: 'google',
        code: code || null,
        state: state || null
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (e) {
    console.error('google handler error', e);
    return new Response(
      JSON.stringify({ ok: false, message: 'internal error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
