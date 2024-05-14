import type { Meta, StoryObj } from "@storybook/react"
import HotelCard from "./HotelCard"

const meta = {
    title: 'HotelCard',
    component: HotelCard,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof HotelCard>;

export default meta;

type Story = StoryObj<typeof HotelCard>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
