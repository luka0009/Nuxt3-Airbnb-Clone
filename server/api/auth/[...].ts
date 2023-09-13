import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma/db";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
	adapter: PrismaAdapter(prisma),
	secret: "secret",
	providers: [
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		CredentialsProvider.default({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "email", type: "email" },
				password: { type: "password", label: "password" },
			},
			async authorize(credentials: any, req: any) {
				// Add logic here to look up the user from the credentials supplied
				if (!credentials?.email || !credentials?.password) {
					throw createError({
						statusCode: 500,
						statusMessage: "Missing Info",
					});
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user?.hashedPassword) {
					throw createError({
						statusCode: 401,
						statusMessage: "Invalid Credentials",
					});
				}

				const correctPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				);
				if (!correctPassword) {
					throw createError({
						statusCode: 401,
						statusMessage: "Invalid Credentials",
					});
				}
				return user;
			},
		}),
	],
	debug: process.env.NODE_ENV === "development",
	pages: {
		signIn: "/",
	},
	session: {
		strategy: "jwt",
	},
});
