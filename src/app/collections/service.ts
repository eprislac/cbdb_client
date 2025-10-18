import { logger } from "@/lib/logger";
import { encrypt } from "@/lib/encryptionService";

const log = logger.child({ module: "collectionsService" });

export async function getCollections(email: string) {
	log.debug("Fetching collections...");
	const encryptedEmail = await encrypt(email);
	const apiResponse = await fetch(
		`http://localhost/api/${encryptedEmail}/collections`,
	);
	if (apiResponse.ok) {
		log.debug("API response OK: ${JSON.stringify(apiResponse)}");
		const data = await apiResponse.json();
		log.debug(`Fetched collections: ${JSON.stringify(data)}`);
		return Response.json(data);
	}
	log.error(`Failed to fetch collections: ${apiResponse.statusText}`);
	return Response.json([]);
}
export async function createCollection(email: string, name: string) {
	log.debug("Creating collection...");
	alert(`Creating collection for email: ${email} with name: ${name}`);
	if (!name || name.trim() === "") {
		log.error("Collection name is required");
		return null;
	}
	if (name.length > 50) {
		log.error("Collection name must be 50 characters or less");
		return null;
	}
	const encryptedEmail = await encrypt(email);
	log.debug(`Creating collection for: ${encryptedEmail}`);
	log.debug(`API URL: http://api/${encryptedEmail}/collections/`);
	log.debug(`Request name (line 24): ${name}`);
	const apiResponse = await fetch(
		`http://localhost/api/collections/${encryptedEmail}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ collection: { name: name } }),
		},
	);
	if (apiResponse.ok) {
		log.debug("API response OK");
		const { data } = await apiResponse.json();
		return data;
	}
	log.error(`Failed to create collection: ${apiResponse.statusText}`);
	return null;
}
