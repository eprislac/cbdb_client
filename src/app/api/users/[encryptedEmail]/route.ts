import type { NextApiRequest } from "next";
import { encrypt } from "@/lib/encryptionService";
import { logger } from "@/lib/logger";
// const apiUrl = process.env.API_URL;

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      email?: string;
      name?: string;
      encryptedEmail: string;
    }>;
  },
) {
  const log = logger.child({ module: "GET_api/users/[encryptedEmail]" });
  const user = await params;
  const { name, email, encryptedEmail } = user;
  log.debug(`email: ${email}`);
  log.debug(`name: ${name}`);
  log.debug(`encryptedEmail: ${encryptedEmail}`);
  const apiResponse = await fetch(
    `http://api/api/v1/users/by_enc_str/${encryptedEmail}`,
  );
  const { data, message } = await apiResponse.json();
  let newData = data;
  const { id } = data;
  if (message === "Not Found") {
    const params: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
        },
      }),
    };
    const createResponse = await fetch(`http://api/api/v1/users`, params);
    newData = await createResponse.json();
  } else {
    newData = {
      id: id,
      name: name,
      email: email,
    };
  }
  return Response.json(newData);
}
