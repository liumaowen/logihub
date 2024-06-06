#!/bin/bash
if [ ! -f logihub.zip ]; then
	echo
	echo 错误：logihub.zip 不存在!
	echo
	exit 0
fi

# 解压logihub.zip
unzip logihub.zip

# 项目名称
proj=logihub

# 镜像名称
image=${proj}-frontend

# 使用当前时间作为镜像标签tag，时间格式yyyyMMddHHmm
tag=$(date +%Y%m%d%H%M)

# 定义仓库名称
rep=harbor.wiskind.cn/gp/${proj}

docker build -f Dockerfile -t ${image}:${tag} .
docker tag ${image}:${tag} ${rep}/${image}:${tag}
docker push ${rep}/${image}:${tag}
docker rmi ${image}:${tag}

# 删除原文件夹
rm -r logihub
