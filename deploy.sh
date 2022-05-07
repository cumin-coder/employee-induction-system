#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init # 初始化项目
git add -A #将文件提交到暂存区
git commit -m '这是我的员工入职系统（This is my employee induction system）-author：en:cumin/cn:考米' #把暂存区的全部文件提交到本地仓库

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:cumin-coder/cumin-coder.github.io.git main

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -