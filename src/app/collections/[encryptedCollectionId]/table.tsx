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
import { logger } from "@/lib/logger";

const log = logger.child({
	module: "collections/[encryptedId]/publicationsTable",
});
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
	log.error("API_URL is not defined in environment variables");
	throw new Error("API_URL is not defined in environment variables");
}

export const CollectionTable = (params: {
	user: { email: string | undefined };
	collection: any[] | null;
}) => {
	const { collection } = params;
	if (!collection) {
		return <div>No collection data available.</div>;
	}

	return (
		<HeroTable>
			<HeroTableHeader>
				<HeroTableColumn>ID</HeroTableColumn>
				<HeroTableColumn>Name</HeroTableColumn>
			</HeroTableHeader>
			<HeroTableBody>
				{collection.map((publication: any) => (
					<HeroTableRow
						key={publication.id}
						className="hover:bg-gray-100 text-black"
					>
						<HeroTableCell>{publication.id}</HeroTableCell>
						<HeroTableCell>{publication.name}</HeroTableCell>
					</HeroTableRow>
				))}
			</HeroTableBody>
		</HeroTable>
	);
};
