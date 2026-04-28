import type { Meta, StoryObj } from "@storybook/react-vite";

import { RollerBlindScene } from "../index";

/**
 * Только WebGL-сцена (React Three Fiber), без текстовой плашки превью.
 */
const meta = {
  title: "RollerBlind/Scene",
  component: RollerBlindScene,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number", min: 500, max: 2600, step: 10 },
      description: "Ширина шторы в миллиметрах (500–2600).",
    },
    height: {
      control: { type: "number", min: 700, max: 2400, step: 10 },
      description: "Высота шторы в миллиметрах (700–2400).",
    },
    depth: {
      control: { type: "number", min: 90, max: 320, step: 5 },
      description: "Глубина системы в миллиметрах (90–320).",
    },
    fabricColor: {
      control: "color",
      description: "Цвет полотна.",
    },
    hardwareColor: {
      control: "color",
      description: "Цвет фурнитуры и вала.",
    },
    wallColor: {
      control: "color",
      description: "Цвет стен комнаты.",
    },
  },
} satisfies Meta<typeof RollerBlindScene>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 1400,
    height: 1750,
    depth: 140,
    fabricColor: "#d9c0a4",
    hardwareColor: "#8d93a0",
    wallColor: "#dce9ff",
  },
};
