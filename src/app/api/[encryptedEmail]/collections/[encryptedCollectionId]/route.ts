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
      encryptedId: string;
    }>;
  },
) {
  const log = logger.child({
    module: "GET_api/collections/[encryptedEmail]/[encryptedId]",
  });
  const { encryptedEmail, encryptedId } = await params;
  const apiResponse = await fetch(
    `${apiUrl}/${encryptedEmail}/collections/${encryptedId}`,
  );
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function DELETE(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      encryptedEmail: string;
      encryptedId: string;
    }>;
  },
) {
  const log = logger.child({
    module: "DELETE_api/collections/[encryptedEmail]/[encryptedId]",
  });
  const { encryptedEmail, encryptedId } = await params;
  const apiResponse = await fetch(
    `${apiUrl}/${encryptedEmail}/collections/${encryptedId}`,
    {
      method: "DELETE",
    },
  );
  const { data } = await apiResponse.json();
  log.debug(`data: ${JSON.stringify(data)}`);
  return Response.json(data);
}

export async function PUT(
  req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      encryptedEmail: string;
      encryptedId: string;
    }>;
  },
) {
  const log = logger.child({
    module: "PUT_api/collections/[encryptedEmail]/[encryptedId]",
  });
  const { encryptedEmail, encryptedId } = await params;
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(
    `${apiUrl}/${encryptedEmail}/collections/${encryptedId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const { data } = await apiResponse.json();
  return Response.json(data);
}
