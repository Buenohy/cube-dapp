import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

export default async function auth(req: any, res: any) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials: any) {
        try {
          const message = credentials?.message || "";

          const siwe = new SiweMessage(
            message.startsWith("{") ? JSON.parse(message) : message,
          );

          if (!process.env.NEXTAUTH_URL) {
            throw new Error("NEXTAUTH_URL não está definida no .env.local");
          }

          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          }
          return null;
        } catch (e) {
          console.log("❌ ERRO NO SIWE:");
          console.error(e);
          return null;
        }
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: any) {
        session.address = token.sub;
        session.user.name = token.sub;
        return session;
      },
    },
  });
}
