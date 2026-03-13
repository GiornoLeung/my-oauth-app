export default async function handler(req, res) {
  const { code, state } = req.query || {};

  if (!code) {
    return res.status(400).json({
      ok: false,
      message: 'missing code in query',
      state: state || null
    });
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', process.env.TEABLE_CLIENT_ID);
    params.append('client_secret', process.env.TEABLE_CLIENT_SECRET);
    params.append('redirect_uri', process.env.TEABLE_REDIRECT_URI);

    const tokenRes = await fetch('https://app.teable.ai/api/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(tokenRes.status).json({
        ok: false,
        message: 'failed to exchange token',
        teableResponse: data
      });
    }

    return res.status(200).json({
      ok: true,
      source: 'teable',
      state: state || null,
      token_type: data.token_type,
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      scopes: data.scopes
    });

  } catch (err) {
    console.error('token exchange error', err);
    return res.status(500).json({
      ok: false,
      message: 'internal error during token exchange'
    });
  }
}
