export class AlbumListCache {
  static list = [];

  static get() {
    return AlbumListCache.list;
  }

  static set(l) {
    AlbumListCache.list = l;
  }
}

export const getSystemInfo = (() => {
  let systemInfo = null;
  return (options) => {
    const { cache = true } = options || {};
    if (cache && systemInfo) {
      return systemInfo;
    }
    try {
      systemInfo = wx.getSystemInfoSync ? wx.getSystemInfoSync() : {};
      console.log("systemInfo: ", systemInfo);
      return systemInfo;
    } catch (e) {
      return {};
    }
  };
})();

export const getMenuButtonBoundingClientRect = (() => {
  let rectInfo = null;
  return (options) => {
    const { cache = true } = options || {};
    if (cache && rectInfo) {
      return rectInfo;
    }
    try {
      rectInfo = wx.getMenuButtonBoundingClientRect
        ? wx.getMenuButtonBoundingClientRect()
        : {};
      console.log("rectInfo: ", rectInfo);
      return rectInfo;
    } catch (e) {
      return {};
    }
  };
})();
