<template>
  <skeleton :pending="pending">
    <view class="album-list">
      <view
        class="album-item"
        v-for="item in albumList"
        v-bind:key="item.albumId"
        @click="onItemClick(item)"
      >
        <image
          class="album-cover"
          mode="aspectFill"
          :lazy-load="true"
          :src="item.cover.s500"
        />
        <image
          class="album-cover-preload"
          :lazy-load="true"
          :src="item.cover.s100"
        />
        <view class="album-name">{{ item.albumName }}</view>
        <view class="album-artist"
          >{{ item.artistName }}{{ ` · ${item.releaseDate.year}` }}</view
        >
      </view>
    </view>
  </skeleton>
</template>

<script>
import Skeleton from "./sk.vue";
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
  methods: {
    onItemClick(item) {
      this.$emit("itemclick", item);
    },
  },
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
  position: relative;

  &:nth-child(n + 3) {
    margin-top: 30rpx;
  }

  .album-cover {
    @include background;
    width: 330rpx;
    height: 330rpx;
    border-radius: 10rpx;
  }

  .album-cover-preload {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 1rpx;
    height: 1rpx;
  }

  .album-name {
    @include ellipsis;
    color: #000;
    font-size: 30rpx;
    line-height: 1;
    height: 34rpx;
    margin-top: 8rpx;
  }

  .album-artist {
    @include ellipsis;
    margin-top: 12rpx;
    color: rgba(0, 0, 0, 0.5);
    font-size: 24rpx;
    line-height: 1;
    height: 28rpx;
  }
}
</style>
