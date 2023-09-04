declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_AUTH_TOKEN: string;
      COGNITO_CLIENT_ID: string;
      COGNITO_REGION: string;
      COGNITO_CLIENT_SECRET: string;
      COGNITO_ISSUER: string;
      COGNITO_USER_POOL_ID: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      JWT_ID_KEY: string;
      JWT_ACCESS_KEY: string;
      NODE_ENV: "development" | "production";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
