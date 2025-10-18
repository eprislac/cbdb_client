"use client";
import * as Yup from "yup";
import {
	Button,
	Modal,
	ModalHeader,
	ModalContent,
	ModalBody,
	Input,
	useDisclosure,
} from "@heroui/react";
import { logger } from "@/lib/logger";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { addItem } from "./service";
import { encrypt } from "@/lib/encryptionService";

const log = logger.child({ module: "items/form" });

export default function ItemForm(params: {
	encryptedEmail: string;
	encryptedCollectionId: string;
}) {
	const { encryptedEmail, encryptedCollectionId } = params;

	return <div>Item Form Placeholder</div>;
}
