import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    token: string;
    group: groupType;
  }
  interface Session {
    user: User;
  }

  interface JWT {
    group: string;
  }
}
