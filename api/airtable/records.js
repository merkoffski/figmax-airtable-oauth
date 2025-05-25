export default async function handler(req, res) {
  const token = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = req.query.table || "Table 1";

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
