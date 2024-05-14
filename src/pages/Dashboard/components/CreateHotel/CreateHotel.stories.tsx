import type { Meta, StoryObj } from "@storybook/react"
import CreateHotel from "./CreateHotel"

const meta = {
    title: 'CreateHotel',
    component: CreateHotel,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof CreateHotel>;

export default meta;

type Story = StoryObj<typeof CreateHotel>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
