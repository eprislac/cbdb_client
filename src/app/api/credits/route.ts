import { NextApiRequest } from "next";

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
  const log = logger.child({ module: "GET_api/credits/[id]" });
  const { id } = await params;
  log.debug(`id: ${id}`);
  const apiResponse = await fetch(`${apiUrl}/credits/${id}`);
  const { data } = await apiResponse.json();
  return Response.json(data);
}
