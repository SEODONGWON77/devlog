import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  position?: string;
}

export const BaseModal = ({ isOpen, closeModal, children, position }: React.PropsWithChildren<ModalProps>) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-20 overflow-y-auto ${position === "left" ? "" : "text-center"}`}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0" />
        </Transition.Child>

        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className={`inline-block overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 border-solid rounded-lg shadow-xl`}
          >
            {children}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default BaseModal;
