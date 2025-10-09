import { auth0 } from "@/lib/auth0";
import { logger } from "@/lib/logger";
import CollectionsForm from "./form";
import { CollectionsTable } from "./table";
const log = logger.child({ module: "collections/page" });

export default async function CollectionsPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  log.debug(`user: ${JSON.stringify(user)}`);

  if (user) {
    return (
      <div className="w-full p-5">
        <h2 className="text-2xl mb-4">Collections</h2>
        <CollectionsForm user={{ email: user.email }} />
        <div className="flex  mt-4">
          <CollectionsTable user={{ email: user.email }} />
        </div>
      </div>
    );
  }
}
