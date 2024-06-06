FROM harbor.wiskind.cn/gy/nginx:1.23.2-alpine
COPY logihub /usr/share/nginx/html
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/system/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezoness
ENTRYPOINT ["nginx", "-g", "daemon off;"]