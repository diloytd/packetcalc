/** Поля для 3D-сцены и составного виджета (размеры + палитра). */
export type RollerBlindSceneProps = {
  width: number;
  height: number;
  depth?: number;
  fabricColor: string;
  hardwareColor: string;
  wallColor?: string;
  className?: string;
};

/** Только размеры для текстовой карточки превью (без WebGL). */
export type RollerBlindPreviewSummaryProps = {
  width: number;
  height: number;
  depth?: number;
  className?: string;
};

/** Составной блок: превью + сцена; совпадает по полям с {@link RollerBlindSceneProps}. */
export type RollerBlindViewerProps = RollerBlindSceneProps;
