export default function handler(req, res) {
  const { code, state } = req.query || {};

  return res.status(200).json({
    ok: true,
    source: 'teable',
    code: code || null,
    state: state || null
  });
}
