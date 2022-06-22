<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title" @click="onClick">{{ title }}</text>
    </view>
    <u-search placeholder="日照香炉生紫烟"></u-search>
    <view @click="onCollect">收藏</view>
    <view @click="onRemove">删除</view>
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
    async onClick() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "search",
          action: "getAlbumList",
          params: {
            query: "叶惠美",
          },
        },
      });
      console.log("res==>", res);
    },
    async onCollect() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "collect",
          action: "collectAlbum",
          params: {
            albumData: {
              artistName: "周杰伦",
              collectionId: 535824731,
              collectionName: "葉惠美",
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
      console.log("res==>", res);
    },
    async onRemove() {
      const res = await wx.cloud.callFunction({
        name: "apiEntry",
        data: {
          type: "collect",
          action: "removeAlbum",
          params: {
            albumId: "6d85a2b962b32a720c1e8b775e82b98e",
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
