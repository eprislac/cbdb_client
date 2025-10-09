import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@/lib/logger";

const apiUrl = process.env.API_URL;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const log = logger.child({ module: "GET_api/copies/[id]" });
  const { id } = req.query;
  log.debug(`id: ${id}`);
  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }
  const apiResponse = await fetch(`${apiUrl}/v1/copies/${id}`);
  const { data } = await apiResponse.json();
  return res.status(200).json(data);
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const log = logger.child({ module: "DELETE_api/copies/[id]" });
  const { id } = req.query;
  log.debug(`id: ${id}`);
  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }
  const apiResponse = await fetch(`${apiUrl}/copies/${id}`, {
    method: "DELETE",
  });
  const { data } = await apiResponse.json();
  return res.status(200).json(data);
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const log = logger.child({ module: "PUT_api/copies/[id]" });
  const { id } = req.query;
  log.debug(`id: ${id}`);
  if (!id) {
    return res.status(400).json({ error: "ID parameter is required" });
  }
  const body = await req.body();
  log.debug(`body: ${JSON.stringify(body)}`);
  const apiResponse = await fetch(`${apiUrl}/copies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const { data } = await apiResponse.json();
  return res.status(200).json(data);
}
