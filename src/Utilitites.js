export const normalizeSnapShot = (snapShot) => snapShot;

export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

export const reverseSide = (side) => {
  if (side === 'left') return 'right';
  return 'left';
};
