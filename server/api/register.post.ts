import bcrypt from "bcrypt";
import { prisma } from "@/prisma/db";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const { email, name, password } = body;

		if (!email || !name || !password) {
			throw createError({
				statusCode: 400,
				statusMessage: "Bad Reqest: Missing user info",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				hashedPassword,
			},
		});

		return { user };
	} catch (error: any) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal server error',
		});
	}
});
