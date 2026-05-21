import "express-session";

declare module "express-session" {
  interface SessionData {
    oauthState?: string;
    codeVerifier?: string;
    user?: Record<string, unknown>;
  }
}
