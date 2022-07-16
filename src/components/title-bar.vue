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
</style>
