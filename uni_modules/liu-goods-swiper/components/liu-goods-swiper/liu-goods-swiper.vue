<template>
	<view>
		<view class="subtitle">{{listTitle}}</view>
		<scroll-view scroll-x="true" class="scroll-box">
			<view :class="'item-box'+' bg'+((index+'').slice(-1))" v-for="(item,index) in goodsList"
				:key="index" @click="chooseItem(item)">
				<image :src="item.icon" :style="'width:'+imgWidth+'rpx;'+'height:'+imgHeight+'rpx;'" mode=""></image>
				<view class="item-name">{{item.name}}</view>
				<view class="item-descr">{{item.descr}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			listTitle: {
				type: String,
				default: ''
			},
			goodsList: {
				type: Array,
				default: () => []
			},
			imgWidth: {
				type: Number,
				default: 128
			},
			imgHeight: {
				type: Number,
				default: 128
			}
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {
			//点击某个item
			chooseItem(item){
				this.$emit("onClick", item)
			}
		}
	}
</script>

<style>
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>
<style scoped>
	.subtitle {
		padding: 16rpx 32rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		line-height: 48rpx;
	}

	.scroll-box {
		display: flex;
		white-space: nowrap;
		width: 100%;
		min-height: 242rpx;
	}

	.item-box {
		display: inline-block;
		width: 232rpx;
		height: 100%;
		padding: 16rpx;
		margin-right: 8rpx;
		border-radius: 12rpx;
		border: 4rpx solid #FFFFFF;
		box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.1);
		text-align: center;
		box-sizing: border-box;
	}

	.item-name {
		display: table;
		width: 100%;
		font-size: 32rpx;
		line-height: 32rpx;
		font-weight: bold;
		white-space: pre-wrap;
		color: #333333;
		margin-top: 8rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.item-descr {
		display: table;
		width: 100%;
		font-size: 24rpx;
		line-height: 24rpx;
		white-space: pre-wrap;
		color: #999999;
		margin-top: 12rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	/* .bg0 {
		background: linear-gradient(180deg, #FFE8C2 0%, #FFFFFF 100%);
	}
	
	.bg1 {
		background: linear-gradient(180deg, #D3DBFF 0%, #FFFFFF 100%);
	}
	
	.bg2 {
		background: linear-gradient(360deg, #FFFFFF 0%, #D7C4FF 100%);
	}

	.bg3 {
		background: linear-gradient(180deg, #FFD3D3 0%, #FFFFFF 100%);
	}

	.bg4 {
		background: linear-gradient(180deg, #D3FFFB 0%, #FFFFFF 100%);
	}

	.bg5 {
		background: linear-gradient(180deg, #D3FFE7 0%, #FFFFFF 100%);
	}

	.bg6 {
		background: linear-gradient(180deg, #FFD3FB 0%, #FFFFFF 100%);
	} */
</style>