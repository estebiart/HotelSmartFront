import type { Meta, StoryObj } from "@storybook/react"
import BookingForm from "./BookingForm"

const meta = {
    title: 'BookingForm',
    component: BookingForm,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof BookingForm>;

export default meta;

type Story = StoryObj<typeof BookingForm>;

export const Default = {
    args: {
    },
} satisfies Story;
