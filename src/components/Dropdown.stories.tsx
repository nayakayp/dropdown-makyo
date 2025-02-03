import { options } from "../data/options";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "150px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: options,
    placeholder: "Select an option",
    withSearch: true,
    multiple: true,
    onChange: () => {},
  },
};

export const CustomRendering: Story = {
  args: {
    ...Default.args,
    renderOption: (option) => (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
        <span>{option.label}</span>
        <span className="text-gray-400 text-sm">({option.value})</span>
      </div>
    ),
  },
};
