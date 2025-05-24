export default async function handler(req, res) {
  const token = req.cookies.airtable_token;

  if (!token) {
    return res.status(401).json({ error: "Missing authentication token." });
  }

  try {
    const metaRes = await fetch("https://api.airtable.com/v0/meta/bases", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!metaRes.ok) {
      const errorBody = await metaRes.text();
      return res.status(metaRes.status).json({ error: "Failed to fetch bases", details: errorBody });
    }

    const data = await metaRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}
