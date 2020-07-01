<template>
	<view class="page-content">
		<view class="banner">
			产品图占位或其他内容
		</view>
		<luBarTabNav :tabList="tabList" :barFixed="barFixed" :iconShow="iconShow" :barHeight="barHeight"
					 :barTop="barTop" :barId="barId" ref="barTabNav">
			<view id="item1" class="tabbody">
				产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br>
				产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br>
				产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br> 产品内容1<br>
				产品内容1<br> 产品内容1<br> 产品内容1<br>
			</view>
			<view id="item2" class="tabbody">
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
				产品内容2<br> 产品内容2<br> 产品内容2<br> 产品内容2<br>
			</view>
			<view id="item3" class="tabbody">
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
				产品内容3<br> 产品内容3<br> 产品内容3<br> 产品内容3<br>
			</view>
		</luBarTabNav>
	</view>
</template>
<script>
    export default {

        data() {
            return {
                barFixed: true,
                barHeight: '44',
                barTop: 0,
                iconShow: true,
                barId: '0',
                tabList: [{
                    text: '产品介绍1',
                    navTarget: '#item1',
                    iconClass: 'icon01',
                    iconImage: '',
                    selectedIconClass: '',
                    selectedIconImage: ''
                }, {
                    text: '产品介绍2',
                    navTarget: '#item2',
                    iconClass: 'icon02',
                    iconImage: '',
                    selectedIconClass: '',
                    selectedIconImage: ''
                }, {
                    text: '产品介绍3',
                    navTarget: '#item3',
                    iconClass: 'icon03',
                    iconImage: '',
                    selectedIconClass: '',
                    selectedIconImage: ''
                }]
            }
        },
        onPageScroll: function (e) {
            this.$refs.barTabNav._selectedTab(e.scrollTop)
        },

    }
</script>

<style>
	.page-content {
		position: relative;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		background-color: #eee;
		font-size: 14px;
	}

	.banner {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tabbody {
		position: relative;
		width: 100%;
		border-bottom: 3px solid #4CD964;
	}
</style>
