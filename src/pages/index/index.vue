<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view @click="search">[search] 搜索</view>
    <view @click="keepAlbum">[album]收藏单张专辑</view>
    <view @click="getAlbum">[album]获取收藏的单张专辑</view>
    <view @click="getAlbumList">[album]获取收藏的专辑列表</view>
    <view @click="removeAlbum">[album]移除收藏的单张专辑</view>
    <!-- <view @click="onRemove">删除</view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    async search() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "search",
          action: "searchAlbumList",
          params: {
            query: "李荣浩",
          },
        },
      });
      console.log(res);
    },

    async keepAlbum() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "keep",
          action: "keepAlbum",
          params: {
            albumData: {
              artistName: "周杰伦",
              albumId: 535824731,
              albumName: "葉惠美",
              cover: {
                high: "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/45/8a/e4/458ae484-dc8b-5683-ce04-8d2948346462/JAY.jpg/3000x3000bb.jpg",
                low: "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/45/8a/e4/458ae484-dc8b-5683-ce04-8d2948346462/JAY.jpg/100x100bb.jpg",
                mid: "https://is4-ssl.mzstatic.com/image/thumb/Music115/v4/45/8a/e4/458ae484-dc8b-5683-ce04-8d2948346462/JAY.jpg/1000x1000bb.jpg",
              },
              releaseDate: "2003-07-29T07:00:00Z",
              trackCount: 11,
            },
          },
        },
      });
    },

    async getAlbum() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "keep",
          action: "getAlbum",
          params: {
            _id: "535824731-wx8f70cf87f04178f0",
          },
        },
      });
    },

    async getAlbumList() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "keep",
          action: "getAlbumList",
          params: {
          },
        },
      });
    },

    async removeAlbum() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "keep",
          action: "removeAlbum",
          params: {
            _id: "535824731-wx8f70cf87f04178f0",
          },
        },
      });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
