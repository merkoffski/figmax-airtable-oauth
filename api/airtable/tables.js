export default async function handler(req, res) {
  const token = process.env.AIRTABLE_PAT;

  const response = await fetch("https://api.airtable.com/v0/meta/bases", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
