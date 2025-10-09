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
import { getCollections } from "./service";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "collections/table" });
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
  log.error("API_URL is not defined in environment variables");
  throw new Error("API_URL is not defined in environment variables");
}

export const CollectionsTable = (params: {
  user: { email: string | undefined };
}) => {
  const { user } = params;
  const [collections, setCollections] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (user && user.email) {
        try {
          log.debug(`Fetching collections for: ${user.email}`);
          const response = await getCollections(user.email);
          if (!response.ok) {
            throw new Error(
              `Error fetching collections: ${response.statusText}`,
            );
          }
          const data = await response.json();
          setCollections(data);
        } catch (error) {
          log.error(`Failed to fetch collections: ${error}`);
        }
      }
    };

    fetchCollections();
  }, [user]);

  return (
    <HeroTable>
      <HeroTableHeader>
        <HeroTableColumn>ID</HeroTableColumn>
        <HeroTableColumn>Name</HeroTableColumn>
      </HeroTableHeader>
      <HeroTableBody>
        {collections.map((collection) => (
          <HeroTableRow
            key={collection.id}
            className="hover:bg-gray-100 text-black"
          >
            <HeroTableCell>{collection.id}</HeroTableCell>
            <HeroTableCell>{collection.name}</HeroTableCell>
          </HeroTableRow>
        ))}
      </HeroTableBody>
    </HeroTable>
  );
};
