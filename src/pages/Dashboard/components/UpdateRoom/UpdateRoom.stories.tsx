import type { Meta, StoryObj } from "@storybook/react"
import UpdateRoom from "./UpdateRoom"

const meta = {
    title: 'UpdateRoom',
    component: UpdateRoom,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof UpdateRoom>;

export default meta;

type Story = StoryObj<typeof UpdateRoom>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
