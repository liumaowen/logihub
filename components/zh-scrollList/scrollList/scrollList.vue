<template>
	<view class="">
		<view class="" :style="[scroll_style]">
			<view :style="[scroll_box]">
				<view :class="class_name" :style="[scroll_item]" v-for="(item,index) in scroll_list" :key="index">
					<template v-if="$slots.default">
						<slot :rows='item'></slot>
					</template>
					<template v-else>
						<view class="scroll_cell">
							<view class="title">{{item[name]}}</view>
							<view class="time">{{item[time_name]}}</view>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	 * @param {list,Array} 滚动数据
	 * @param {time,Number} 滚动间隔时间
	 * @param {min,Number} 最少几条开始滚动
	 * @param {height,Number} 滚动区域的高度(单位rpx)
	 * @param {line_height,Number} 每次滚动的高度(单位rpx)
	 * @param {name,String} 左边属性名
	 * @param {time_name,String} 右边属性名
	 */
	export default {
		name: "scrollList",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			time: {
				typeof: Number,
				default: () => 3000
			},
			min: {
				typeof: Number,
				default: () => 3,
			},
			height: {
				typeof: Number,
				default: () => 520,
			},
			line_height: {
				typeof: Number,
				default: () => 60,
			},
			name: {
				typeof: String,
				default: () => 'name',
			},
			time_name: {
				typeof: String,
				default: () => 'time',
			},
			class_name: {
				typeof: String,
				default: () => '',
			},
		},
		data() {
			return {
				scroll_list: [],
				timer: null, //定时器
				scroll_box: {}, //滚动动画样式
			}
		},
		mounted() {

		},
		methods: {
			scroll() {
				if (this.scroll_list.length < this.min) { //低于3条不滚动
					return
				}
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					clearTimeout(this.setTime)
					this.scroll_list.push(this.scroll_list[0])
					this.setTime = setTimeout(() => {
						
						this.scroll_list.shift()
						this.scroll_box = {
							'margin-top': 0,
							'transition': ''
						}
					}, 500)

					this.scroll_box = {
						'margin-top': `-${this.line_height}rpx`,
						'transition': 'all 0.5s'
					}
				}, this.time)
			},
		},
		computed: {
			scroll_style() {
				return {
					'overflow': 'hidden',
					'height': `${this.height}px`,
				}
			},
			scroll_item() {
				return {
					'overflow': 'hidden',
					'height': `${this.line_height}rpx`,
					'line-height': `${this.line_height}rpx`
				}
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		watch: {
			list: {
				handler(news, old) {
					this.scroll_list = news
					// this.scroll()
				},
				deep: true,
				immediate: true,
			},
			min: {
				handler(news, old) {
					this.scroll()
				},
				deep: true,
				immediate: true,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.scroll_cell {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.title {
			flex: 1;
			color: #333;
			font-size: 24upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
			word-break: break-all;
		}

		.time {
			margin-left: 24upx;
			color: #999;
			font-size: 24upx;
		}
	}
	._right_m_t {
		display: flex;
        flex-direction: row;
		// padding: 6upx 0; // 169.0
		height:33upx;
		line-height: 33upx;
	}
</style>