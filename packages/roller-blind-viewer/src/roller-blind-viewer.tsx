import { RollerBlindPreviewSummary } from "./roller-blind-preview-summary";
import { RollerBlindScene } from "./roller-blind-scene";

import type { RollerBlindViewerProps } from "./types";

/**
 * Составной виджет: текстовое превью размеров и 3D-сцена в одной карточке.
 *
 * @param props - Те же поля, что у {@link RollerBlindScene}: размеры, цвета и опциональный `className` корневой секции.
 * @returns Секция с абсолютно позиционированным превью и блоком canvas.
 */
export const RollerBlindViewer = ({
  width,
  height,
  depth = 140,
  fabricColor,
  hardwareColor,
  wallColor = "#dce9ff",
  className,
}: RollerBlindViewerProps) => {
  const rootClassName = className
    ? `roller-blind-viewer ${className}`
    : "roller-blind-viewer";

  return (
    <section className={rootClassName}>
      <RollerBlindPreviewSummary width={width} height={height} depth={depth} />
      <RollerBlindScene
        width={width}
        height={height}
        depth={depth}
        fabricColor={fabricColor}
        hardwareColor={hardwareColor}
        wallColor={wallColor}
      />
    </section>
  );
};
