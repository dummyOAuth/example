import "express-session";

declare global {
  namespace Express {
    interface User {
      sub?: string;
      email?: string;
      name?: string;
      [key: string]: unknown;
    }
  }
}

export {};
