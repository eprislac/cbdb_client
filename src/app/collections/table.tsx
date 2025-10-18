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

const log = logger.child({ module: "collections/table" });
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
	log.error("API_URL is not defined in environment variables");
	throw new Error("API_URL is not defined in environment variables");
}

export const CollectionsTable = (params: {
	user: { email?: string; name?: string };
	encryptedEmail?: string;
	collections: any[];
}) => {
	const { user, encryptedEmail, collections } = params;
	const [clickedRow, setClickedRow] = useState(null);

	useEffect(() => {
		if (clickedRow) {
			alert(`Navigating to collection ID: ${clickedRow}`);
			const id = clickedRow;
			const url = `/collections/${encryptedEmail}/${id}?encryptedEmail=${encodeURIComponent(encryptedEmail || "")}`;
			window.location.href = url;
		}
	}, [clickedRow, user.email, encryptedEmail]);

	const handleRowClick = (row: any) => {
		setClickedRow(row);
	};

	return (
		<HeroTable onRowAction={handleRowClick}>
			<HeroTableHeader>
				<HeroTableColumn>ID</HeroTableColumn>
				<HeroTableColumn>Name</HeroTableColumn>
			</HeroTableHeader>
			<HeroTableBody>
				{collections.map((collection: any) => (
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
