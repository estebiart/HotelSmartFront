import type { Meta, StoryObj } from "@storybook/react"
import Footer from "./Footer"

const meta = {
    title: 'Footer',
    component: Footer,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
