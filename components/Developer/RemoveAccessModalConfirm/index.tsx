import React, { useState, useRef } from "react";
import {
  ChakraProvider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  extendTheme,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef?: React.RefObject<HTMLInputElement>;
};

export default function RemoveAccessModalConfirm({
  isOpen,
  onClose,
  cancelRef,
}: Props) {
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Access
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&rsquo;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" onClick={onClose} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
