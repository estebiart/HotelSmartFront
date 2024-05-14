import type { Meta, StoryObj } from "@storybook/react"
import UpdateHotel from "./UpdateHotel"

const meta = {
    title: 'UpdateHotel',
    component: UpdateHotel,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof UpdateHotel>;

export default meta;

type Story = StoryObj<typeof UpdateHotel>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
