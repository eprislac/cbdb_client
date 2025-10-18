import { logger } from "@/lib/logger";

const log = logger.child({ module: "services/collectionService" });

export async function getCollectionById(
	encryptedEmail: string,
	encryptedId: string,
) {
	const response = await fetch(`/collection/${encryptedEmail}/${encryptedId}`);
	const { data } = await response.json();
	log.debug(`Fetched collection data: ${JSON.stringify(data)}`);
	return data;
}

export async function deleteCollection(
	encryptedEmail: string,
	encryptedId: string,
) {
	const response = await fetch(`/collection/${encryptedEmail}/${encryptedId}`, {
		method: "DELETE",
	});
	const { data } = await response.json();
	log.debug(`Deleted collection data: ${JSON.stringify(data)}`);
	return data;
}

export async function updateCollection(
	encryptedEmail: string,
	encryptedId: string,
	updateData: { collection: { name?: string; description?: string } },
) {
	const response = await fetch(
		`/collections/${encryptedEmail}/${encryptedId}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
		},
	);
	const { data } = await response.json();
	log.debug(`Updated collection data: ${JSON.stringify(data)}`);
	return data;
}

export async function getCollection(
	encryptedEmail: string,
	encryptedId: string,
) {
	const response = await fetch(
		`/collections/${encryptedEmail}/${encryptedId}/items`,
	);
	const { data } = await response.json();
	log.debug(`Fetched publications data: ${JSON.stringify(data)}`);
	return data;
}

export async function addItem(
	encryptedEmail: string,
	encryptedId: string,
	itemData: { name: string; description?: string },
) {
	const response = await fetch(
		`/collections/${encryptedEmail}/${encryptedId}/items`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(itemData),
		},
	);
	const { data } = await response.json();
	log.debug(`Added item data: ${JSON.stringify(data)}`);
	return data;
}
