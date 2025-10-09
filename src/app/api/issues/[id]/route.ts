import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const log = logger.child({ module: "GET_api/issues/[id]" });
  const { id } = await params;
  log.debug(`id: ${id}`);
  const apiResponse = await fetch(`${apiUrl}/issues/${id}`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function DELETE(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const log = logger.child({ module: "DELETE_api/issues/[id]" });
  const { id } = await params;
  log.debug(`id: ${id}`);
  const apiResponse = await fetch(`${apiUrl}/issues/${id}`, {
    method: "DELETE",
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function PUT(
  req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const log = logger.child({ module: "PUT_api/issues/[id]" });
  const { id } = await params;
  log.debug(`id: ${id}`);
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/issues/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}
