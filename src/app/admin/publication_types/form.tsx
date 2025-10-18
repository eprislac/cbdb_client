"use client";
import * as Yup from "yup";
import { useState } from "react";
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
import { createPublicationType } from "./service";

const log = logger.child({ module: "publication_types/form" });

if (!process.env.API_URL) {
  log.error("API_URL is not defined in environment variables");
  throw new Error("API_URL is not defined in environment variables");
}

export default function PublicationTypesForm(params: {
  user: { email: string | undefined };
}) {
  const { user } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "", // Publication type name
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
      alert(`Creating publication type: ${values.name}`);
      setSubmitting(true);
      if (user && user.email) {
        try {
          const apiUrl = process.env.API_URL || "";
          if (!apiUrl) {
            throw new Error("API_URL is not defined in environment variables");
          }

          const response = await createPublicationType(values.name);
          if (!response.ok) {
            throw new Error(
              `Error creating publication type: ${response.statusText}`,
            );
          }
          const data = await response.json();
          log.debug(`Publication type created: ${JSON.stringify(data)}`);
          alert(`Publication type created: ${data.name}`);
          resetForm();
          onOpenChange();
          // Optionally, trigger a refresh or update the list of publication types here
        } catch (error) {
          log.error(`Error: ${error}`);
          alert(`Error creating publication type: ${error}`);
        } finally {
          setSubmitting(false);
        }
      } else {
        log.error("User email is not available");
        alert("User email is not available");
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Button variant="flat" onClick={onOpen}>
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        Add Publication Type
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-lg">
          <ModalHeader className="font-bold text-lg">
            New Publication Type
          </ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-1 block w-full"
                  placeholder="Enter publication type name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="flat" onPress={() => onOpenChange()}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="flat"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
