<template>
  <view class="search-page">
    <view class="search-bar">
      <u-search
        placeholder="专辑、歌曲、艺人等内容"
        :show-action="true"
        :clearabled="true"
        shape="square"
        height="64rpx"
        :animation="true"
        v-model="inputValue"
        @search="onSearch"
        @custom="onSearch"
        @clear="onClear"
      />
    </view>
    <view class="container">
      <album-list
        :albumList="albumList"
        :pending="pending"
        @itemclick="onItemClick"
      />
    </view>
  </view>
</template>

<script>
import AlbumList from "../../components/album-list";
import { AlbumListCache } from "../../utils/cache";
export default {
  components: {
    "album-list": AlbumList,
  },
  data() {
    return {
      inputValue: "",
      albumList: [],
      pending: false,
    };
  },
  methods: {
    // 搜索
    async onSearch(value) {
      if (!value.trim()) {
        return;
      }
      try {
        this.pending = true;
        this.setAlbumList([]);
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
          this.setAlbumList(res.result.data.list);
          this.pending = false;
        } else {
          throw new Error("请稍后再试");
        }
      } catch (e) {
        //
        this.pending = false;
        this.setAlbumList([]);
      }
    },

    // 清除输入框
    onClear() {
      this.inputValue = [];
    },

    // 设置专辑列表和缓存
    setAlbumList(list = []) {
      this.albumList = list;
      AlbumListCache.set(list);
    },

    // 跳转详情页
    onItemClick(item) {
      if (item?.albumId) {
        wx.navigateTo({
          url: `/pages/album-detail/index?albumId=${item?.albumId}`,
        });
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
  z-index: 100;
  background: #fff;
  box-sizing: border-box;
  padding: 10rpx 30rpx;
}

.container {
  box-sizing: border-box;
  padding-top: 104rpx;
}
</style>
