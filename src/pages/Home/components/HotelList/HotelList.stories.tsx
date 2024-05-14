import type { Meta, StoryObj } from "@storybook/react"
import HotelList from "./HotelList"

const meta = {
    title: 'HotelList',
    component: HotelList,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof HotelList>;

export default meta;

type Story = StoryObj<typeof HotelList>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
