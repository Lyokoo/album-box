const cloud = require("wx-server-sdk");
cloud.init();
const SearchApi = require("./api/SearchApi");

// global.cloud = cloud;
// global.db = cloud.database();
// global._ = db.command;
// global.$ = _.aggregate;

const Types = ["search", "star"];

const apiMap = {
  search: new SearchApi(),
};

// API 入口函数
exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext();
    const { type, action, params } = event;

    if (!Types.includes(type)) {
      throw new Error();
    }

    const func = apiMap[type][action];

    if (typeof func !== "function") {
      throw new Error();
    }

    const res = await func({
      ...params,
      openId: wxContext.APPID,
    });
    return res;
  } catch (e) {
    return {};
  }
};
