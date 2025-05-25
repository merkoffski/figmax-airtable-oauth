export default async function handler(req, res) {
  const code = req.query.code;
  const clientId = process.env.AIRTABLE_CLIENT_ID;
  const clientSecret = process.env.AIRTABLE_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!code) {
    return res.status(400).json({ error: "Missing code from Airtable" });
  }

  try {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });

    const tokenRes = await fetch("https://airtable.com/oauth2/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(500).json({ error: "Token exchange failed", details: tokenData });
    }

    res.setHeader("Set-Cookie", `airtable_token=${tokenData.access_token}; Path=/; HttpOnly`);
    res.status(200).send("✅ Airtable authentication complete. You can now close this window.");
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", message: err.message });
  }
}
