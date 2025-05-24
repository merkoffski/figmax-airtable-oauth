export default async function handler(req, res) {
  const token = req.cookies.airtable_token;
  const baseId = req.query.base;
  const table = req.query.table;

  if (!token || !baseId || !table) return res.status(400).json({ error: "Missing parameters" });

  const dataRes = await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await dataRes.json();
  res.status(200).json(data);
}
