import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const Template = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

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
    </div>
  );
};

export const Primary = Template.bind({});
