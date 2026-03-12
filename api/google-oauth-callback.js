export default function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({ ok: false, error });
  }

  return res.status(200).json({
    ok: true,
    source: 'google',
    code,
    state
  });
}
