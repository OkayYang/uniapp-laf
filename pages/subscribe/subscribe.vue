<template>
    <u-transition :show="show" >
        <view class="transition" style="width: 200rpx;height: 100rpx;background-color: pink;"></view>
    </u-transition>
</template>

<script>
    export default {
        data() {
            return {
                show: true
            }
        }
    }
</script>

<style scoped>
	
</style>
