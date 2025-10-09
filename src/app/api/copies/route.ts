import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(_req: NextApiRequest, res: NextApiResponse) {
  const log = logger.child({ module: "GET_api/copies/" });
  const apiResponse = await fetch(`${apiUrl}/v1/copies`);
  const { data } = await apiResponse.json();
  log.debug(`data: ${JSON.stringify(data)}`);
  return res.status(200).json(data);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const log = logger.child({ module: "POST_api/copies" });
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/v1/copies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return res.status(201).json(data);
}
