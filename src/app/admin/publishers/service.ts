import { logger } from "@/lib/logger";

const log = logger.child({ module: "publishersService" });

export async function getPublishers() {
  log.debug("Fetching publishers...");
  const apiResponse = await fetch(`/api/publishers`);
  if (apiResponse.ok) {
    log.debug(`API response OK: ${JSON.stringify(apiResponse)}`);
    const data = await apiResponse.json();
    log.debug(`Fetched publishers: ${JSON.stringify(data)}`);
    return Response.json(data);
  }
  log.error(`Failed to fetch publishers: ${apiResponse.statusText}`);
  return Response.json([]);
}

export async function createPublisher(name: string) {
  log.debug("Creating publisher...");
  if (!name || name.trim() === "") {
    log.error("Publisher name is required");
    return null;
  }
  if (name.length > 50) {
    log.error("Publisher name must be 50 characters or less");
    return null;
  }
  log.debug(`API URL: /api/publishers`);
  log.debug(`Request name (line 24): ${name}`);
  const apiResponse = await fetch(`/api/publishers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publisher: { name: name } }),
  });
  if (apiResponse.ok) {
    log.debug("API response OK");
    const { data } = await apiResponse.json();
    return data;
  }
  log.error(`Failed to create publisher: ${apiResponse.statusText}`);
  return null;
}
