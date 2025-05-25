export default async function handler(req, res) {
  const code = req.query.code;
  const clientId = process.env.AIRTABLE_CLIENT_ID;
  const clientSecret = process.env.AIRTABLE_CLIENT_SECRET;
  const redirectUri = process.env.REDIRECT_URI || "https://figmax-airtable-oauth.vercel.app/api/oauth/callback";

  const debugHTML = (msg) => \`
    <html>
      <body style="font-family: monospace; padding: 2rem; background: #111; color: #0f0;">
        <h2>OAuth Callback Debug</h2>
        <pre>\${msg}</pre>
      </body>
    </html>
  \`;

  if (!code) {
    res.setHeader("Content-Type", "text/html");
    res.status(400).send(debugHTML("Missing code from Airtable."));
    return;
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
      res.setHeader("Content-Type", "text/html");
      return res.status(500).send(debugHTML(
        "Token exchange failed:\n\n" +
        JSON.stringify(tokenData, null, 2) +
        "\n\nSent with:\n" +
        JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          code
        }, null, 2)
      ));
    }

    res.setHeader("Set-Cookie", \`airtable_token=\${tokenData.access_token}; Path=/; HttpOnly\`);
    res.setHeader("Content-Type", "text/html");
    res.send(debugHTML("Access token received and stored successfully."));
  } catch (err) {
    res.setHeader("Content-Type", "text/html");
    res.status(500).send(debugHTML("Unexpected error:\n" + err.message));
  }
}
