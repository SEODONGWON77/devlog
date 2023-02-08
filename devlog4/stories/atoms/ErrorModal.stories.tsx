import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ErrorModal from '../../app/components/error-modal';

export default {
  title: "atoms/ErrorModal",
  component: ErrorModal
} as ComponentMeta<typeof ErrorModal>;

const Template: ComponentStory<typeof ErrorModal> = (args) => {
  const [ isOpen, setOpen ] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Modal 열기
        </button>
      </div>
      <ErrorModal {...args} isOpen={isOpen}  closeModal={closeModal}>
        <div>
          <p className="text-red-600 text-md">
            error modal입니다. error modal입니다. 
            error modal입니다. error modal입니다.
            error modal입니다. error modal입니다.
            error modal입니다. error modal입니다.
          </p>
        </div>
      </ErrorModal>
    </div>
  );
}

export const Primary = Template.bind({});

Primary.args = {
  title: "Error modal 입니다."
}