<template>
	<view class="content">
		<z-paging ref="paging" v-model="dataList" @query="getListDataFun" auto-show-back-to-top refresher-threshold='410px'>
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
					<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
					<z-tabs ref="tabsRef" active-color="#ffa666" :list="tabsNameList" @change="tabsChange"
						:current="tabsCurrent"></z-tabs>
				</view>
			
				<swiper :style="[{height:swiperHeight+'px'}]" :current="tabsCurrent" @transition="swiperTransition"
					@animationfinish="swiperAnimationfinish">
					<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
						<view id="tabs_list" class="tabs_list">
							<view class="tabs_list_item" v-for="(items,i) in item" :key="i">{{items.title}}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>


		</z-paging>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { getHomeList } from '@/api/home/index.js'


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
		badge: {
			count: 6
		},
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
	const tabList = ref([[{ title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }, { title: "1" }], [{ title: "2" }, { title: "2" }, { title: "2" }, { title: "2" }, { title: "2" }, { title: "2" }], [{ title: "3" }, { title: "3" }, { title: "3" }, { title: "3" }, { title: "3" }, { title: "3" }]])
	const tabsChange = (index : number) => {
		tabsCurrent.value = index;
	}
	//swiper滑动中
	const swiperTransition = (e) => {
		tabsRef.value.setDx(e.detail.dx);
	}
	//swiper滑动结束
	const swiperAnimationfinish = (e) => {
		tabsCurrent.value = e.detail.current;
		tabsRef.value.unlockDx();
	}
	// -----------------------主题内容列表-----------------------------
	const swiperHeight = ref(0)
	// -------------------------接口调用----------------------------
	const getListDataFun = () => {
		let params = {
			page: 1,
			sales: 1,
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
			tabList.value[0] = res.goods.data
		})
	}




	// ---------------z-paging-----------------------------
	const paging = ref(null)
	let dataList = ref([])

	onMounted(() => {
		// getListDataFun()
		swiperHeight.value = document.getElementById("tabs_list").offsetHeight
	})
</script>

<style lang="scss" scoped>
	.content {
		background: #ccc;
		// height: calc(100vh - 50px);
		overflow: auto;

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
					height: 200px;
					border: 1px solid red;
					margin-bottom: 10px;
					box-sizing: border-box;
				}
			}
		}
	}
</style>