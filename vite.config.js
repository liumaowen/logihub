import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		port: 3002,
		proxy: {
			'/gpmes': {
				// target: 'https://glptest.wiskind.cn/gpmes', // 目标服务  
				target: 'https://gp.wiskind.cn/gpmes', // 目标服务  
				changeOrigin: true,
				secure: true,
				rewrite: path => path.replace(/^\/gpmes/, ''),
			}
		}
	}
})
