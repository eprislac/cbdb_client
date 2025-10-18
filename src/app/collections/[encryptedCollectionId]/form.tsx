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

const log = logger.child({ module: "collections/form" });

if (!process.env.API_URL) {
	log.error("API_URL is not defined in environment variables");
	throw new Error("API_URL is not defined in environment variables");
}

export default function CollectionItemForm(params: {
	user: { email: string | undefined };
	encryptedId: string;
}) {
	const { user, encryptedId } = params;
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const formik = useFormik({
		initialValues: {
			name: "", // Collection name
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.max(50, "Must be 50 characters or less")
				.required("Required"),
		}),
		onSubmit: async (
			values: { name: string },
			{ setSubmitting, resetForm },
		) => {
			log.debug("Submitting form...");
			setSubmitting(true);
			if (user && user.email) {
				try {
					const apiUrl = process.env.API_URL || "";
					if (!apiUrl) {
						throw new Error("API_URL is not defined in environment variables");
					}
					const encryptedEmail = await encrypt(user.email);
					const response = await addItem(encryptedEmail, encryptedId, values);
					if (!response.ok) {
						throw new Error(
							`Error creating collection: ${response.statusText}`,
						);
					}
					const data = await response.json();
					log.debug(`Collection created: ${JSON.stringify(data)}`);
					resetForm();
				} catch (error) {
					log.error(`Failed to create collection: ${error}`);
				} finally {
					setSubmitting(false);
				}
			}
		},
	});

	return (
		<div className="w-full flex justify-end mb-4 p-5 ">
			<Button
				className="rounded-xl"
				onPress={onOpen}
				endContent={<PlusCircleIcon />}
			>
				New Collection
			</Button>
			<div className="">
				<Modal
					className="rounded-xl  bg-gray-700 col-span-3 col-start-3"
					isOpen={isOpen}
					onOpenChange={onOpenChange}
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>Add Item</ModalHeader>
								<ModalBody>
									<form onSubmit={formik.handleSubmit}>
										<div className="mb-4">
											<label htmlFor="name">Name</label>
											<Input
												id="name"
												name="name"
												type="name"
												onChange={formik.handleChange}
												value={formik.values.name}
											/>
										</div>
										<Button type="submit">Submit</Button>
									</form>
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</div>
	);
}
