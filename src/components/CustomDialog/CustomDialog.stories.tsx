import type { Meta, StoryObj } from "@storybook/react"
import CustomDialog from "./CustomDialog"

const meta = {
    title: 'CustomDialog',
    component: CustomDialog,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof CustomDialog>;

export default meta;

type Story = StoryObj<typeof CustomDialog>;

export const Default = {
    args: {
       
    },
} satisfies Story;
