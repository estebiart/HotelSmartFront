import type { Meta, StoryObj } from "@storybook/react"
import {CustomInput} from "./CustomInput"

const meta = {
    title: 'CustomInput',
    component: CustomInput,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof CustomInput>;

export default meta;

type Story = StoryObj<typeof CustomInput>;

export const Default = {
    args: {
        // props
    },
} satisfies Story;
