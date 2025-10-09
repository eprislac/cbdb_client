import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { logger } from "./logger";

const log = logger.child({ module: "lib/auth0" });

if (
  !process.env.AUTH0_DOMAIN ||
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_CLIENT_SECRET ||
  !process.env.AUTH0_AUDIENCE
) {
  log.error("Auth0 environment variables are not set properly");
  throw new Error("Auth0 environment variables are not set properly");
}

const options = {
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  authorizationParams: {
    response_type: "code",
    audience: process.env.AUTH0_AUDIENCE,
    scope: "openid profile email",
  },
};

export const auth0 = new Auth0Client();
