class KeepApi {
  // 收藏单张专辑
  async keepAlbum(params) {
    const db = cloud.database();
    const _ = db.command;
    try {
      const { openId, albumData } = params || {};
      const {
        albumId,
        albumName,
        artistId,
        artistName,
        cover,
        trackCount,
        releaseDate,
      } = albumData || {};

      return await db.runTransaction(async (transaction) => {
        const AlbumTable = transaction.collection("Album");
        const UserTable = transaction.collection("User");

        const { _id } = await AlbumTable.doc(`${albumId}-${openId}`).set({
          data: {
            createTime: db.serverDate(),
            updateTime: db.serverDate(),
            active: true,
            ownerOpenId: openId,
            albumId,
            albumName,
            artistId,
            artistName,
            trackCount,
            cover,
            releaseDate,
          },
        });

        if (!_id) {
          throw new Error("[keep] 收藏专辑失败");
        }

        const {
          stats: { updated },
        } = await UserTable.doc(openId).update({
          data: {
            keepAlbums: _.addToSet({
              _id,
              albumName,
            }),
            updateTime: db.serverDate(),
          },
        });

        if (updated !== 1) {
          await UserTable.add({
            data: {
              _id: openId,
              openId,
              isVip: false,
              searchHistory: [],
              keepAlbums: [
                {
                  _id,
                  albumName,
                },
              ],
              createTime: db.serverDate(),
              updateTime: db.serverDate(),
            },
          });
        }
        return { code: 2000 };
      });
    } catch (e) {
      return { code: 5000, msg: e.toString() };
    }
  }

  // 获取收藏的单张专辑
  async getAlbum(params) {
    const db = cloud.database();
    const AlbumTable = db.collection("Album");
    try {
      const { _id } = params || {};
      const { data } = await AlbumTable.doc(_id).get();
      return { code: 2000, data };
    } catch (e) {
      return { code: 5000, msg: e.toString() };
    }
  }

  // 获取收藏的专辑列表
  async getAlbumList(params) {
    const db = cloud.database();
    const AlbumTable = db.collection("Album");
    const _ = db.command;
    try {
      const { openId } = params || {};
      const { data } = await AlbumTable.where({
        ownerOpenId: _.eq(openId),
        active: true,
      }).get();
      return { code: 2000, data };
    } catch (e) {
      return { code: 5000, msg: e.toString() };
    }
  }

  // 移除收藏的单张专辑
  async removeAlbum(params) {
    const db = cloud.database();
    const _ = db.command;
    try {
      const { openId, _id } = params || {};

      // 校验 openId
      if (!String(_id).includes(openId)) {
        throw new Error("[keep] 没有权限删除专辑");
      }

      return await db.runTransaction(async (transaction) => {
        const AlbumTable = transaction.collection("Album");
        const UserTable = transaction.collection("User");

        const {
          stats: { updated: albumUpdated },
        } = await AlbumTable.doc(_id).update({
          data: {
            updateTime: db.serverDate(),
            active: false,
          },
        });

        if (albumUpdated !== 1) {
          throw new Error("[keep] 删除专辑失败");
        }

        await UserTable.doc(openId).update({
          data: {
            keepAlbums: _.pull({
              _id: _.eq(_id),
            }),
            updateTime: db.serverDate(),
          },
        });

        return { code: 2000 };
      });
    } catch (e) {
      return { code: 5000, msg: e.toString() };
    }
  }
}

module.exports = KeepApi;
