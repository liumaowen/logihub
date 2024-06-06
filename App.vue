<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import '@climblee/uv-ui/index.scss';

	// 设置整个项目的背景色
	page {
		background-color: #ffffff;
	}

	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>