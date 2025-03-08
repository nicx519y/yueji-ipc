# 部署配置
$remoteHost = "47.113.146.209"  # 服务器 IP
$remoteUser = "root"   # 服务器用户名
$remotePath = "/var/www/yueji-ipc"  # 新的网站部署路径
$sshOptions = "-o StrictHostKeyChecking=no"

# 颜色输出函数
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# 检查构建状态
function Check-LastExitCode {
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput Red "Error occurred! Deployment aborted."
        exit $LASTEXITCODE
    }
}

# 检查必需文件
if (-not (Test-Path "package.json")) {
    Write-ColorOutput Red "package.json not found!"
    exit 1
}

if (-not (Test-Path "next.config.js")) {
    Write-ColorOutput Red "next.config.js not found!"
    exit 1
}

# 检查是否在正确的目录
if (-not (Test-Path ".git")) {
    Write-ColorOutput Red "Please run this script from the project root directory!"
    exit 1
}

# 检查 SSH 连接
Write-ColorOutput Green "Testing SSH connection..."
$sshTest = ssh $sshOptions "${remoteUser}@${remoteHost}" "echo 'SSH connection successful'"
if ($LASTEXITCODE -ne 0) {
    Write-ColorOutput Red "SSH connection failed!"
    exit 1
}

try {
    # 1. 安装依赖
    Write-ColorOutput Green "Installing dependencies..."
    npm install
    Check-LastExitCode

    # 2. 构建项目
    Write-ColorOutput Green "Building project..."
    npm run build
    Check-LastExitCode

    # 3. 压缩构建文件
    Write-ColorOutput Green "Compressing build files..."
    Push-Location $PSScriptRoot
    New-Item -ItemType Directory -Path "deploy" -Force | Out-Null
    
    if (Test-Path "deploy/.next") {
        Remove-Item "deploy/.next" -Recurse -Force
    }
    if (Test-Path "deploy/public") {
        Remove-Item "deploy/public" -Recurse -Force
    }

    # 复制需要的文件到部署目录
    Copy-Item -Path "public" -Destination "deploy/public" -Recurse
    Copy-Item -Path "package.json", "next.config.js" -Destination "deploy"
    Copy-Item -Path ".next" -Destination "deploy/.next" -Recurse

    # 压缩整个部署目录
    Compress-Archive -Path "deploy/*" -DestinationPath "deploy.zip" -Force
    Remove-Item -Path "deploy" -Recurse -Force
    Pop-Location
    Check-LastExitCode

    # 4. 创建远程目录
    Write-ColorOutput Green "Creating remote directory..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" "sudo mkdir -p ${remotePath} && sudo chown -R root:root ${remotePath}"
    Check-LastExitCode

    # 确认目录已创建
    Write-ColorOutput Green "Verifying remote directory..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" "if [ -d ${remotePath} ]; then echo 'Directory exists'; else exit 1; fi"
    Check-LastExitCode

    # 清理远程目录
    Write-ColorOutput Green "Cleaning remote directory..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" @"
        cd ${remotePath}
        rm -rf .next public package.json next.config.js node_modules deploy.zip
"@
    Check-LastExitCode

    # 5. 上传文件到服务器
    Write-ColorOutput Green "Uploading files to server..."
    scp $sshOptions "deploy.zip" "${remoteUser}@${remoteHost}:${remotePath}/deploy.zip"
    Check-LastExitCode

    # 6. 在服务器上部署
    Write-ColorOutput Green "Deploying on server..."
    $deployCommand = @'
#!/bin/bash
cd %REMOTE_PATH%
source ~/.bashrc
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 解压文件
unzip -o deploy.zip
rm -f deploy.zip

# 安装依赖
npm install --omit=dev

# 确保 PM2 已安装
if ! command -v pm2 > /dev/null; then
    npm install -g pm2
fi

# 使用新的名称管理进程
pm2 stop yueji-ipc || true
pm2 delete yueji-ipc || true

# 启动应用并等待结果
pm2 start npm --name "yueji-ipc" -- start -- -p 3001
sleep 5

# 检查进程是否正在运行
if pm2 show yueji-ipc | grep -q "online"; then
    echo "Application started successfully"
    pm2 save
else
    echo "Failed to start application"
    pm2 logs yueji-ipc --lines 50
    exit 1
fi
'@ -replace "`r`n", "`n" -replace "%REMOTE_PATH%", $remotePath

    # 将脚本写入临时文件
    $tempFile = [System.IO.Path]::GetTempFileName()
    [System.IO.File]::WriteAllText($tempFile, $deployCommand, [System.Text.UTF8Encoding]::new($false))

    # 上传并执行脚本
    scp $sshOptions $tempFile "${remoteUser}@${remoteHost}:${remotePath}/deploy.sh"
    ssh $sshOptions "${remoteUser}@${remoteHost}" "chmod +x ${remotePath}/deploy.sh && bash ${remotePath}/deploy.sh"
    Remove-Item $tempFile
    Check-LastExitCode

    # 7. 清理本地文件
    Write-ColorOutput Green "Cleaning up..."
    Remove-Item "deploy.zip" -Force

    Write-ColorOutput Green "Deployment completed successfully!"
    Write-ColorOutput Green "应用已启动，请访问: http://${remoteHost}:3001"
}
catch {
    Write-ColorOutput Red "Error: $($_.Exception.Message)"
    exit 1
}
