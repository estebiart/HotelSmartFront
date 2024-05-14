import type { Meta, StoryObj } from "@storybook/react"
import Search from "./Search"

const meta = {
    title: 'Search',
    component: Search,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof Search>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
