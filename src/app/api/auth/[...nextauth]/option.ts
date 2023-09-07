import { AuthOptions } from "next-auth";
// import CognitoProvider from "next-auth/providers/cognito";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminGetUserCommand,
  AttributeType,
} from "@aws-sdk/client-cognito-identity-provider";
import Credentials from "next-auth/providers/credentials";

const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");

const {
  COGNITO_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_USER_POOL_ID,
  JWT_ID_KEY,
  JWT_ACCESS_KEY,
} = process.env;

const verifyIDToken = (token: string, key: Object) => {
  //convert JWK keys to PEM format
  var pem = jwkToPem(key);

  // verify id_token
  return jwt.verify(token, pem, { algorithms: ["RS256"] });
};

import { User } from "next-auth";

interface CognitoUser extends User {
  UserAttributes: AttributeType[] | undefined;
  token: string;
}

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.log("No credentials");
          return null;
        }
        const params = {
          AuthFlow: "ADMIN_NO_SRP_AUTH",
          ClientId: COGNITO_CLIENT_ID,
          UserPoolId: COGNITO_USER_POOL_ID,
          AuthParameters: {
            USERNAME: credentials.email,
            PASSWORD: credentials.password,
          },
        };

        const cognitoClient = new CognitoIdentityProviderClient({
          region: COGNITO_REGION,
        });
        try {
          const adminInitiateAuthCommand = new AdminInitiateAuthCommand(params);
          const response = await cognitoClient.send(adminInitiateAuthCommand);
          if (response.AuthenticationResult?.AccessToken) {
            const idtokenVerified = verifyIDToken(
              response.AuthenticationResult?.IdToken as string,
              JSON.parse(JWT_ID_KEY)
            );

            const userResult: User = {
              id: idtokenVerified["cognito:username"],
              name: idtokenVerified["name"],
              email: idtokenVerified["email"],
              image: "",
              token: response.AuthenticationResult.AccessToken,
              group: idtokenVerified["cognito:groups"][0],
            };

            return userResult;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // CognitoProvider({
    //   clientId: process.env.COGNITO_CLIENT_ID,
    //   clientSecret: process.env.COGNITO_CLIENT_SECRET,
    //   issuer: process.env.COGNITO_ISSUER,
    // }),
  ],
  debug: true,
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log(user);
      // if (user) {
      //   token.enabled = user.Enabled;
      //   console.debug("IFFFFFFFFFFF***********", user);
      //   const ua = user.UserAttributes;
      //   for (let i = 0; i < ua.length; i++) {
      //     const att = ua[i];
      //     token[att.Name] = att.Value;
      //   }
      //   console.debug("Token after data transfer: ", token);
      //   // some custom logic here
      // }
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user.group = token.group as GroupType;
      return session;
    },
  },
};

export default authOptions;
