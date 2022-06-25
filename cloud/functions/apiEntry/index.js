const cloud = require("wx-server-sdk");
cloud.init();
const SearchApi = require("./api/SearchApi");
const KeepApi = require("./api/KeepApi");
const UserApi = require("./api/UserApi");

global.cloud = cloud;
global.db = cloud.database();

const Types = ["search", "keep", "user"];

const apiMap = {
  search: new SearchApi(),
  keep: new KeepApi(),
  user: new UserApi(),
};

// API 入口函数
exports.main = async (event) => {
  try {
    const wxContext = cloud.getWXContext();
    const { type, action, params } = event;

    if (!Types.includes(type)) {
      throw new Error("type is not in ['search', 'keep', 'user']");
    }

    const func = apiMap[type][action];

    if (typeof func !== "function") {
      throw new Error("action is not a function");
    }

    const res = await func({
      ...params,
      openId: wxContext.APPID,
    });
    return res;
  } catch (e) {
    return { code: 5000, msg: e.toString() };
  }
};
