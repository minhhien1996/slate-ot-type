const { isImmutable } = require('immutable');

export const normalizeSnapShot = (snapShot) => {
  let o = snapShot;
  if (isImmutable(snapShot)) {
    o = snapShot.toJSON();
  }
  return o;
};

export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';
