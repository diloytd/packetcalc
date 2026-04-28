# packetcalc

Монорепозиторий [diloytd/packetcalc](https://github.com/diloytd/packetcalc): приложение `web`, пакет `@diloytd/roller-blind-viewer` (React + React Three Fiber).

## Установка пакета из GitHub Packages

Scope `@diloytd` совпадает с владельцем репозитория на GitHub — так требует [GitHub Packages](https://docs.github.com/packages/learn-github-packages/introduction-to-github-packages).

В проекте-потребителе добавьте `.npmrc`:

```ini
@diloytd:registry=https://npm.pkg.github.com
```

Для приватного пакета нужен токен с `read:packages` ([создание classic PAT](https://github.com/settings/tokens)):

```ini
//npm.pkg.github.com/:_authToken=YOUR_TOKEN
```

Установка:

```bash
npm install @diloytd/roller-blind-viewer
```

## Публикация пакета (локально)

1. Подними версию в `packages/roller-blind-viewer/package.json`.
2. Создай [PAT](https://github.com/settings/tokens) с правом **`write:packages`** (и при необходимости `read:packages`).
3. В корне репозитория (или в профиле npm: `~/.npmrc`) укажи токен для GitHub Packages, например:
   `//npm.pkg.github.com/:_authToken=ТВОЙ_ТОКЕН`
   и scope уже задан в `packages/roller-blind-viewer/.npmrc` (`@diloytd` → `npm.pkg.github.com`).
4. Выполни из корня монорепо:

```bash
npm publish -w @diloytd/roller-blind-viewer
```

Скрипт `prepublishOnly` сам соберёт `dist` перед публикацией.

## Разработка

```bash
npm install
npm run build
npm run typecheck
```
