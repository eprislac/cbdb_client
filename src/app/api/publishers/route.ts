import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(
  _req: NextApiRequest,
  {
    params,
  }: {
    params: Promise<{
      publisherId: string;
    }>;
  },
) {
  const log = logger.child({ module: "GET_api/publishers/" });
  const { publisherId } = await params;
  log.debug(`publisherId: ${publisherId}`);
  const apiResponse = await fetch(`${apiUrl}/v1/publishers/`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function POST(req: NextApiRequest) {
  const log = logger.child({ module: "POST_api/publishers" });
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/publishers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}
