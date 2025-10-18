import { auth0 } from "@/lib/auth0";
import { logger } from "@/lib/logger";
import { ItemsTable } from "./table";
import ItemForm from "./form";
import { getItems } from "./service";
const log = logger.child({ module: "collection/[encryptedId]/page" });

export default async function CollectionPage({
	params,
}: {
	params: {
		encryptedCollectionId: string;
		encryptedEmail: string;
	};
}) {
	const session = await auth0.getSession();
	const user = session?.user;
	const { encryptedCollectionId, encryptedEmail } = params;
	log.debug(`user: ${JSON.stringify(user)}`);
	log.debug(`encryptedCollectionId: ${encryptedCollectionId}`);
	const items = await getItems(encryptedEmail, encryptedCollectionId);
	if (user) {
		return (
			<div className="w-full p-5">
				<h2 className="text-2xl mb-4">{}</h2>
				<ItemForm
					encryptedEmail={encryptedEmail}
					encryptedCollectionId={encryptedCollectionId}
				/>
				<div className="flex  mt-4">
					<ItemsTable user={{ email: user.email }} items={items} />
				</div>
			</div>
		);
	}
}
