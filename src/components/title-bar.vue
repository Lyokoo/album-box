<template>
  <view class="title-bar" :style="{ top: statusBarHeight + 'px' }">
    <view
      class="back-icon"
      :style="{
        height: capsuleHeight + 'px',
        width: capsuleHeight + 'px',
        marginTop: capsulePaddingTop + 'px',
      }"
      @click="onBack"
    >
      <u-icon name="arrow-left" color="#000000" :size="capsuleHeight / 2" />
    </view>
  </view>
</template>

<script>
import { envMixin } from "../utils/envMixin";
export default {
  mixins: [envMixin],
  methods: {
    onBack() {
      wx.navigateBack();
    },
  },
};
</script>

<style lang="scss">
.title-bar {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding-left: 20rpx;
  overflow: hidden;

  .back-icon {
    width: 60rpx;
    height: 60rpx;
    background: rgb(255, 255, 255, 0.7);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10rpx);
  }
}
</style>
