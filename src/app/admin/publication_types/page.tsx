import { auth0 } from "@/lib/auth0";
import { logger } from "@/lib/logger";
import PublicationTypesForm from "./form";
import { PublicationTypesTable } from "./table";
const log = logger.child({ module: "publication_types/page" });

export default async function PublicationTypesPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  log.debug(`user: ${JSON.stringify(user)}`);

  if (user) {
    return (
      <div className="w-full p-5">
        <h2 className="text-2xl mb-4">Publication Types</h2>
        <PublicationTypesForm user={{ email: user.email }} />
        <div className="flex  mt-4">
          <PublicationTypesTable user={{ email: user.email }} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full p-5">
      <h2 className="text-2xl mb4">Publication Types</h2>
      <p>Please log in to manage Publication Types</p>
    </div>
  );
}
