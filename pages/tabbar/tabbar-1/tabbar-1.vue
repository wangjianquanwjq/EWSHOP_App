<template>
	<view class="content">
		<z-paging ref="pagingRef" v-model="tabList" @query="getListDataFun" auto-show-back-to-top>
			<view class="" slot="top">
				<!-- 轮播图 -->
				<uni-swiper-dot :info="info" :dotsStyles="dotsStyles" :current="current" field="content" :mode="mode">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item ,index) in info" :key="index">
							<view class="swiper-item">
								<image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="scaleToFill"
									:src="item.img_url" @error="imageError"></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
				<!-- 热门推荐 -->
				<view class="recommend">
					<liu-goods-swiper listTitle="热门推荐" :goodsList="goodsList" :imgWidth="192" :imgHeight="152"
						@onClick="chooseItem"></liu-goods-swiper>
				</view>
			</view>

			<!-- tabs 主题内容 -->
			<view class="tabs_list_box">
				<view style="z-index: 100;position: sticky;top :0;">
					<z-tabs ref="tabsRef" active-color="#ffa666" :list="tabsNameList" @change="tabsChange"
						:current="tabsCurrent"></z-tabs>
				</view>
				<swiper class="swiper" :style="{ height: swiperHeight + 'px' }" :current="tabsCurrent"
					@transition="swiperTransition" @animationfinish="swiperAnimationfinish" @change="changeSwiper">
					<swiper-item class="swiper-item" v-for="(item,index) in 3" :key="index">
						<view id="tabs_list" class="tabs_list">
							<view class="tabs_list_item" v-for="(items,i) in tabList" :key="i">
								<view class="img">
									<image style="width: 100%; height: 184px;" :src="items.cover_url"
										mode="scaleToFill"></image>
								</view>
								<view class="title">
									{{items.title}}
								</view>
								<view class="price_info">
									<text class="price">￥{{items.price}}</text>
									<image style="width: 12px; height: 12px;" src="../../../static/img/home/xx.png"
										mode="scaleToFill"></image>&nbsp;
									<text>{{items.collects_count}}</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>


		</z-paging>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, nextTick } from 'vue'
	import { getHomeList } from '@/api/home/index.js'
	const pagingRef = ref(null)

	// --------------顶部轮播图相关--------------------
	const info = ref([])
	const dotsStyles = reactive({
		backgroundColor: 'rgba(255, 90, 95,0.3)',
		border: '1px rgba(255, 90, 95,0.3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
		selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
	})
	const current = ref(0)
	const mode = ref('dot')
	const change = (e : any) => {
		current.value = e.detail.current;
	}
	const imageError = (e : any) => {
		console.error('image发生error事件，携带值为' + e.detail.errMsg)
	}
	// --------------热门推荐相关----------------------------
	const goodsList = ref()
	//点击某一个item
	const chooseItem = (item : any) => {

	}
	// ----------------------主题内容tabs----------------------------
	const tabsNameList = ref([{
		name: '畅销',
		// badge: {
		// 	count: 6
		// },
	}, {
		name: '新书',
		// badge: {
		// 	count: 6
		// },
		// 可以禁用某个item
	}, {
		name: '精选',
		// badge: {
		// 	count: 6
		// },
		// 可以禁用某个item
	}])
	const tabsRef = ref<any>(null);
	const tabsCurrent = ref(0)
	const tabList = ref([])
	const tabsChange = (index : number) => {
		tabsCurrent.value = index;
	}
	//swiper滑动中
	const swiperTransition = (e : any) => {
		tabsRef.value.setDx(e.detail.dx);
	}
	//swiper滑动结束
	const swiperAnimationfinish = (e) => {
		tabsCurrent.value = e.detail.current;
		tabsRef.value.unlockDx();
		pagingRef.value.reload()
	}
	// -----------------------主题内容列表-----------------------------
	// 动态设置高度
	const swiperHeight = ref(0)
	// 轮播
	const changeSwiper = (val : any) => {
		console.log(val);
	}
	// -------------------------接口调用----------------------------
	const getListDataFun = (pageNo : number, pageSize : number) => {
		let params : any
		if (tabsCurrent.value == 0) {
			params = {
				page: pageNo,
				type: 'sales',//畅销
			}
		}
		if (tabsCurrent.value == 1) {
			params = {
				page: pageNo,
				type: 'new',//新书
			}
		}
		if (tabsCurrent.value == 2) {
			params = {
				page: pageNo,
				type: 'recommend',//精选
			}
		}
		getHomeList(params).then(res => {
			info.value = res.slides
			goodsList.value = res.goods.data.map(val => {
				return {
					'id': val.id,
					"name": val.title,
					'descr': val.description,
					'icon': val.cover_url,
				}
			});
			// pagingRef.value.completeByTotal()
			pagingRef.value.complete(res.goods.data)
			swiperHeightFun()
		})
	}
	// ---------------z-paging-----------------------------
	const swiperHeightFun = () => {
		nextTick(() => {
			setTimeout(() => {
				swiperHeight.value = document.getElementById("tabs_list").offsetHeight
			}, 500)
		})
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #ccc;
		// height: calc(100vh - 50px);
		// overflow: auto;

		.recommend {
			padding: 10px 0 15px 0;
			background: #fff;
			box-sizing: border-box;
			width: 100%;

		}

		.tabs_list_box {
			// flex: 1;
			margin-top: 8px;
			background: #fff;

			.tabs_list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 5px;
				box-sizing: border-box;

				.tabs_list_item {
					width: 48%;
					height: 240px;
					margin-bottom: 10px;
					box-shadow: 2px 3px 4px #e9e9e9;
					box-sizing: border-box;
					text-align: center;

					.img {
						width: 184px;
						height: 184px;

					}

					.title {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-bottom: 3px;
					}

					.price_info {
						font-size: 12px;
						display: flex;
						justify-content: center;
						align-items: center;

						.price {
							color: red;
							margin-right: 25px;

						}
					}
				}
			}
		}
	}
</style>