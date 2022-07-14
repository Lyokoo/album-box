<template>
  <view class="search-page">
    <view class="search-bar">
      <u-search
        placeholder="专辑、歌曲、艺人等内容"
        :show-action="false"
        shape="square"
        height="64rpx"
        @search="onSearch"
      />
    </view>
    <view class="container">
      <album-list :albumList="albumList" :pending="pending" />
    </view>
  </view>
</template>

<script>
import AlbumList from "../../components/album-list.vue";
export default {
  components: {
    "album-list": AlbumList,
  },
  data() {
    return {
      albumList: [],
      keepAlbums: [],
      pending: false,
    };
  },
  onLoad() {},
  methods: {
    async onSearch(value) {
      try {
        this.pending = true;
        const res = await wx.cloud.callFunction({
          name: "apiEntry",
          data: {
            type: "search",
            action: "searchAlbumList",
            params: {
              query: value,
            },
          },
        });
        const code = res?.result?.code;
        if (code === 2000) {
          this.albumList = res.result.data.list;
          this.keepAlbums = res.result.data.keepAlbums;
          this.pending = false;
        } else {
          throw new Error("请稍后再试");
        }
      } catch (e) {
        //
        this.pending = false;
      }
    },
  },
};
</script>

<style lang="scss">
/* height: 84rpx = 64rpx + 20rpx */
.search-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-sizing: border-box;
  padding: 10rpx 30rpx;
}

.container {
  box-sizing: border-box;
  padding-top: 104rpx;
}
</style>
