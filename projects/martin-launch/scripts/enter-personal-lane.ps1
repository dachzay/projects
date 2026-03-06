param(
  [switch]$PrintOnly
)

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$configRoot = Join-Path $repoRoot "config\\personal"
$authRoot = Join-Path $repoRoot ".personal-auth"
$gitConfig = Join-Path $configRoot ".gitconfig"
$npmConfig = Join-Path $repoRoot ".npmrc"
$ghConfig = Join-Path $authRoot "gh"
$wranglerHome = Join-Path $authRoot "wrangler"
$stateNote = Join-Path $authRoot "README.txt"

New-Item -ItemType Directory -Path $authRoot -Force | Out-Null
New-Item -ItemType Directory -Path $ghConfig -Force | Out-Null
New-Item -ItemType Directory -Path $wranglerHome -Force | Out-Null

@(
  "Personal lane auth state lives in this folder.",
  "Git uses: $gitConfig",
  "npm uses: $npmConfig",
  "GitHub CLI config dir: $ghConfig",
  "Wrangler home: $wranglerHome"
) | Set-Content -Path $stateNote -Encoding ascii

$origin = git -C $repoRoot remote get-url origin 2>$null

$banner = @"
Personal lane ready.
Repo: $repoRoot
Git config: $gitConfig
npm config: $npmConfig
GitHub CLI dir: $ghConfig
Wrangler home: $wranglerHome
"@

if ($origin) {
  $banner += "`nCurrent origin: $origin"
  if ($origin -like "*dachzay/projects.git") {
    $banner += "`nWarning: origin still points to the shared projects repo. Replace it before public pushes."
  }
}

if ($PrintOnly) {
  $banner
  return
}

$command = @(
  "`$env:GIT_CONFIG_GLOBAL='$gitConfig'",
  "`$env:NPM_CONFIG_USERCONFIG='$npmConfig'",
  "`$env:GH_CONFIG_DIR='$ghConfig'",
  "`$env:WRANGLER_HOME='$wranglerHome'",
  "Set-Location '$repoRoot'",
  "Write-Host @'",
  $banner,
  "'@",
  "Write-Host ''",
  "Write-Host 'This shell is isolated from your machine-wide work npm registry and Git identity.'"
) -join "; "

Start-Process powershell.exe -ArgumentList @(
  "-NoExit",
  "-ExecutionPolicy",
  "Bypass",
  "-Command",
  $command
)
