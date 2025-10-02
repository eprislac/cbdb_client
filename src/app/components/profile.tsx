import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { logger } from "@/lib/logger";
import { encrypt } from "@/lib/encryptionService";

export default async function Profile() {
  const log = logger.child({ module: "Profile" });
  const session = await auth0.getSession();

  const user = session?.user;
  if (user) {
    const encryptedEmail = await encrypt(user.email || "");
    const appDataReq = await fetch(
      `${process.env.APP_BASE_URL}/api/users/${encryptedEmail}?name=${user.name}&email=${user.email}`,
    );
    const appUser = await appDataReq.json();
    log.debug(`appUser: ${appUser}`);
    session.user.id = appUser.id;
    log.debug(`{id: ${session.user.id}}`);
  }
  return user ? (
    <div className="w-60 p-5 flex items-center">
      <Avatar isBordered radius="full" src={user.picture} alt={user.name} />{" "}
      <div className="pl-3">
        {user.name}
        <br />
        <Link href="/auth/logout">Logout</Link>
      </div>
    </div>
  ) : (
    <div className="w-60 p-5 flex items-center">
      <Link href="/auth/login">Login</Link>
    </div>
  );
}
