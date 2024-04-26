#!/bin/bash
git_path="../dist"
source_path="../web"
dist_path="../web/dist/build/h5"
time=$(date "+%Y-%m-%d %H:%M:%S")

error(){
	echo "\033[31m $1 \033[0m"
    exit
}

if [ ! -n "$1" ]; then
    error "参数有误，执行命令方式为：sh web.sh skin1_demo"
fi

cd $git_path

if [ $? -ne 0 ]; then
    error "dist git目录不存在：$git_path"
fi

echo `pwd`

echo '----------切换分支------------'
git checkout $1
if [ $? -ne 0 ]; then
    error "不存在分支：$1, 请先创建对应分支，分支名称和平台名称对应"
fi

echo '----------跳转到源码目录------------'
cd $source_path
echo `pwd`

echo '----------编译------------'
npm run build:custom $1
if [ $? -ne 0 ]; then
    error "编译出错了"
fi

echo '编译成功...'
cp -rf "${dist_path}/"* $git_path

if [ $? -ne 0 ]; then
    error "移动文件出错了"
fi

echo '移动文件成功...'

cd $git_path
echo `pwd`

git add .
git commit -m "${time}"
echo '推送到git...'
git push

echo "done!"