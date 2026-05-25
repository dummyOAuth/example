import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import passport from "passport";

const port = Number(process.env.PORT ?? 3007);
const issuerUrl = (process.env.OAUTH_ISSUER ?? "http://localhost:3000/p/demo").replace(/\/$/, "");
const clientId = process.env.OAUTH_CLIENT_ID ?? "demo";
const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? "demo";
const origin = (process.env.EXAMPLE_APP_ORIGIN ?? "http://localhost:3007").replace(/\/$/, "");
const callbackURL = new URL("/auth/callback", origin);

const server = new URL(issuerUrl);
const config = await client.discovery(server, clientId, clientSecret);

const verify: VerifyFunction = (tokens, verified) => {
  verified(null, tokens.claims());
};

passport.use(
  "openid",
  new Strategy(
    {
      config,
      scope: "openid email profile",
      callbackURL: callbackURL.href,
    },
    verify,
  ),
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user: Express.User, cb) => cb(null, user));

function page(title: string, body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title>
  <style>body{font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem;background:#0f172a;color:#e2e8f0}
  a{color:#2dd4bf}code{background:#334155;padding:2px 6px;border-radius:4px}</style></head><body>${body}</body></html>`;
}

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "dev-passport-example",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  const user = req.user as { email?: string; sub?: string } | undefined;
  if (user) {
    res.send(
      page(
        "Passport + dummyoauth",
        `<h1>Signed in</h1><p>${user.email ?? user.sub}</p><p><a href="/auth/logout">Sign out</a></p>`,
      ),
    );
    return;
  }
  res.send(
    page(
      "Passport + dummyoauth",
      `<h1>Passport.js + openid-client</h1><p>Issuer: <code>${issuerUrl}</code></p><p>Redirect: <code>${callbackURL.href}</code></p><p><a href="/auth/login">Sign in</a></p>`,
    ),
  );
});

app.get("/auth/login", passport.authenticate("openid", { successRedirect: "/" }));

app.get("/auth/callback", passport.authenticate("openid", { successRedirect: "/" }));

app.get("/auth/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(
      client.buildEndSessionUrl(config, {
        post_logout_redirect_uri: origin,
      }).href,
    );
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
