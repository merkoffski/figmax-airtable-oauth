export default async function handler(req, res) {
  const { baseId, tableId } = req.query;
  const token = req.cookies.airtable_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records", message: err.message });
  }
}
