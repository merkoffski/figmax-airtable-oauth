export default function handler(req, res) {
  const clientId = process.env.AIRTABLE_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;
  const scope = "data.records:read schema.bases:read";

  const authUrl = `https://airtable.com/oauth2/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;

  res.redirect(authUrl);
}
