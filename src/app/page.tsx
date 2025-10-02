import { auth0 } from "@/lib/auth0";
import { encryptString } from "@/lib/encryptString";

export default async function Index() {
  const session = await auth0.getSession();
  const user = session?.user;
  const encryptedEmail = encryptString(user?.email || "");

  return (
    <>
      <h2>Home</h2>
      {user && (
        <ul>
          <li>{user.name}</li>
          <li>{encryptedEmail}</li>
        </ul>
      )}
    </>
  );
}
