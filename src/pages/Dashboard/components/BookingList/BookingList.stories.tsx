import type { Meta, StoryObj } from "@storybook/react"
import BookingList from "./BookingList"

const meta = {
    title: 'BookingList',
    component: BookingList,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof BookingList>;

export default meta;

type Story = StoryObj<typeof BookingList>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
