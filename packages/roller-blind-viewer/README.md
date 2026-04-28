# @diloytd/roller-blind-viewer

Компоненты превью рулонной шторы (React, React Three Fiber, Three.js).  
Исходный код — в репозитории [diloytd/packetcalc](https://github.com/diloytd/packetcalc).

## Установка (GitHub Packages)

В `.npmrc` проекта:

```ini
@diloytd:registry=https://npm.pkg.github.com
```

При необходимости — токен с `read:packages` для приватного реестра.

```bash
npm install @diloytd/roller-blind-viewer
```

## Использование

```tsx
import { RollerBlindViewer } from "@diloytd/roller-blind-viewer";

export const App = () => (
  <RollerBlindViewer width={1200} height={1500} fabricColor="#c9a27a" hardwareColor="#444" />
);
```

Стили подключаются при импорте entry-пакета. При необходимости можно импортировать CSS отдельно:

```ts
import "@diloytd/roller-blind-viewer/roller-blind-viewer.css";
```

## Peer-зависимости

`react`, `react-dom`, `three`, `@react-three/fiber`, `@react-three/drei` — должны быть установлены в приложении.
