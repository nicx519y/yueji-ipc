# 部署配置
$remoteHost = "47.113.146.209"  # 服务器 IP
$remoteUser = "root"   # 服务器用户名
$remotePath = "/var/www/yueji-ipc"  # 网站部署路径
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
    # 确保在项目根目录
    Push-Location $PSScriptRoot
    # 创建临时部署目录
    New-Item -ItemType Directory -Path "deploy" -Force | Out-Null
    # 先清理所有目标目录
    if (Test-Path "deploy/.next") {
        Remove-Item "deploy/.next" -Recurse -Force
    }
    if (Test-Path "deploy/public") {
        Remove-Item "deploy/public" -Recurse -Force
    }

    # 复制需要的文件到部署目录
    Copy-Item -Path "public" -Destination "deploy/public" -Recurse
    # 从 app 目录复制 favicon.ico
    Copy-Item -Path "src/app/favicon.ico" -Destination "deploy/favicon.ico" -Force
    Copy-Item -Path "package.json", "next.config.ts" -Destination "deploy"
    # 复制构建文件
    Copy-Item -Path ".next" -Destination "deploy/.next" -Recurse

    # 压缩整个部署目录
    Compress-Archive -Path "deploy/*" -DestinationPath "deploy.zip" -Force
    # 清理临时目录
    Remove-Item -Path "deploy" -Recurse -Force
    Pop-Location
    Check-LastExitCode

    # 4. 创建远程目录（如果不存在）
    Write-ColorOutput Green "Creating remote directory..."
    ssh $sshOptions "${remoteUser}@${remoteHost}" @"
        mkdir -p ${remotePath}
        cd ${remotePath}
        rm -rf .next public package.json package-lock.json next.config.ts node_modules
"@
    Check-LastExitCode

    # 5. 上传文件到服务器
    Write-ColorOutput Green "Uploading files to server..."
    scp $sshOptions "deploy.zip" "${remoteUser}@${remoteHost}:${remotePath}/deploy.zip"
    Check-LastExitCode

    # 6. 在服务器上解压文件并重启服务
    Write-ColorOutput Green "Deploying on server..."

    # 创建部署脚本内容
    $deployCommand = @"
#!/bin/bash
cd ${remotePath}
source ~/.bashrc
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin
export NVM_DIR="\$HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"

# 解压文件
unzip -o deploy.zip
rm -f deploy.zip

# 安装依赖
npm install --production

# 停止并删除旧进程
pm2 stop yueji-ipc || true
pm2 delete yueji-ipc || true
pm2 flush

# 启动应用
pm2 start "npm" --name "yueji-ipc" -- start -- -p 3001
# 等待应用启动
sleep 5
# 检查应用是否正常运行
curl -s http://localhost:3001 || {
    echo "Application failed to start, checking logs:"
    pm2 logs yueji-ipc --lines 50
    exit 1
}
pm2 save
"@ -replace "`r`n", "`n"

    # 将脚本写入到临时文件
    $tempFile = [System.IO.Path]::GetTempFileName()
    [System.IO.File]::WriteAllText($tempFile, $deployCommand, [System.Text.UTF8Encoding]::new($false))

    # 上传并执行脚本
    scp $sshOptions $tempFile "${remoteUser}@${remoteHost}:${remotePath}/deploy.sh"
    ssh $sshOptions "${remoteUser}@${remoteHost}" "chmod +x ${remotePath}/deploy.sh && bash ${remotePath}/deploy.sh"

    # 清理临时文件
    Remove-Item $tempFile
    Check-LastExitCode

    Write-ColorOutput Green "Deployment completed successfully!"
    Write-ColorOutput Green "应用已启动，请访问: https://shenqing.suixinyue.cn/"
}
catch {
    Write-ColorOutput Red "Error: $($_.Exception.Message)"
    exit 1
}
