<template>
  <skeleton :pending="pending">
    <view class="album-list">
      <view
        class="album-item"
        v-for="item in albumList"
        v-bind:key="item.albumId"
      >
        <image
          class="album-cover"
          mode="aspectFill"
          :lazy-load="true"
          :src="item.cover.s500"
        />
        <view class="album-name">{{ item.albumName }}</view>
        <view class="album-artist">{{ item.artistName }}</view>
      </view>
    </view>
  </skeleton>
</template>

<script>
import Skeleton from "./skeleton.vue";
export default {
  components: {
    skeleton: Skeleton,
  },
  props: {
    albumList: {
      type: Array,
      default: [],
    },
    pending: {
      type: Boolean,
      default: false,
    },
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
@mixin ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@mixin background {
  background: #f1f2f4;
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
    @include ellipsis;
    color: #000;
    font-size: 30rpx;
    line-height: 32rpx;
    height: 32rpx;
    margin-top: 6rpx;
  }

  .album-artist {
    @include ellipsis;
    margin-top: 10rpx;
    color: rgba(0, 0, 0, 0.6);
    font-size: 24rpx;
    line-height: 26rpx;
    height: 26rpx;
  }
}
</style>
