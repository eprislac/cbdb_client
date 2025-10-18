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
import { getPublishers } from "./service";
import { logger } from "@/lib/logger";

const log = logger.child({ module: "publishers/table" });
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
  log.error("API_URL is not defined in environment variables");
  throw new Error("API_URL is not defined in environment variables");
}

export const PublisherTable = (params: {
  user: { email: string | undefined };
}) => {
  const { user } = params;
  const [publishers, setPublishers] = useState<
    Array<{ id: string; name: string }>
  >([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      if (user && user.email) {
        try {
          const response = await getPublishers();
          if (!response.ok) {
            throw new Error(
              `Error fetching publishers: ${response.statusText}`,
            );
          }
          const data = await response.json();
          setPublishers(data);
        } catch (error) {
          log.error(`Failed to fetch publishers: ${error}`);
        }
      }
    };

    fetchPublishers();
  }, [user]);

  return (
    <HeroTable>
      <HeroTableHeader>
        <HeroTableColumn>ID</HeroTableColumn>
        <HeroTableColumn>Name</HeroTableColumn>
      </HeroTableHeader>
      <HeroTableBody>
        {publishers.map((publisher) => (
          <HeroTableRow key={publisher.id}>
            <HeroTableCell>{publisher.id}</HeroTableCell>
            <HeroTableCell>{publisher.name}</HeroTableCell>
          </HeroTableRow>
        ))}
      </HeroTableBody>
    </HeroTable>
  );
};
