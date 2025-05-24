export default async function handler(req, res) {
  const token = req.cookies.airtable_token;
  const baseId = req.query.base;

  if (!token || !baseId) return res.status(400).json({ error: "Missing token or base ID" });

  const metaRes = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const metaData = await metaRes.json();
  res.status(200).json(metaData);
}
