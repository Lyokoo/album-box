class UserApi {
  // 添加搜索记录
  async addSearchHistory(params) {
    const db = cloud.database();
    const _ = db.command;
    try {
      const { openId, query } = params || {};
      return await db.runTransaction(async (transaction) => {
        const UserTable = transaction.collection("User");

        const {
          stats: { updated },
        } = await UserTable.doc(openId).update({
          data: {
            searchHistory: _.addToSet(query),
            updateTime: db.serverDate(),
          },
        });

        if (updated !== 1) {
          await UserTable.add({
            data: {
              _id: openId,
              openId,
              isVip: false,
              searchHistory: [query],
              keepAlbums: [],
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
}

module.exports = UserApi;
