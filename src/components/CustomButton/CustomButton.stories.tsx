import type { Meta } from "@storybook/react"
// import type { Meta, StoryObj } from "@storybook/react"
import CustomButton from "./CustomButton"

const meta = {
    title: 'CustomButton',
    component: CustomButton,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof CustomButton>;

export default meta;

// type Story = StoryObj<typeof CustomButton>;


