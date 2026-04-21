import { RollerBlindViewer } from "@roller-blind-viewer/roller-blind-viewer";
import { appName } from "@roller-blind-viewer/shared";
import { useMemo, useState } from "react";

type ViewerConfig = {
  width: number;
  height: number;
  depth: number;
  fabricColor: string;
  hardwareColor: string;
};

type DimensionKey = "width" | "height" | "depth";

const dimensionLimits: Record<DimensionKey, { min: number; max: number; step: number }> = {
  width: { min: 500, max: 2600, step: 10 },
  height: { min: 700, max: 2400, step: 10 },
  depth: { min: 90, max: 320, step: 5 },
};

const clampDimension = (key: DimensionKey, value: number) => {
  const limits = dimensionLimits[key];

  if (value < limits.min) {
    return limits.min;
  }

  if (value > limits.max) {
    return limits.max;
  }

  return value;
};

export const App = () => {
  const [config, setConfig] = useState<ViewerConfig>({
    width: 1400,
    height: 1750,
    depth: 140,
    fabricColor: "#d9c0a4",
    hardwareColor: "#8d93a0",
  });

  const dimensionsLabel = useMemo(() => {
    return `${config.width} x ${config.height} x ${config.depth} мм`;
  }, [config.depth, config.height, config.width]);

  const handleDimensionChange = (key: DimensionKey, rawValue: string) => {
    const parsedValue = Number(rawValue);

    if (Number.isNaN(parsedValue)) {
      return;
    }

    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: clampDimension(key, parsedValue),
    }));
  };

  const handleColorChange = (key: "fabricColor" | "hardwareColor", value: string) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      [key]: value,
    }));
  };

  return (
    <main className="app-shell">
      <section className="app-shell__intro">
        <p className="app-shell__eyebrow">{appName}</p>
        <h1 className="app-shell__title">3D просмотрщик рулонных штор</h1>
        <p className="app-shell__text">
          Тестовый стенд для проверки размеров, цвета ткани и цвета фурнитуры.
        </p>
      </section>

      <section className="app-layout">
        <aside className="control-panel" aria-label="Параметры рулонной шторы">
          <div className="control-panel__header">
            <h2 className="control-panel__title">Параметры</h2>
            <p className="control-panel__summary">{dimensionsLabel}</p>
          </div>

          <div className="control-field">
            <label className="control-field__label" htmlFor="blind-width">
              Ширина
            </label>
            <div className="control-field__inputs">
              <input
                id="blind-width"
                className="control-field__range"
                type="range"
                min={dimensionLimits.width.min}
                max={dimensionLimits.width.max}
                step={dimensionLimits.width.step}
                value={config.width}
                onChange={(event) => handleDimensionChange("width", event.target.value)}
                aria-label="Ширина рулонной шторы"
              />
              <input
                className="control-field__number"
                type="number"
                min={dimensionLimits.width.min}
                max={dimensionLimits.width.max}
                step={dimensionLimits.width.step}
                value={config.width}
                onChange={(event) => handleDimensionChange("width", event.target.value)}
                aria-label="Числовое значение ширины рулонной шторы"
              />
            </div>
          </div>

          <div className="control-field">
            <label className="control-field__label" htmlFor="blind-height">
              Высота
            </label>
            <div className="control-field__inputs">
              <input
                id="blind-height"
                className="control-field__range"
                type="range"
                min={dimensionLimits.height.min}
                max={dimensionLimits.height.max}
                step={dimensionLimits.height.step}
                value={config.height}
                onChange={(event) => handleDimensionChange("height", event.target.value)}
                aria-label="Высота рулонной шторы"
              />
              <input
                className="control-field__number"
                type="number"
                min={dimensionLimits.height.min}
                max={dimensionLimits.height.max}
                step={dimensionLimits.height.step}
                value={config.height}
                onChange={(event) => handleDimensionChange("height", event.target.value)}
                aria-label="Числовое значение высоты рулонной шторы"
              />
            </div>
          </div>

          <div className="control-field">
            <label className="control-field__label" htmlFor="blind-depth">
              Глубина системы
            </label>
            <div className="control-field__inputs">
              <input
                id="blind-depth"
                className="control-field__range"
                type="range"
                min={dimensionLimits.depth.min}
                max={dimensionLimits.depth.max}
                step={dimensionLimits.depth.step}
                value={config.depth}
                onChange={(event) => handleDimensionChange("depth", event.target.value)}
                aria-label="Глубина системы рулонной шторы"
              />
              <input
                className="control-field__number"
                type="number"
                min={dimensionLimits.depth.min}
                max={dimensionLimits.depth.max}
                step={dimensionLimits.depth.step}
                value={config.depth}
                onChange={(event) => handleDimensionChange("depth", event.target.value)}
                aria-label="Числовое значение глубины системы"
              />
            </div>
          </div>

          <div className="control-field control-field--colors">
            <label className="control-field__label" htmlFor="fabric-color">
              Цвет ткани
            </label>
            <div className="control-field__color-row">
              <input
                id="fabric-color"
                className="control-field__color"
                type="color"
                value={config.fabricColor}
                onChange={(event) => handleColorChange("fabricColor", event.target.value)}
                aria-label="Выбрать цвет ткани"
              />
              <span className="control-field__value">{config.fabricColor}</span>
            </div>
          </div>

          <div className="control-field control-field--colors">
            <label className="control-field__label" htmlFor="hardware-color">
              Цвет фурнитуры
            </label>
            <div className="control-field__color-row">
              <input
                id="hardware-color"
                className="control-field__color"
                type="color"
                value={config.hardwareColor}
                onChange={(event) => handleColorChange("hardwareColor", event.target.value)}
                aria-label="Выбрать цвет фурнитуры"
              />
              <span className="control-field__value">{config.hardwareColor}</span>
            </div>
          </div>
        </aside>

        <section className="viewer-panel" aria-label="3D-сцена">
          <RollerBlindViewer
            width={config.width}
            height={config.height}
            depth={config.depth}
            fabricColor={config.fabricColor}
            hardwareColor={config.hardwareColor}
          />
        </section>
      </section>
    </main>
  );
};
