import { sanitizeRollerBlindSize, formatMillimeters } from "./roller-blind-dimensions";

import type { RollerBlindPreviewSummaryProps } from "./types";

/**
 * Компактная карточка с подписью «3D preview» и основными размерами шторы (без WebGL).
 *
 * @param props.width - Ширина в мм (нормализуется теми же правилами, что и сцена).
 * @param props.height - Высота в мм.
 * @param props.depth - Глубина системы в мм; по умолчанию 140.
 * @param props.className - Дополнительные классы для корневого элемента.
 * @returns Статичный блок разметки с типографикой превью.
 */
export const RollerBlindPreviewSummary = ({
  width,
  height,
  depth = 140,
  className,
}: RollerBlindPreviewSummaryProps) => {
  const { width: safeWidth, height: safeHeight, depth: safeDepth } = sanitizeRollerBlindSize(
    width,
    height,
    depth,
  );
  const rootClassName = className
    ? `roller-blind-preview-summary ${className}`
    : "roller-blind-preview-summary";

  return (
    <div className={rootClassName}>
      <p className="roller-blind-preview-summary__eyebrow">3D preview</p>
      <h2 className="roller-blind-preview-summary__title">Рулонная штора</h2>
      <p className="roller-blind-preview-summary__meta">
        {formatMillimeters(safeWidth)} x {formatMillimeters(safeHeight)}
      </p>
      <p className="roller-blind-preview-summary__meta">
        Глубина системы: {formatMillimeters(safeDepth)}
      </p>
    </div>
  );
};
