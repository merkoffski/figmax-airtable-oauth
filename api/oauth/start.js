export default function handler(req, res) {
  const redirectUri = process.env.REDIRECT_URI;
  const clientId = process.env.AIRTABLE_CLIENT_ID;

  const authUrl = `https://airtable.com/oauth2/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=data.records:read schema.bases:read`;

  // If ?debug=true, show the generated URL instead of redirecting
  if (req.query.debug === "true") {
    res.setHeader("Content-Type", "text/plain");
    res.end(`Airtable Auth URL:\n\n${authUrl}`);
    return;
  }

  res.redirect(authUrl);
}
