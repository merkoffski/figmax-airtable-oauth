export default async function handler(req, res) {
  const code = req.query.code;
  const clientId = process.env.AIRTABLE_CLIENT_ID;
  const clientSecret = process.env.AIRTABLE_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  const tokenRes = await fetch("https://airtable.com/oauth2/v1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri
    })
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (accessToken) {
    res.setHeader("Set-Cookie", `airtable_token=${accessToken}; Path=/; HttpOnly`);
    res.redirect("/connected");
  } else {
    res.status(500).json({ error: "Failed to authenticate", tokenData });
  }
}
