import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      encryptedEmail: string;
    }>;
  },
) {
  const log = logger.child({ module: "GET_api/collections/[encryptedEmail]/" });
  const { encryptedEmail } = await params;
  const apiResponse = await fetch(`${apiUrl}/${encryptedEmail}/collections`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function POST(
  req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      encryptedEmail: string;
      name: string;
    }>;
  },
) {
  const log = logger.child({
    module: "POST_api/collections/[encryptedEmail]/",
  });
  const { encryptedEmail } = await params;
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/${encryptedEmail}/collections`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}
