export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  return new Response(
    JSON.stringify({
      ok: true,
      source: 'google',
      code,
      state
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
