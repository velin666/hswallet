<template>
	<view class="transfer">
		<view class="addrTitle">
			收款地址
		</view>
		<view class="greenContainer">
			<view class="containerWrap">
				<view class="tableBar addrInput">
					<u-input :custom-style="{fontSize: '32rpx'}" class="input" v-model="addr" placeholder="HSC地址" :clearable="false"/>
					<image @click="addAddress" class="addrImg" src="../../static/common/myBook.png" mode=""></image>
				</view>
				<u-cell-group v-show="Object.keys(addrData).length">
					<u-cell-item :value-style="{color: '#fff'}" :title-style="{color: '#fff'}" :arrow="false" :value="addrData.description || '(空)'" :title="addrData.name" hover-class="none" :border-bottom="false">
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		
		<view class="addrTitle">
			金额
		</view>
		<view class="greenContainer">
			<view class="containerWrap">
				<view class="tableBar">
					<u-cell-group>
						<u-cell-item :arrow="false" hover-class="none">
							<u-input slot="title" :custom-style="{fontSize: '46rpx',padding: '30rpx 0'}" v-model="cash" placeholder="0" :clearable="false" type="number" />
						</u-cell-item>
						<u-cell-item :arrow="false" hover-class="none">
							<u-input slot="title" :custom-style="{fontSize: '32rpx'}" v-model="memo" placeholder="备注" :clearable="false" />
						</u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</view>

		<view :class="['nextStep', nextStatus ? 'greenBtn' : 'greyBtn']" @click="nextStatus ? nextStep() : ''">下一步</view>
		
		<!-- 输入密码弹框 -->
		<inputPassword  ref="inputPwNav" @correct="correct"></inputPassword>
		
		<!-- 验证指纹弹框 -->
		<fingerprint @identifySuccess="identifySuccess" ref="fingerprintNav"></fingerprint>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import inputPassword from '../../components/inputPassword.vue'
	import fingerprint from '../../components/fingerprint.vue'
	export default {
		name: 'transfer',
		components: { inputPassword, fingerprint },
		data() {
			return {
				addr: '', //输入框地址，用于比对 地址本数据
				myAddr: ',', //个人地址
				account: {}, //个人信息
				addrData: {}, //交易目标信息
				addrBook: [], //地址本
				cash: '', //输入交易价格
				memo: '', //输入交易备注
				nextStatus: false, //下一步按钮是否可用
				timer: null, //定时器
			}
		},
		watch: {
			addr(newVal) {
				this.addrData = {}
				// 判断1：有值没共享state, 防抖并轮询数据，判断2：有值有共享state，直接使用state的数据并清空state，判断3：没值，下一步按钮 disabled
				if (newVal && !Object.keys(this.$store.state.addrData).length) {
					if (this.timer) clearTimeout(this.timer)
					if (this.cash) this.nextStatus = true
					this.timer = setTimeout(() => {
						for (let i in this.addrBook) {
							if (this.addrBook[i].addr === this.addr) {
								this.addrData = this.addrBook[i]
								break
							}
						}
					}, 600);
				} else if (newVal && Object.keys(this.$store.state.addrData).length) {
					this.addrData = this.$store.state.addrData
					if (this.cash) this.nextStatus = true
					this.$store.commit('SAVE_ADDR_DATA', {})
				} else {
					this.nextStatus = false
				}
			},
			cash(newVal) {
				if(newVal*1 && this.addr) {
					this.nextStatus = true
				} else {
					this.nextStatus = false
				}
			}
		},
		onLoad() {
			this.account = this.secret.decrypt(uni.getStorageSync('account'))
			this.myAddr = uni.getStorageSync('userAddress')
			if (uni.getStorageSync('addressBook_' + uni.getStorageSync('userAddress'))) this.addrBook = uni.getStorageSync('addressBook_' + uni.getStorageSync('userAddress'))
		},
		onShow() {
			if (this.$store.state.addrData) {
				this.addr = this.$store.state.addrData.addr
			}
		},
		//调用二维码扫码功能
		onNavigationBarButtonTap() {
			let _this = this
			uni.scanCode({
				onlyFromCamera: true,
			    success: function (res) {
			        _this.addr = JSON.parse(res.result).address
			    }
			});
		},
		methods:{
			//添加新地址
			addAddress() {
				uni.navigateTo({url: `address`})
			},
			// 下一步前验证弹框
			nextStep() {
				//指纹验证或者密码验证
				if (uni.getStorageSync('fingerprintIdentification')) {
					// Android平台手动弹出等待提示框
					if ('Android' === plus.os.name) {
						this.$refs.fingerprintNav.showDialog() //指纹识别弹框展示
					}
					this.$refs.fingerprintNav.fingerprint() //指纹识别方法调用
				} else {
					this.$refs.inputPwNav.showDialog()
				}
			},
			//反馈校验是否成功
			identifySuccess(val) {
				if (val) {
					this.transation()
				} else {
					this.$refs.inputPwNav.showDialog()
				}
			},
			// 验证正确后开启交易
			correct(val) {
				if (val) {
					this.transation()
				}
			},
			//验证成功后下一步开启交易
			transation() {
				const mnemonic = this.account[this.myAddr].key
				const hschain = this.$chain('https://testnet.hschain.io/', 'hst01')
				hschain.setPath("m/44'/118'/0'/0/0")
				const ecpairPriv = hschain.getECPairPriv(mnemonic)
				this.$u.api.getAccounts(this.myAddr).then(res => {
					let stdSignMsg = hschain.newStdMsg({
						msgs: [
							{
								type: "cosmos-sdk/MsgSend",
								value: {
									amount: [
										{
											amount: String(this.cash*1000000),
											denom: "uhst"
										}
									],
									from_address: this.myAddr,
									to_address: this.addr
								}
							}
						],
						chain_id: 'test',
						fee: { amount: [ ], gas: String(this.cash*200000) },
						memo: this.memo,
						account_number: String(res.result.value.account_number),
						sequence: String(res.result.value.sequence)
					});
					const signedTx = hschain.sign(stdSignMsg, ecpairPriv)
					this.$u.api.broadcast(signedTx).then(res => {
						if (JSON.parse(res.raw_log)[0].success) {
							this.$refs.uToast.show({
								title: '交易正在处理中',
								type: 'default',
								position: 'bottom',
								duration: 2000
							})
							setTimeout(() => {
								uni.navigateBack()
							},2000)
						} else {
							this.$refs.uToast.show({
								title: JSON.parse(res.raw_log).message,
								type: 'default',
								position: 'bottom',
								duration: 4000
							})
						}
					}).catch(err => {
						console.log(err, 'err');
					})
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.transfer {
		font-size: 30rpx;
		
		/deep/ .u-cell-item-box {
			background-color: transparent;
		}
		.addrTitle {
			margin: 30rpx 5vw 20rpx;
		}
		// /deep/.u-input__input {
		// 	font-size: 36rpx;
		// }
		.addrInput {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			.input {
				margin-right: 30rpx;
			}
			.addrImg {
				width: 40rpx;
				height: 40rpx;
			}
		}
		.nextStep{
			position: fixed;
			bottom: 3vh;
			width: 90vw;
			left: 5vw;
		}
	}
</style>
