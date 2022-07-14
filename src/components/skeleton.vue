<template>
  <block>
    <view class="album-list" v-if="pending">
      <view class="album-item" v-for="item in mockData" v-bind:key="item">
        <div class="album-cover animate" />
        <view class="album-name animate" />
        <view class="album-artist animate" />
      </view>
    </view>
    <slot tt:else></slot>
  </block>
</template>

<script>
export default {
  props: {
    pending: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mockData: Array(6).fill(1),
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
@mixin background {
  background: linear-gradient(120deg, #f1f2f4 25%, #e6e6e6 37%, #f1f2f4 50%);
  background-size: 400% 100%;
}

.album-list {
  box-sizing: border-box;
  padding: 0 30rpx 30rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.album-item {
  flex-shrink: 0;
  width: 330rpx;

  &:nth-child(n + 3) {
    margin-top: 30rpx;
  }

  .album-cover {
    @include background;
    width: 330rpx;
    height: 330rpx;
    border-radius: 10rpx;
  }

  .album-name {
    @include background;
    height: 30rpx;
    margin-top: 6rpx;
    border-radius: 10rpx;
  }

  .album-artist {
    @include background;
    margin-top: 8rpx;
    width: 50%;
    height: 24rpx;
    border-radius: 10rpx;
  }
}

.animate {
  animation: skeleton 1.5s ease infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
