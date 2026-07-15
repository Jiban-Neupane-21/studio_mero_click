# Studio Mero Click - Project Setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Studio Mero Click - Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Checking Node.js environment..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ERROR: Node.js not found. Install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host "[2/3] Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "  Dependencies installed." -ForegroundColor Green

Write-Host "[3/3] Verifying environment..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "  .env file found." -ForegroundColor Green
} else {
    Write-Host "  WARNING: .env not found. Copy .env.example to .env and fill in your Supabase credentials." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Setup Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Start development server: npm run dev" -ForegroundColor White
Write-Host "Open: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Environment variables required in .env:" -ForegroundColor White
Write-Host "  VITE_SUPABASE_URL=your_supabase_url" -ForegroundColor Gray
Write-Host "  VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key" -ForegroundColor Gray
