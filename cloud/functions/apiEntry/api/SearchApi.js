class SearchApi {
  async getAlbumList(params) {
    return {
      arr: [1, 2, 3],
      params
    };
  }
}

module.exports = SearchApi;