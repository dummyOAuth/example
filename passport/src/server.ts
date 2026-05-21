import express from "express";
import session from "express-session";
import { createHash, randomBytes } from "crypto";

const port = Number(process.env.PORT ?? 3007);
const issuer = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
const clientId = process.env.OAUTH_CLIENT_ID ?? "demo";
const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? "demo";
const origin = (process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3007").replace(/\/$/, "");
const redirectUri = `${origin}/auth/callback`;

async function discovery() {
  const res = await fetch(`${issuer}/.well-known/openid-configuration`);
  if (!res.ok) throw new Error("discovery failed");
  return res.json();
}

function pkce(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

function page(title: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title>
  <style>body{font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem;background:#0f172a;color:#e2e8f0}
  a{color:#2dd4bf}code{background:#334155;padding:2px 6px;border-radius:4px}</style></head><body>${body}</body></html>`;
}

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET ?? "dev", resave: false, saveUninitialized: false }));

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(page("Passport example", `<h1>Signed in</h1><pre>${JSON.stringify(req.session.user, null, 2)}</pre><p><a href="/auth/logout">Sign out</a></p>`));
    return;
  }
  res.send(page("Passport example", `<h1>Passport.js + dummyoauth</h1><p>Redirect: <code>${redirectUri}</code></p><p><a href="/auth/login">Sign in</a></p>`));
});

app.get("/auth/login", async (req, res) => {
  const doc = await discovery();
  const state = randomBytes(16).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  req.session.oauthState = state;
  req.session.codeVerifier = verifier;
  const url = new URL(doc.authorization_endpoint);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", pkce(verifier));
  url.searchParams.set("code_challenge_method", "S256");
  res.redirect(url.toString());
});

app.get("/auth/callback", async (req, res) => {
  try {
    const code = String(req.query.code ?? "");
    const state = String(req.query.state ?? "");
    if (!code || state !== req.session.oauthState || !req.session.codeVerifier) {
      res.redirect("/?error=invalid_callback");
      return;
    }
    const doc = await discovery();
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
      code_verifier: req.session.codeVerifier,
    });
    const tokenRes = await fetch(doc.token_endpoint, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
    const tokens = await tokenRes.json();
    const userRes = await fetch(doc.userinfo_endpoint, { headers: { Authorization: `Bearer ${tokens.access_token}` } });
    req.session.user = { ...(await userRes.json()), access_token: tokens.access_token };
    res.redirect("/");
  } catch (e) {
    res.status(500).send(String(e));
  }
});

app.get("/auth/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

app.listen(port, () => console.log(`http://localhost:${port}`));
