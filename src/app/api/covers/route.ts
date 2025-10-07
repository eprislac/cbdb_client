import type { NextApiRequest } from "next";
import { logger } from "@/lib/logger";
const apiUrl = process.env.API_URL;

export async function GET(_req: NextApiRequest) {
  const log = logger.child({ module: "GET_api/covers/" });
  const apiResponse = await fetch(`${apiUrl}/v1/covers/`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}

export async function POST(req: NextApiRequest) {
  const log = logger.child({ module: "POST_api/covers" });
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/v1/covers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return Response.json(data);
}
