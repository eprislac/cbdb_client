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
import { createPublisher } from "./service";

const log = logger.child({ module: "publishers/form" });

if (!process.env.API_URL) {
  log.error("API_URL is not defined in environment variables");
  throw new Error("API_URL is not defined in environment variables");
}

export default function PublisherForm(params: {
  user: { email: string | undefined };
}) {
  const { user } = params;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "", // Publisher name
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
      alert(`Creating publisher: ${values.name}`);
      setSubmitting(true);
      if (user && user.email) {
        try {
          const apiUrl = process.env.API_URL || "";
          if (!apiUrl) {
            throw new Error("API_URL is not defined in environment variables");
          }

          const response = await createPublisher(values.name);
          if (!response.ok) {
            throw new Error(`Error creating publisher: ${response.statusText}`);
          }
          const data = await response.json();
          log.debug(`Publisher created: ${JSON.stringify(data)}`);
          // Close the modal and reset the form
          onOpenChange();
          resetForm();
        } catch (error) {
          log.error(`Failed to create publisher: ${error}`);
        }
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Button
        variant="flat"
        onClick={onOpen}
        endContent={<PlusCircleIcon className="h-5 w-5" />}
      >
        Add Publisher
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Add Publisher</ModalHeader>
          <ModalBody>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Publisher Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="mt-1 block w-full"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="flat"
                >
                  {formik.isSubmitting ? "Creating..." : "Create Publisher"}
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
