<template>
	<view class="card-loop">
		<transition-group>
			<view v-for="(item, idx) in loopModules" :key="idx" class="loop-item" :style="item.style"
				@click="handleLoop(idx)">
				<image :src="baseData[idx].icon" class="zSwiperListImage" mode="aspectFill"
					@click.stop="gameListClisk_common(baseData[idx].game_name,baseData[idx].g_tcid,baseData[idx].id,baseData[idx].game_status,baseData[idx].tc_code)" />
			</view>
		</transition-group>
	</view>
</template>

<script>
	/**
	 * 根据 id 获取下标
	 * @params arr object[]
	 * @params id number
	 * @result number n>=-1
	 */
	const findIdxById = (arr, id) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === id) {
				return i;
			}
		}
		return -1;
	};

	export default {
		props: {
			baseData: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				// 当前展示项
				loopCenterIdx: 2,
				// 轮播样式模板，用来循环赋值给 容器
				loopModules: [{
						loopIdx: 0,
						style: {
							'z-index': 7,
							transform: `scale(${1})`,
							left: 'calc(100% / 5 * 0)',
							height: '95px',
							opacity: 0.8,
						},
					},
					{
						loopIdx: 1,
						style: {
							'z-index': 8,
							transform: `scale(${1.4})`,
							left: 'calc(100% / 5 * .9)',
							height: '95px',
							opacity: 0.9,
						},
					},
					{
						loopIdx: 2,
						style: {
							transform: `scale(${1.7})`,
							'z-index': 9,
							left: 'calc(100% / 5 * 2)',
							opacity: 1,
							// border: '1.5px solid #1ba6e1',
							height: '95px',
						},
					},
					{
						loopIdx: 3,
						style: {
							transform: `scale(${1.4})`,
							'z-index': 8,
							left: 'calc(100% / 5 * 3.1)',
							opacity: 0.9,
							height: '95px',
						},
					},
					{
						loopIdx: 4,
						style: {
							'z-index': 7,
							transform: `scale(${1})`,
							left: 'calc(100% / 5 * 4)',
							height: '95px',
							opacity: 0.8,
						},
					},
				],
			};
		},
		created() {
			// todo Ajax ...
		},

		mounted() {
			// 初始化轮播
			this.initLoop();
			setInterval(() => {
				this.handleNext();
			}, 2500);
		},

		methods: {
			// 初始化轮播
			initLoop() {
				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
			},

			// 下一张
			handleNext() {
				this.loopCenterIdx = this.loopCenterIdx + 1 > 4 ? 0 : this.loopCenterIdx + 1;
				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
				this.loopModules.unshift(this.loopModules.pop());
			},

			// 上一张
			handleLast() {
				this.loopCenterIdx = this.loopCenterIdx - 1 < 0 ? 4 : this.loopCenterIdx - 1;

				this.loopModules = this.loopModules.map((item, idx) => {
					item.desc = this.baseData[idx];
					return item;
				});
				this.loopModules.push(this.loopModules.shift());
			},

			// 点击容器
			handleLoop(checkId) {
				// 当前项
				if (checkId === this.loopCenterIdx) {
					return;
				}

				if (checkId > this.loopCenterIdx) {
					if (this.loopCenterIdx === 0 && checkId === 4) {
						return this.handleLast(checkId);
					} else {
						return this.handleNext(checkId);
					}
				}

				if (checkId < this.loopCenterIdx) {
					if (checkId === 0 && this.loopCenterIdx === 4) {
						return this.handleNext(checkId);
					} else {
						return this.handleLast(checkId);
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.card-loop {
		width: 100%;
		height: 120px;
		margin-top: 30px;
		position: relative;
		margin-left: 3px;
	}



	.card-loop .loop-item {
		width: calc(100% / 5);
		float: left;
		box-sizing: border-box;
		position: absolute;
		transition: all ease-out 0.5s;
		transform-origin: 50% 50%;
	}


	.card-loop .loop-item .zSwiperListImage {
		height: 90px;
		// width: 63px;
		width: 70px;
	}

	.card-loop .loop-item image view {
		background: #1ba6e1;
		padding-bottom: 5px;
	}
</style>
