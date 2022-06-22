const axios = require("axios").default;
const { getClipImageUrl } = require("../utils/image");

class SearchApi {
  async getAlbumList(params) {
    try {
      const { query } = params || {};
      if (typeof query !== "string" || !query) {
        throw new Error();
      }
      const res = await axios({
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
            collectionId: item.collectionId, // 专辑ID
            collectionName: item.collectionName, // 专辑名称
            artistName: item.artistName, // 艺术家名称
            trackCount: item.trackCount, // 专辑中的歌曲数量
            cover: {
              // 专辑封面
              low: getClipImageUrl(item.artworkUrl100, 100),
              mid: getClipImageUrl(item.artworkUrl100, 1000),
              high: getClipImageUrl(item.artworkUrl100, 3000),
            },
            releaseDate: item.releaseDate, // 发行时间
          };
        });
      });
      return {
        code: 2000,
        data: res,
      };
    } catch (e) {
      return { code: 5000 };
    }
  }
}

module.exports = SearchApi;
