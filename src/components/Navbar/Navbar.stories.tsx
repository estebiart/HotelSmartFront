import type { Meta, StoryObj } from "@storybook/react"
import Navbar from "./Navbar"

const meta = {
    title: 'Navbar',
    component: Navbar,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default = {
    args: {
    },
} satisfies Story;
