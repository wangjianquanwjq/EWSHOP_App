<template>
	<view class="content">
		<!-- 轮播图 -->
		<uni-swiper-dot :info="info" :dotsStyles="dotsStyles" :current="current" field="content" :mode="mode">
			<swiper class="swiper-box" @change="change">
				<swiper-item v-for="(item ,index) in info" :key="index">
					<view class="swiper-item">
						<image style="width: 100%; height: 200px; background-color: #eeeeee;" mode="scaleToFill"
							:src="item.url" @error="imageError"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<!-- 推荐 -->
		<view class="recommend">
			<view class="recommend-item">
				1
			</view>
			<view class="recommend-item">
				1
			</view>
			<view class="recommend-item">
				1
			</view>
			<view class="recommend-item">
				1
			</view>
		</view>
		<!-- tabs列表 -->
		<view class="tabs_list">
			
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue'
	const info = reactive([{
		colorClass: 'uni-bg-red',
		url: 'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe85ae3fd.png',
		content: '内容 A'
	},
	{
		colorClass: 'uni-bg-green',
		url: 'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe9530bfd.png',
		content: '内容 B'
	},
	{
		colorClass: 'uni-bg-blue',
		url: 'https://oss.shop.eduwork.cn/ad/2020-0820-5f3dfe85ae3fd.png',
		content: '内容 C'
	}])
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
</script>

<style lang="scss" scoped>
.content{
	background: #ccc;
	height: calc(100vh - 50px);
	overflow: auto;
	.recommend{
		padding: 15px 0 20px 0;
		background: #fff;
		display: flex;
		justify-content: space-between;
		.recommend-item{
			height: 110px;
		}
	}
	.tabs_list{
		margin-top: 8px;
		height: 500px;
		background: #fff;
	}
}
</style>