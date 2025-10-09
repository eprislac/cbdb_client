import { auth0 } from "@/lib/auth0";
import "./main.css";

export default async function Index() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <>
      <h2>Home</h2>
      {user && (
        <ul>
          <li>{user.name}</li>
        </ul>
      )}
    </>
  );
}
