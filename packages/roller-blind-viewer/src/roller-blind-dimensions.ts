/**
 * Общие ограничения и форматирование размеров рулонной шторы (мм) для UI и 3D-сцены.
 */

const clampValue = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

/**
 * Приводит ширину, высоту и глубину к допустимым диапазонам перед отрисовкой.
 *
 * @param width - Ширина в миллиметрах (кламп 500–2600).
 * @param height - Высота в миллиметрах (кламп 700–2400).
 * @param depth - Глубина системы в миллиметрах (кламп 90–320).
 * @returns Объект с безопасными значениями в тех же единицах.
 */
export const sanitizeRollerBlindSize = (width: number, height: number, depth: number) => ({
  width: clampValue(width, 500, 2600),
  height: clampValue(height, 700, 2400),
  depth: clampValue(depth, 90, 320),
});

/**
 * Форматирует размер в миллиметрах для подписей (целое число + «мм»).
 *
 * @param value - Значение в миллиметрах.
 * @returns Строка вида «1400 мм».
 */
export const formatMillimeters = (value: number) => `${Math.round(value)} мм`;
