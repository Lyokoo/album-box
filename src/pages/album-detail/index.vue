<template>
  <block>
    <title-bar />
    <view class="bg" v-if="screenHeight && albumItem">
      <image class="bg-image" mode="aspectFill" :src="albumItem.cover.s100" />
    </view>
    <view
      class="album-detail"
      v-if="screenHeight && albumItem"
      :style="{ height: screenHeight + 'px' }"
    >
      <view class="container">
        <image class="cover" :src="albumItem.cover.s500" mode="aspectFill" />
        <view class="info" v-if="albumInfo.length">
          <view
            class="row"
            v-for="(item, index) in albumInfo"
            v-bind:key="index"
          >
            <text class="col" :decode="true">{{ item[0] }}</text>
            <text class="col" :decode="true">{{ item[1] }}</text>
          </view>
        </view>
        <view class="group">
          <view class="btn" @click="onSave">保存到相册</view>
          <!-- <view class="btn" @click="onKeep">收藏</view> -->
        </view>
      </view>
    </view>
  </block>
</template>

<script>
import { envMixin } from "../../utils/envMixin";
import { AlbumListCache } from "../../utils/cache";
import { toPromise } from "../../utils/toPromise";
import titleBar from "../../components/title-bar.vue";
export default {
  mixins: [envMixin],
  components: {
    "title-bar": titleBar,
  },
  data() {
    return {
      albumItem: undefined,
    };
  },
  computed: {
    albumInfo() {
      if (!this.albumItem) {
        return [];
      }
      let releaseTime;
      const date = this.albumItem?.releaseDate || {};
      const year = date.year || 0;
      const month = date.month || 0;
      const day = date.day || 0;
      if (year || month || day) {
        releaseTime = `${year}-${month}-${day}`;
      }
      const resInfo = [
        [
          "专辑名称 ：",
          this.albumItem.albumName ? `《${this.albumItem.albumName}》` : "未知",
        ],
        ["艺人 ：", this.albumItem.artistName || "未知"],
        ["发行时间 ：", releaseTime || "未知"],
        ["歌曲数量 ：", this.albumItem.trackCount || "未知"],
      ];
      return resInfo;
    },

    backIconSize() {
      return this.rpxToPx(32);
    },
  },
  methods: {
    initData(albumId) {
      if (!Number.isInteger(albumId)) {
        return;
      }
      const item = AlbumListCache.get().find(
        (item) => item.albumId === albumId
      );
      this.albumItem = item;
    },

    onSave() {
      const saveToPhotosGallery = async (quality = 1000) => {
        try {
          if (!this.albumItem) {
            throw new Error("数据不存在");
          }

          if (this.pending) {
            return;
          }

          wx.showLoading({ title: "正在保存", mask: true });
          this.pending = true;

          const downloadRes = await toPromise(wx.downloadFile)({
            url: this.albumItem.cover[`s${quality}`],
          });
          if (downloadRes?.statusCode === 200) {
            await toPromise(wx.saveImageToPhotosAlbum)({
              filePath: downloadRes.tempFilePath,
            });
            wx.hideLoading();
            wx.showToast({
              title: "保存成功",
              icon: "success",
              mask: true,
              duration: 1500,
            });
            this.pending = false;
          } else {
            throw new Error("保存失败");
          }
        } catch (e) {
          wx.hideLoading();
          this.pending = false;
          wx.showToast({
            title: "保存失败",
            icon: "error",
            mask: true,
            duration: 1500,
          });
        }
      };

      wx.showActionSheet({
        itemList: ["标清封面", "高清封面"],
      }).then((res) => {
        const index = res.tapIndex;
        if (index === 0) {
          saveToPhotosGallery(1000);
        } else if (index === 1) {
          saveToPhotosGallery(3000);
        }
      });
    },

    onKeep() {},
  },
  onLoad(options) {
    this.initData(Number(options?.albumId));
  },
};
</script>

<style lang="scss">
.album-detail {
  position: relative;
  overflow: hidden;
}

.bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .bg-image {
    width: 100%;
    height: 100%;
    transform-origin: center;
    background: rgba(0, 0, 0, 0.7);
    filter: blur(10rpx) brightness(0.7);
    transform: scale(1.2);
  }
}

.container {
  position: relative;
  z-index: 1;
  width: 750rpx;
  margin-top: 300rpx;
}

.cover {
  width: 500rpx;
  height: 500rpx;
  border-radius: 10rpx;
  box-shadow: 0 0 60rpx rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  display: block;
}

.info {
  margin-top: 50rpx;

  .row {
    display: flex;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    font-weight: bold;
    padding-left: 130rpx;
    box-sizing: border-box;

    &:not(:first-child) {
      margin-top: 8rpx;
    }

    .col {
      &:first-child {
        text-align: right;
        width: 25%;
      }
      &:last-child {
        text-align: left;
        width: calc(100% - 25% - 30rpx);
      }
    }
  }
}

.group {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50rpx;

  .btn {
    box-sizing: border-box;
    border-radius: 10rpx;
    height: 90rpx;
    font-size: 32rpx;
    font-weight: bold;
    border: 4rpx solid #fff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40rpx;

    &:not(:first-child) {
      margin-left: 30rpx;
    }
  }
}
</style>
