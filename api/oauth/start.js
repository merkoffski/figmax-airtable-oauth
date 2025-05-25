export default function handler(req, res) {
  const clientId = process.env.AIRTABLE_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI || "https://figmax-airtable-oauth.vercel.app/api/oauth/callback";
  const scope = "data.records:read schema.bases:read";
  const responseType = "code";

  const authUrl = `https://airtable.com/oauth2/v1/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

  if (req.query.debug === "true") {
    res.setHeader("Content-Type", "text/plain");
    res.send("Airtable Auth URL:\n\n" + authUrl);
  } else {
    res.redirect(authUrl);
  }
}
