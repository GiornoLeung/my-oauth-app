export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: 'google callback alive',
    query: req.query || null
  });
}
