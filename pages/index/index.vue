<template>
	<view style="display: flex;flex-direction: column;height:100vh;">
		<view class="_thead">
			钢品事业部智造中心车辆发运信息公示
			<view class="datetime" :style="{top:timeheight +'px'}">{{time}}</view>
			<image class="pic" :style="{top:fullheight  +'px'}" :src="imgsrc" @click="fullscreen"></image>
			<!-- <view>
				<scrollList :list="goods_list">
					<template #default="{rows}">
						<view class="rows">
							<view class="">{{rows.name}}</view>
							<view class="">{{rows.time}}</view>
						</view>
					</template>
				</scrollList>
			</view> -->
		</view>
		<view class="_thead_t">
			<view class="_main _width25">今日预计：<text class="_num">{{list.zyjdc}}</text></view>
			<view class="_main _width25">实际到厂：<text class="_num">{{list.zcljc}}</text></view>
			<view class="_main _width25">实际出厂：<text class="_num">{{list.zycc}}</text></view>
			<view class="_main _width25">明日预计：<text class="_num">{{list.zmryj}}</text></view>
		</view>
		<view style="display:flex;flex:1;overflow: hidden;">
			<view class="_left _width20">
				<view class="_left_h">未到厂</view>
				<view style="flex:1;overflow-y: scroll;" class="areaheight">
					<!-- <view style="height:100%">
						<view class="_left_h_red" v-for="(l_item,l_index) in list.tab1" :key="l_index">
							{{l_item.zchehao}}
						</view>
					</view> -->
					
					<scrollList :list="list.tab1" :height="l_areaheight" :line_height="l_everyheight" :min="l_min">
						<template #default="{rows}">
							<view :class="['_left_h_red',rows.zchehao===firstchehao?'_right_h_t_green':'']">
								{{rows.zchehao}}
							</view>
						</template>
					</scrollList>
				</view>
			</view>
			<view class="_right _width80">
				<view class="_right_h">
					<view class="_right_h_t">车号</view>
                    <view class="_right_h_t">主产品</view>
                    <view class="_right_h_t">压瓦</view>
					<view class="_right_h_t">折弯件</view>
					<view class="_right_h_t">檩条</view>
					<view class="_right_h_t">附件</view>
					<view class="_right_h_t">冲压件</view>
				</view>
				<view class="_right_m">
					<!-- <view v-for="(r_item,r_index) in list.tab2" :key="r_index" class="_right_m_t">
						<view class="_right_h_t _right_h_t_ted">{{r_item.zchehao}}</view>
						<view v-for="(c_item,c_index) in colortype" :key="c_index" 
						   :class="['_right_h_t','_right_h_t_ted',r_item[c_item.classname]]">
						   {{r_item[c_item.field]}}
						</view>
					</view> -->
					<scrollList :list="list.tab2" :height="r_areaheight" :line_height="r_everyheight" :min="r_min" :class_name="'_right_m_t'">
						<template #default="{rows}">
							<view class="_right_h_t _right_h_t_ted">{{rows.zchehao}}</view>
							<view v-for="(c_item,c_index) in colortype" :key="c_index"
							   :class="['_right_h_t','_right_h_t_ted',rows[c_item.classname]]">
							   {{rows[c_item.field]}}
							</view>
						</template>
					</scrollList>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getdata
	} from '@/common/api.js'
	import fullimg1 from '@/static/full.png';
	import fullimg2 from '@/static/exitfull.png';
	export default {
		data() {
			return {
				imgsrc: fullimg1,
				time: '',
				firstchehao:'',
				timeheight: 0,
				fullheight: 0,
				isopenfull: false,
				scrollIntoView: 'item-0',
				list: {
					tab1: [],
					tab2: [],
					zyjdc: 0,
					zcljc: 0,
					zycc: 0,
					zmryj: 0

				},
				colortype: [{field: 'zzcp',classname: 'zzcpclass'},
					        {field: 'zyw',classname: 'zywclass'},
					        {field: 'zzwj',classname: 'zzwjclass'},
					        {field: 'zlt',classname: 'zltclass'},
					        {field: 'zfj',classname: 'zfjclass'},
					        {field: 'zcyj',classname: 'zcyjclass'}
				],
				l_areaheight:500, // 左边滚动区域的高度
				l_everyheight:34, // 左边每次滚动区域高度
				l_min:3,          // 左边最少几条开始滚动
				r_areaheight:500, // 右边滚动区域的高度
				r_everyheight:33, // 右边每次滚动区域高度
				r_min:3           // 右边最少几条开始滚动
				
			}
		},
		onLoad() {
			this.getdetail()
			this.getNowTime()
			var timer = setInterval(() => {
				this.getNowTime()
			}, 1000);
		},
		onReady() {
			var list = setInterval(() => {
				this.getdetail()
			}, 60000);
		},
		// 组件销毁时关闭定时器
		beforeDestroy() {
			clearInterval(timer);
			clearInterval(list);
		},
		methods: {
			getdetail() {
				getdata({}).then(data => {
					if (data) {
						this.list = data;
						if(this.list.tab1 && this.list.tab1.length){
							this.firstchehao = this.list.tab1[0].zchehao;
						}
						if(this.list.tab2) {
							this.list.tab2.forEach((data1) => {
								this.colortype.forEach(color => {
									switch (data1[color.field]) {
										case '装车中':
											data1[color.classname] = '_right_h_t_green';
											break;
										case '已完成':
											data1[color.classname] = '_right_h_t_white';
											break;
										default:
											break;
									}
								})
							});	
						}
						this.getElInfo();
					}
				})
			},
			//获取当前时间
			getNowTime() {
				this.time = uni.$uv.timeFormat(new Date().getTime(),'yyyy-mm-dd hh:MM:ss');
			},
			getElInfo() {
				let headheight = '';
				this.$uv.getRect('._thead').then(res => {
					headheight = res.height / 2;
				})
				this.$uv.getRect('.pic').then(res => {
					this.fullheight = headheight - res.height / 2;
				})
				this.$uv.getRect('.datetime').then(res => {
					this.timeheight = headheight - res.height / 2;
				})
				this.$uv.getRect('.areaheight').then(res => {
					this.l_areaheight = res.height;
					this.l_min = Math.ceil(this.l_areaheight/uni.$uv.getPx(this.l_everyheight+'upx'));
				})
				this.$uv.getRect('._right_m').then(res => {
					this.r_areaheight = res.height;
					this.r_min = Math.ceil(this.r_areaheight/uni.$uv.getPx(this.r_everyheight+'upx'));
					console.log(this.r_min)
				})
			},
			fullscreen() {
				let element = document.documentElement;
				this.isopenfull = !document.fullscreenElement;
				if (this.isopenfull) {
					this.enterFullScreen(element);
					this.imgsrc = fullimg2;
				} else {
					this.closeFullscreen(element);
					this.imgsrc = fullimg1;
				}
				this.getdetail();
			},
			enterFullScreen(element) {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.mozRequestFullScreen) {
					/* Firefox */
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullscreen) {
					/* Chrome, Safari & Opera */
					element.webkitRequestFullscreen();
				} else if (element.msRequestFullscreen) {
					/* IE/Edge */
					element.msRequestFullscreen();
				}
			},
			closeFullscreen(element) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					/* Firefox */
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					/* Chrome, Safari and Opera */
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					/* IE/Edge */
					document.msExitFullscreen();
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		// lightblue
		background: #000000;
	}

	$uv-textcenter: center;

	._thead {
		text-align: $uv-textcenter;
		padding: 14upx 0;
		color: #027cb4;
		font-size: 24upx;
		font-weight: bold;
		position: relative;

		.datetime {
			position: absolute;
			left: 10upx;
			font-size: 10upx;
			color: #ffffff;
		}

		.pic {
			width: 20upx;
			height: 20upx;
			position: absolute;
			right: 20upx;
		}
	}

	._thead_t {
		display: flex;
		padding-bottom: 10upx;
		border-bottom: 2upx solid #027cb4;
	}

	._main {
		text-align: $uv-textcenter;
		color: #ffffff;
		font-size: 20upx;
		font-weight: bold;
	}

	._num {
		color: #d5011b;
		font-size: 20upx;
		font-weight: bold;
	}

	._left {
		text-align: $uv-textcenter;
		padding: 10upx 0;
		border-right: 2upx solid #027cb4;
		display: flex;
		flex-direction: column;
	}

	._right {
		text-align: $uv-textcenter;
		display: flex;
		flex-direction: column;
		border: 2upx solid #027cb4;
		margin: 20upx;
	}

	._left_h {
		color: #ffffff;
		font-size: 26upx;
		font-weight: bold;
	}

	._left_h_red {
		color: #d5011b;
		// padding: 6upx 0; // 169
		font-size: 16upx;
		height:34upx;
		line-height: 34upx;
	}

	._width25 {
		width: 25%;
	}

	._width75 {
		width: 75%;
	}
	._width20 {
		width: 20%;
	}

	._width80 {
		width: 80%;
	}

	._width50 {
		width: 50%;
	}

	._right_h {
		display: flex;
		padding: 6upx 0;
		border-bottom: 2upx solid #027cb4;
		font-weight: bold;
	}

	._right_h_t {
		text-align: $uv-textcenter;
		font-size: 16upx;
		color: #ffffff;
		flex: 1;
	}
    ._right_h ._right_h_t:nth-child(1){
        flex:none;
        width:110upx;
    }

	._right_h_t_ted {
		color: #d5011b;
	}

	._right_h_t_green {
		color: #caf981;
	}

	._right_h_t_white {
		color: #ffffff;
	}

	._right_m {
		flex: 1;
		overflow-y: scroll;
	}
    ._right_m_t ._right_h_t:nth-child(1){
        flex:none;
        width:110upx;
    }

</style>