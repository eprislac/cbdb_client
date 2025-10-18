import type { NextApiRequest } from "next";
// import { encrypt } from "@/lib/encryptionService";
import { logger } from "@/lib/logger";
const apiUrl = process.env.API_URL;

export async function GET(
	_req: NextApiRequest,
	{
		params,
	}: {
		params: Promise<{
			email?: string;
			name?: string;
			encryptedEmail: string;
		}>;
	},
) {
	const log = logger.child({ module: "GET_api/users/[encryptedEmail]" });
	const user = await params;
	const { name, email, encryptedEmail } = user;
	// log.debug(`encryptedEmail: ${encryptedEmail}`);

	const apiResponse = await fetch(
		`${apiUrl}/users/by_enc_str/${encryptedEmail}`,
	);
	const { data, message } = await apiResponse.json();
	let newData = await data;
	// log.debug(`data: ${JSON.stringify(data)}`);
	if (message === "Not Found") {
		const params = {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			user: { email: email, name: name },
		};
		// log.debug(`url: ${apiUrl}/users`);
		// log.debug(`params: ${JSON.stringify(params)}`);
		const createResponse = await fetch(`${apiUrl}/users`, params);
		newData = await createResponse.json();
		// log.debug(`createResponse: ${JSON.stringify(newData)}`);
		const { data: createdData } = newData;
		const { id } = createdData;
		newData = {
			id: id,
			name: name,
			email: email,
		};
		log.debug(`newData: ${JSON.stringify(newData)}`);
	} else {
		const { id } = data;
		newData = {
			id: id,
			name: name,
			email: email,
		};
	}
	return Response.json(newData);
}
