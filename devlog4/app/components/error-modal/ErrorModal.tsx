import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  title?: string;
  isOpen: boolean;
  closeModal: () => void;
  titleColor?: string;
  modalWidth?: string;
  children:React.ReactNode
}


export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  closeModal,
  modalWidth = "w-auto",
  children
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-dimmed"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">

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

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
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

            <div className={`inline-block ${modalWidth} max-w-md mt-8 overflow-hidden text-left align-middle transition-all transform bg-white border border-gray-300 border-solid rounded-lg shadow-xl`}>

              <div className="flex justify-start px-6 pt-6 pb-4">

                <div className="flex items-center justify-center flex-shrink-0 bg-red-100 rounded-full w-9 h-9">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>

                <div className="flex-auto h-full ml-3">

                  { title ?
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-start text-lg font-medium text-gray-900 h-9"
                    > 
                      <span className="relative inline-block">
                        {title}
                      </span>
                    </Dialog.Title>
                    : null
                  }

                  <div className="py-3">
                    {children}
                  </div>
                  
                </div>

              </div>

              <div className="flex items-center justify-end px-6 py-3 bg-zinc-50">
                <button
                  color="red"
                  onClick={closeModal}
                >
                  확인
                </button>
              </div>
              
            </div>
          </Transition.Child>
          
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
