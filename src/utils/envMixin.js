import { getSystemInfo, getMenuButtonBoundingClientRect } from "./cache";

export const envMixin = {
  data() {
    const { statusBarHeight, screenHeight, safeArea, windowWidth } =
      getSystemInfo();
    const { bottom = screenHeight } = safeArea || {};
    const {
      width: capsuleWidth,
      height: capsuleHeight,
      top: capsuleTop,
    } = getMenuButtonBoundingClientRect();

    return {
      statusBarHeight,
      screenHeight,
      safeArea: screenHeight - bottom,
      windowWidth,
      capsuleWidth,
      capsuleHeight,
      capsulePaddingTop: capsuleTop - statusBarHeight,
    };
  },
  methods: {
    rpxToPx(rpx) {
      if (this.windowWidth) {
        return (rpx / 750) * this.windowWidth;
      }
      return 0;
    },
  },
};
