<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view>
      <text class="title" @click="onClick">{{ title }}</text>
    </view>
    <u-search placeholder="日照香炉生紫烟"></u-search>
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
