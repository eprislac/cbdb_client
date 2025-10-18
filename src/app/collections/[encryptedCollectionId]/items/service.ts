import { logger } from "@/lib/logger";

const log = logger.child({ module: "collections/items/service" });

export async function getItems(
	encryptedCollectionId: string,
	encryptedEmail: string,
) {
	try {
		const items = await fetch(
			`${process.env.API_URL}/${encryptedEmail}/collections/${encryptedCollectionId}/items`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		).then((res) => {
			if (!res.ok) {
				throw new Error(`Error fetching items: ${res.statusText}`);
			} else {
				return res.json();
			}
		});
		log.debug(`Fetched items: ${JSON.stringify(items)}`);
		return items;
	} catch (error) {
		log.error(`Failed to fetch items: ${error}`);
		throw error;
	}
}

export async function addItem(
	encryptedEmail: string,
	encryptedCollectionId: string,
	itemData: any,
) {
	log.debug(
		`Adding item to collectionId: ${encryptedCollectionId} for user with email hash: ${encryptedEmail}`,
	);
	const response = await fetch(
		`${process.env.API_URL}/${encryptedEmail}/collections/${encryptedCollectionId}/items`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(itemData),
		},
	);
	log.debug(`Add item response status: ${response.status}`);
	return response;
}
// 	);
// }
