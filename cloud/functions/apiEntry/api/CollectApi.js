class CollectApi {
  async collectAlbum(params) {
    const db = cloud.database();
    const AlbumTable = db.collection("Album");
    try {
      const { openId, albumData } = params || {};
      const reqData = {
        createTime: new Date(),
        active: true,
        ownerOpenId: openId,
        ...albumData,
      };
      await AlbumTable.add({
        data: reqData,
      });
      return { code: 2000 };
    } catch (e) {
      return { code: 5000, e: e.toString() };
    }
  }

  async removeAlbum(params) {
    const db = cloud.database();
    const AlbumTable = db.collection("Album");
    const _ = db.command;
    try {
      const { openId, albumId } = params || {};
      const { stats: { updated } } = await AlbumTable.where({
        _id: _.eq(albumId),
        ownerOpenId: _.eq(openId),
      }).update({
        data: {
          active: false,
          updateTime: new Date(),
        }
      });
      if (updated !== 1) {
        throw new Error('状态更新失败');
      }
      return { code: 2000 };
    } catch (e) {
      return { code: 5000, e: e.toString() };
    }
  }
}

module.exports = CollectApi;
