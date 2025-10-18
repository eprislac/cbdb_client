import { logger } from "@/lib/logger";

const log = logger.child({ module: "publicationTypesService" });

export async function getPublicationTypes() {
  log.debug("Fetching publication types...");
  const apiResponse = await fetch(`/api/publication_types`);
  if (apiResponse.ok) {
    log.debug(`API response OK: ${JSON.stringify(apiResponse)}`);
    const data = await apiResponse.json();
    log.debug(`Fetched publication types: ${JSON.stringify(data)}`);
    return Response.json(data);
  }
  log.error(`Failed to fetch publication types: ${apiResponse.statusText}`);
  return Response.json([]);
}

export async function createPublicationType(name: string) {
  log.debug("Creating publication type...");
  if (!name || name.trim() === "") {
    log.error("Publication type name is required");
    return null;
  }
  if (name.length > 50) {
    log.error("Publication type name must be 50 characters or less");
    return null;
  }
  log.debug(`API URL: /api/publication_types`);
  log.debug(`Request name (line 24): ${name}`);
  const apiResponse = await fetch(`/api/publication_types`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ publication_type: { name: name } }),
  });
  if (apiResponse.ok) {
    log.debug("API response OK");
    const { data } = await apiResponse.json();
    return data;
  }
  log.error(`Failed to create publication type: ${apiResponse.statusText}`);
  return null;
}
