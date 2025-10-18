import { auth0 } from "@/lib/auth0";
import { logger } from "@/lib/logger";
import PublisherForm from "./form";
import { PublisherTable } from "./table";
const log = logger.child({ module: "publisher_page" });

export default async function PublishersPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  log.debug(`user: ${JSON.stringify(user)}`);

  if (user) {
    return (
      <div className="w-full p-5">
        <h2 className="text-2xl mb-4">Publishers</h2>
        <PublisherForm user={{ email: user.email }} />
        <div className="flex  mt-4">
          <PublisherTable user={{ email: user.email }} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5">
      <h2 className="text-2xl mb-4">Publishers</h2>
      <p>Please log in to manage publishers.</p>
    </div>
  );
}
