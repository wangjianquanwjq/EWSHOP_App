<template>
	<view class="content">
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
		<!-- 推荐 -->
		<view class="recommend">
			<liu-goods-swiper listTitle="热门推荐" :goodsList="goodsList" :imgWidth="192" :imgHeight="152"
				@onClick="chooseItem"></liu-goods-swiper>
		</view>
		<!-- tabs列表 -->
		<view class="tabs_list">
			<van-button type="primary">按钮</van-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { getHomeList } from '@/api/home/index.js'
	const info = ref([])//轮播图
	const goodsList = ref()
	const current = ref(0)
	const mode = ref('dot')
	const dotsStyles = reactive({
		backgroundColor: 'rgba(255, 90, 95,0.3)',
		border: '1px rgba(255, 90, 95,0.3) solid',
		color: '#fff',
		selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
		selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
	})

	const change = (e : any) => {
		current.value = e.detail.current;
	}
	const imageError = (e : any) => {
		console.error('image发生error事件，携带值为' + e.detail.errMsg)
	}
	// 接口调用
	const getListDataFun = () => {
		getHomeList().then(res => {
			console.log(res);
			info.value = res.slides
			goodsList.value = res.goods.data.map(val => {
				return {
					'id': val.id,
					"name": val.title,
					'descr': val.description,
					'icon': val.cover_url,
				}
			});

		})
	}
	//点击某一个item
	const chooseItem = (item : any) => {

	}
	// tabs

	// 
	onMounted(() => {
		getListDataFun()
	})
</script>

<style lang="scss" scoped>
	.content {
		background: #ccc;
		height: calc(100vh - 50px);
		overflow: auto;

		.recommend {
			padding: 10px 0 15px 0;
			background: #fff;
			box-sizing: border-box;
			width: 100%;

		}

		.tabs_list {
			flex: 1;
			margin-top: 8px;
			height: 500px;
			background: #fff;

		}
	}
</style>