import { NextApiRequest } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(
	_req: NextApiRequest,
	{
		params,
	}: {
		params: Promise<{
			encryptedEmail: string;
			encryptedCollectionId: string;
		}>;
	},
) {
	const log = logger.child({
		module:
			"GET_api/[encryptedEmail]/collections/[encryptedCollectionId]/items",
	});
	const { encryptedEmail, encryptedCollectionId } = await params;
	const apiResponse = await fetch(
		`${apiUrl}/${encryptedEmail}/collections/${encryptedCollectionId}/items`,
	);
	const data = await apiResponse.json();
	log.debug(`data: ${JSON.stringify(data)}`);
	return Response.json(data);
}

export async function POST(
	req: NextApiRequest,
	{
		params,
	}: {
		params: Promise<{
			encryptedEmail: string;
			encryptedCollectionId: string;
		}>;
	},
) {
	const log = logger.child({
		module:
			"POST_api/[encryptedEmail]/collections/[encryptedCollectionId]/items",
	});
	const { encryptedEmail, encryptedCollectionId } = await params;
	const body = await req.body();
	log.debug(`Request body (line 34): ${JSON.stringify(body)}`);
	log.debug(`encryptedEmail (line 35): ${encryptedEmail}`);
	log.debug(`encryptedCollectionId (line 36): ${encryptedCollectionId}`);
	if (!body) {
		log.error("Request body is missing");
		return Response.json({ error: "Request body is missing" }, { status: 400 });
	}
	if (!body.item) {
		log.error("Item data is missing in the request body");
		return Response.json(
			{ error: "Item data is missing in the request body" },
			{ status: 400 },
		);
	}
	const { item } = body;
	if (!item || !item.title || !item.url) {
		log.error("Item title and url are required");
		return Response.json(
			{ error: "Item title and url are required" },
			{ status: 400 },
		);
	}
	const apiResponse = await fetch(
		`${apiUrl}/${encryptedEmail}/collections/${encryptedCollectionId}/items`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ item }),
		},
	);
	if (apiResponse.ok) {
		const { data } = await apiResponse.json();
		return Response.json(data);
	} else {
		const errorData = await apiResponse.json();
		log.error(`Failed to add item: ${apiResponse.statusText}`);
		return Response.json(errorData, { status: apiResponse.status });
	}
}
