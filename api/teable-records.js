// api/teable-records.js
// 直接用個人 API Token 操作 Teable 資料（GET / POST / DELETE）
// 用法：
//   GET    /api/teable-records?tableId=tblXXXXXX              → 讀取所有記錄
//   POST   /api/teable-records?tableId=tblXXXXXX  body: { fields: {...} }  → 新增記錄
//   DELETE /api/teable-records?tableId=tblXXXXXX&recordId=recXXX → 刪除記錄

export default async function handler(req, res) {
  const TOKEN = process.env.TEABLE_API_TOKEN;

  if (!TOKEN) {
    return res.status(500).json({ ok: false, message: 'TEABLE_API_TOKEN not set' });
  }

  const { tableId, recordId } = req.query;

  if (!tableId) {
    return res.status(400).json({ ok: false, message: 'tableId is required' });
  }

  const BASE_URL = `https://app.teable.ai/api/table/${tableId}/record`;

  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };

  try {
    let response;

    if (req.method === 'GET') {
      // 讀取記錄
      response = await fetch(BASE_URL, { method: 'GET', headers });

    } else if (req.method === 'POST') {
      // 新增記錄
      const body = req.body;
      response = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

    } else if (req.method === 'DELETE') {
      // 刪除記錄
      if (!recordId) {
        return res.status(400).json({ ok: false, message: 'recordId is required for DELETE' });
      }
      response = await fetch(`${BASE_URL}/${recordId}`, { method: 'DELETE', headers });

    } else {
      return res.status(405).json({ ok: false, message: 'Method not allowed' });
    }

    const data = await response.json().catch(() => null);

    return res.status(response.status).json({
      ok: response.ok,
      status: response.status,
      data,
    });

  } catch (err) {
    console.error('teable-records error', err);
    return res.status(500).json({ ok: false, message: 'internal server error' });
  }
}
