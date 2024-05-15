import type { Meta, StoryObj } from "@storybook/react"
import BannerHome from "./BannerHome"

const meta = {
    title: 'BannerHome',
    component: BannerHome,
    tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {},
} satisfies Meta<typeof BannerHome>;

export default meta;

type Story = StoryObj<typeof BannerHome>;

export const Default = {
    args: {
    },
} satisfies Story;
