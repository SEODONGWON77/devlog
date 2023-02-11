import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "../../app/components/Header";

export default {
  title: "templates/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => {
  const props = {
    ...args,
  };

  return <Header />;
};

export const Primary = Template.bind({});

Primary.args = {};
