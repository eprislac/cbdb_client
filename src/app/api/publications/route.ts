import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";
const apiUrl = process.env.API_URL;

export async function GET(_req: NextApiRequest) {
  const log = logger.child({ module: "GET_api/publications/" });
  const apiResponse = await fetch(`${apiUrl}/v1/publications/`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function POST(req: NextApiRequest) {
  const log = logger.child({ module: "POST_api/publications" });
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/v1/publications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}
