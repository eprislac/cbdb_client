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
	module: "items/table",
});
const apiUrl = process.env.API_URL || "";

if (!apiUrl) {
	log.error("API_URL is not defined in environment variables");
	throw new Error("API_URL is not defined in environment variables");
}

export const ItemsTable = (params: {
	user: { email: string | undefined };
	items: any[] | null;
}) => {
	const { items } = params;
	if (!items) {
		return <div>No items data available.</div>;
	}

	return (
		<HeroTable>
			<HeroTableHeader>
				<HeroTableColumn>ID</HeroTableColumn>
				<HeroTableColumn>Name</HeroTableColumn>
			</HeroTableHeader>
			<HeroTableBody>
				{items.map((item: any) => (
					<HeroTableRow key={item.id} className="hover:bg-gray-100 text-black">
						<HeroTableCell>{item.id}</HeroTableCell>
						<HeroTableCell>{item.name}</HeroTableCell>
					</HeroTableRow>
				))}
			</HeroTableBody>
		</HeroTable>
	);
};
