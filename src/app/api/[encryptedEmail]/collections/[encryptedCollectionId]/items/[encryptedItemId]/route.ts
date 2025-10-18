import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function DELETE(
	_req: Request,
	{
		params,
	}: {
		params: Promise<{
			encryptedEmail: string;
			encryptedCollectionId: string;
			encryptedItemId: string;
		}>;
	},
) {
	const log = logger.child({
		module:
			"DELETE_api/[encryptedEmail]/collections/[encryptedCollectionId]/items/[encryptedItemId]",
	});
	const { encryptedEmail, encryptedCollectionId, encryptedItemId } =
		await params;
	const apiResponse = await fetch(
		`${apiUrl}/${encryptedEmail}/collections/${encryptedCollectionId}/items/${encryptedItemId}`,
		{
			method: "DELETE",
		},
	);
	const data = await apiResponse.json();
	log.debug(`data: ${JSON.stringify(data)}`);
	return (
		JSON.stringify(data),
		{
			status: apiResponse.status,
		}
	);
}
