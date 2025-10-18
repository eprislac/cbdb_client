import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(
	_req: NextApiRequest,
	{
		params,
	}: {
		params: Promise<{
			encryptedEmail: string;
		}>;
	},
) {
	const log = logger.child({ module: "GET_api/[encryptedEmail]/collections/" });
	const { encryptedEmail } = await params;
	const apiResponse = await fetch(`${apiUrl}/${encryptedEmail}/collections`);
	const data = await apiResponse.json();
	log.debug(`data: ${JSON.stringify(data)}`);
	return Response.json(data);
}

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ encryptedEmail: string }> },
) {
	const log = logger.child({
		module: "POST_api/[encryptedEmail]/collections/",
	});
	const { encryptedEmail } = await params;
	const body = await request.json();
	log.debug(`Request body (line 34): ${JSON.stringify(body)}`);
	log.debug(`encryptedEmail (line 35): ${encryptedEmail}`);
	if (!body) {
		log.error("Request body is missing");
		return Response.json({ error: "Request body is missing" }, { status: 400 });
	}
	if (!body.collection) {
		log.error("Collection data is missing in the request body");
		return Response.json(
			{ error: "Collection data is missing in the request body" },
			{ status: 400 },
		);
	}
	const { collection } = body;
	if (!collection || !collection.name) {
		log.error("Collection name is required");
		return Response.json(
			{ error: "Collection name is required" },
			{ status: 400 },
		);
	}
	const apiResponse = await fetch(`${apiUrl}/${encryptedEmail}/collections`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ collection }),
	});
	const data = await apiResponse.json();
	return Response.json(data);
}
