# 车辆发运信息公示

物流平台，进出厂车辆信息<br />
*大屏展示，自适应屏幕，无缝滚动*

![物流大屏截图](https://gitee.com/liuamaowen/myproject/raw/master/image/logihub.jpg "物流大屏")

## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [版本控制](#版本控制)
- [作者](#作者)

### 上手指南
###### 开发前的配置要求

1. Node 18.13.0+
2. pnpm 7.26.3+
3. Visual Studio Code(安装扩展：uni-helper)

###### **安装步骤**

1. gitlab 地址：[https://gitlab.wiskind.cn/gits/gp/logihub.git](https://gitlab.wiskind.cn/gits/gp/logihub.git)
2. Clone

```sh
git clone https://gitlab.wiskind.cn/gits/gp/logihub.git
```
3. 安装依赖
```sh
cd logihub
pnpm i
```
4. 运行到浏览器<br />pnpm run dev:h5
5. H5打包<br />pnpm run build:h5<br />打包文件保存在dist文件夹内

### 文件目录说明
*生成目录树*
*命令行输入：tree >.\text.txt /f
```
logihub 
│  .gitignore
│  docker-build-push.sh
│  Dockerfile
│  index.html
│  package.json
│  pnpm-lock.yaml
│  README.md
│  shims-uni.d.ts
│  vite.config.js    # 跨域设置
│  
├─dist               # 打包文件
│                  
└─src                # 逻辑文件，一般只改这个文件下的内容
    │  App.vue
    │  main.js
    │  manifest.json
    │  pages.json
    │  shime-uni.d.ts
    │  uni.scss
    │  
    ├─common
    │      api.js
    │      config.js
    │      
    ├─components
    │  └─zh-scrollList     # 滚动组件
    │      └─scrollList
    │              scrollList.vue
    │              
    ├─pages
    │  └─index
    │          index.vue   # 主页面
    │          
    ├─static
    │      exitfull.png
    │      full.png
    │      logo.png
    │      
    └─utils
        └─request
                index.js
                interceptors.js  # 拦截器
```

### 开发的架构 

vue3.0+

### 版本控制

该项目使用Gitlab进行版本管理。

### 作者

maowen liu
