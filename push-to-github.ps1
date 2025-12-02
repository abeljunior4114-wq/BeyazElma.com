# Script to push BeyazElma website to GitHub
# Usage: .\push-to-github.ps1

Write-Host "=== BeyazElma GitHub Push Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote 'origin' already exists: $remoteExists" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to update it? (y/n)"
    if ($overwrite -eq "y") {
        Write-Host "Please provide your GitHub repository URL:" -ForegroundColor Cyan
        $repoUrl = Read-Host "Repository URL (e.g., https://github.com/username/repo.git)"
        git remote set-url origin $repoUrl
    } else {
        Write-Host "Using existing remote..." -ForegroundColor Green
    }
} else {
    Write-Host "Please provide your GitHub repository URL:" -ForegroundColor Cyan
    Write-Host "Example: https://github.com/username/BeyazElma.com.git" -ForegroundColor Gray
    $repoUrl = Read-Host "Repository URL"
    
    if ($repoUrl) {
        git remote add origin $repoUrl
        Write-Host "Remote added successfully!" -ForegroundColor Green
    } else {
        Write-Host "No URL provided. Exiting." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Visit your repository on GitHub" -ForegroundColor White
    Write-Host "2. Deploy to Vercel: https://vercel.com/new (import your GitHub repo)" -ForegroundColor White
    Write-Host "   - Vercel will auto-detect Next.js and deploy your site" -ForegroundColor Gray
    Write-Host "   - Your site will be live at: https://your-repo.vercel.app" -ForegroundColor Gray
} else {
    Write-Host ""
    Write-Host "Push failed. Please check:" -ForegroundColor Red
    Write-Host "  - Your GitHub credentials are set up" -ForegroundColor Yellow
    Write-Host "  - The repository URL is correct" -ForegroundColor Yellow
    Write-Host "  - You have push access to the repository" -ForegroundColor Yellow
}

