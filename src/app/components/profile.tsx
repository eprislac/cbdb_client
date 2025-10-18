import { auth0 } from "@/lib/auth0";
import Link from "next/link";
import { Avatar } from "@heroui/avatar";
import { logger } from "@/lib/logger";
import { encrypt } from "@/lib/encryptionService";

export default async function Profile() {
	const log = logger.child({ module: "Profile" });
	const session = await auth0.getSession();

	const user = session?.user;
	if (user && user.email) {
		log.debug(`user: ${JSON.stringify(user)}`);
		log.debug(`user.email: ${user.email}`);
		log.debug(`user.name: ${user.name}`);
		// Encrypt the email before sending it to the API
		const encryptedEmail = await encrypt(user.email || "");
		log.debug(`encryptedEmail: ${encryptedEmail}`);
		const params = {
			headers: { "Content-Type": "application/json" },
			method: "GET",
			email: user.email,
			name: user.name,
		};
		// Fetch user data from internal API

		const appDataReq = await fetch(
			`${process.env.APP_INTERNAL_URL}/api/users/${encryptedEmail}`,
			params,
		);
		log.debug(
			`Fetching app user data from internal API: ${process.env.APP_INTERNAL_URL}/api/users/${encryptedEmail}?email=${user.email}`,
		);
		log.debug(`appDataReq.status: ${appDataReq.status}`);
		if (!appDataReq.ok) {
			throw new Error(
				`Failed to fetch app user data: ${appDataReq.statusText}`,
			);
		}
		const appUser = await appDataReq.json();
		log.debug(`appUser: ${appUser}`);
		user.id = appUser.id;
		log.debug(`{id: ${user.id}}`);
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
