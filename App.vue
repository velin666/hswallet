<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
				plus.nativeUI.setUIStyle('dark')
			// #endif
			// 测试home页面时使用
			// uni.removeStorage({
			// 	key: 'mnemonicData'
			// })
			// uni.removeStorage({
			// 	key: 'account'
			// })
			if (!uni.getStorageSync('account')) {
				uni.navigateTo({
					url: './pages/home/home'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		beforeDestroy() {
			this.$store.dispatch('websocketClose', "wss://testnet.hschain.io/api/v1/ws")
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/css/iconfont.css"; //自定义icon，参考https://www.uviewui.com/guide/customIcon.html
	@import "uview-ui/index.scss";
	@import './common/css/common.scss';
	@font-face{
	  font-family: 'content-font';
	  // src:url('~@/static/font/simply.ttf');
	  font-weight: normal;
	  font-style: normal;
	}
	
	:root {
		--mainColor: #020e46;
	}
	.uni-tabbar__label {
		font-size: 28rpx !important;
	}
	// .u-line-1 {
	// 	background: linear-gradient(117deg, #77ff9b 0%, #26feff 100%);
	// 	-webkit-background-clip: text;
	// 	-webkit-text-fill-color: transparent;
	// }
	.u-cell-item-box {
		background-color: transparent !important;
	}
	// .u-border-bottom:after, .u-border-left:after, .u-border-right:after, .u-border-top-bottom:after, .u-border-top:after, .u-border:after {
	// 	border: 0 solid rgba(236, 238, 255, 0.5)
	// }
	// .u-gab {
	// 	background-color: #333 !important
	// }
	// .u-actionsheet-cancel {
	// 	color: #999 !important;
	// }
	// .u-drawer-bottom {
	// 	background-color: #000 !important;
	// 	border-top: 2rpx solid rgba(236, 238, 255, 0.3) !important;
	// 	padding: 0 60rpx !important;
	// }
	body,html {
	  // line-height: 1;
	  font-weight: 500;
	   font-family:arial, 'PingFang SC','SimHei', 'STHeitiSC-Light', 'Helvetica-Light', monospace, sans-serif, Times New Roman;
	  //font-family: 'content-font';
	  background: #000;
	}
	page {
		color: #fff;
		background-color: #000;
	}
</style>
