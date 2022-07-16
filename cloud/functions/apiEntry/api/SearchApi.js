const axios = require("axios").default;
const { getClipImageUrl } = require("../utils/image");
const { getDate } = require("../utils/time");
const UserApi = require("./UserApi");

class SearchApi {
  // 搜索专辑列表
  async searchAlbumList(params) {
    try {
      const { openId, query } = params || {};

      // 参数校验
      if (typeof query !== "string" || !query) {
        throw new Error("[search] 参数错误");
      }

      // 敏感词校验
      await cloud.openapi.security.msgSecCheck({
        content: query,
      });

      // 记录搜索历史
      const userApi = new UserApi();
      userApi.addSearchHistory(params);

      const list = await axios({
        method: "get",
        baseURL: "https://itunes.apple.com",
        url: `/search?media=music&country=CN&entity=album&term=${encodeURIComponent(
          query
        )}`,
      }).then((response) => {
        const data = response.data;
        const { results } = data || {};
        return (results || []).map((item) => {
          return {
            albumId: item.collectionId, // 专辑ID
            albumName: item.collectionName, // 专辑名称
            artistId: item.artistId, // 艺术家ID
            artistName: item.artistName, // 艺术家名称
            trackCount: item.trackCount, // 专辑中的歌曲数量
            cover: {
              // 专辑封面
              s100: getClipImageUrl(item.artworkUrl100, 100),
              s500: getClipImageUrl(item.artworkUrl100, 500),
              s1000: getClipImageUrl(item.artworkUrl100, 1000),
              s2000: getClipImageUrl(item.artworkUrl100, 2000),
              s3000: getClipImageUrl(item.artworkUrl100, 3000),
            },
            releaseDate: getDate(item.releaseDate), // 发行时间
          };
        });
      });

      const db = cloud.database();
      const UserTable = db.collection("User");
      const { data } = await UserTable.doc(openId)
        .get()
        .catch((e) => {
          return {};
        });

      return {
        code: 2000,
        data: {
          keepAlbums: data ? data.keepAlbums : [],
          list,
        },
      };
    } catch (e) {
      return { code: 5000, msg: e.toString() };
    }
  }
}

module.exports = SearchApi;
