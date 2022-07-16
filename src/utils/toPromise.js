export const toPromise = (fn) => {
  return (options) => {
    return new Promise((resolve, reject) => {
      fn({
        ...options,
        success: (res) => {
          resolve(res);
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  };
};
