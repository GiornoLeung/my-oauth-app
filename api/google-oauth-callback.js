export const config = {
  runtime: 'nodejs'
};

export default async function handler(req, res) {
  try {
    const { code, state, error } = req.query || {};

    if (error) {
      return res.status(400).json({ ok: false, error });
    }

    return res.status(200).json({
      ok: true,
      source: 'google',
      code: code || null,
      state: state || null
    });
  } catch (e) {
    console.error('google handler error', e);
    return res.status(500).json({ ok: false, message: 'internal error' });
  }
}
