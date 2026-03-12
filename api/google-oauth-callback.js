export default function handler(req, res) {
  const { code, state } = req.query || {};

  return res.status(200).json({
    ok: true,
    source: 'google',
    code: code || null,
    state: state || null
  });
}
