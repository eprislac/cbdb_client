"use client";
import React, { useEffect, useState } from "react";
import {
  Table as HeroTable,
  TableHeader as HeroTableHeader,
  TableBody as HeroTableBody,
  TableRow as HeroTableRow,
  TableCell as HeroTableCell,
  TableColumn as HeroTableColumn,
} from "@heroui/react";
import { getPublicationTypes } from "./service";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "publication_types/table" });
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
  log.error("API_URL is not defined in environment variables");
  throw new Error("API_URL is not defined in environment variables");
}

export const PublicationTypesTable = (params: {
  user: { email: string | undefined };
}) => {
  const { user } = params;
  const [publicationTypes, setPublicationTypes] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    const fetchPublicationTypes = async () => {
      if (user) {
        try {
          const response = await getPublicationTypes();
          if (!response.ok) {
            throw new Error(
              `Error fetching publication types: ${response.statusText}`,
            );
          }
          const data = await response.json();
          setPublicationTypes(data);
        } catch (error) {
          log.error(`Failed to fetch publication types: ${error}`);
        }
      }
    };

    fetchPublicationTypes();
  }, [user]);

  return (
    <HeroTable>
      <HeroTableHeader>
        <HeroTableColumn>ID</HeroTableColumn>
        <HeroTableColumn>Name</HeroTableColumn>
      </HeroTableHeader>
      <HeroTableBody>
        {publicationTypes.map((pubType) => (
          <HeroTableRow key={pubType.id}>
            <HeroTableCell>{pubType.id}</HeroTableCell>
            <HeroTableCell>{pubType.name}</HeroTableCell>
          </HeroTableRow>
        ))}
      </HeroTableBody>
    </HeroTable>
  );
};
