import type { Meta, StoryObj } from "@storybook/react-vite";

import { RollerBlindPreviewSummary } from "../index";

/**
 * Только плашка «3D preview» и размеры; позиционируется внутри относительного контейнера (как над окном сцены).
 */
const meta = {
  title: "RollerBlind/Preview summary",
  component: RollerBlindPreviewSummary,
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          minHeight: 200,
          padding: 24,
          borderRadius: 24,
          background:
            "radial-gradient(circle at top, rgba(255, 255, 255, 0.75), transparent 38%), linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number", min: 500, max: 2600, step: 10 },
      description: "Ширина шторы в миллиметрах.",
    },
    height: {
      control: { type: "number", min: 700, max: 2400, step: 10 },
      description: "Высота шторы в миллиметрах.",
    },
    depth: {
      control: { type: "number", min: 90, max: 320, step: 5 },
      description: "Глубина системы в миллиметрах.",
    },
  },
} satisfies Meta<typeof RollerBlindPreviewSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1400,
    height: 1750,
    depth: 140,
  },
};
