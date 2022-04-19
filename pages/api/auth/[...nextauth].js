import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { startLoginEmailPassword } from "../../../src/actions/authActions";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                const { user } = startLoginEmailPassword({ email, password });
                return user;
            }
        }),

    ],

    // jwt: {

    // },
    callbacks: {

        async jwt({ token, account, user }) {

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'oauth':
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }
            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user = token.user;

            return session;
        }
    }
})

