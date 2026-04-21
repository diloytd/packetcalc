# Включает режим разработчика (нужен для symlink при npm workspaces на Windows).
# Запуск: PowerShell от имени администратора:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
#   & ".\scripts\enable-windows-developer-mode.ps1"

$ErrorActionPreference = "Stop"
$principal = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
  Write-Warning "Нет прав администратора — запись в реестр недоступна. Открываю «Параметры → Для разработчиков» — включи «Режим разработчика» вручную."
  Start-Process "ms-settings:developers"
  exit 1
}

$key = "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\AppModelUnlock"
if (-not (Test-Path $key)) {
  New-Item -Path $key -Force | Out-Null
}
New-ItemProperty -Path $key -Name "AllowDevelopmentWithoutDevLicense" -PropertyType DWord -Value 1 -Force | Out-Null
Write-Host "OK: AllowDevelopmentWithoutDevLicense=1. Перезайди в Windows или перезагрузи ПК, затем в корне репозитория: npm install"
