import { auth0 } from "@/lib/auth0";
import { logger } from "@/lib/logger";
import CollectionsForm from "./form";
import { CollectionsTable } from "./table";
import { getCollections } from "./service";
import { encrypt } from "@/lib/encryptionService";

const log = logger.child({ module: "collections/page" });

export default async function CollectionsPage() {
	const session = await auth0.getSession();
	const user = session?.user;

	if (user && user.email) {
		log.debug(`user: ${JSON.stringify(user)}`);
		const encryptedEmail = await encrypt(user.email);
		log.debug(`encryptedEmail: ${encryptedEmail}`);
		const apiResponse = await getCollections(user.email);
		const collections = await apiResponse.json();

		if (collections) {
			log.debug(`collections length: ${collections}`);
			log.debug(`collections: ${JSON.stringify(collections)}`);

			return (
				<div className="w-full p-5">
					<h2 className="text-2xl mb-4">Collections</h2>
					<CollectionsForm user={user} encryptedEmail={encryptedEmail} />
					<div className="flex  mt-4">
						<CollectionsTable
							user={user}
							encryptedEmail={encryptedEmail}
							collections={collections}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="w-full p-5">
					<h2 className="text-2xl mb-4">Collections</h2>
					<p>No collections found.</p>
				</div>
			);
		}
	}
}
