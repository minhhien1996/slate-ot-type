"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseSide = exports.isArray = exports.normalizeSnapShot = void 0;

const normalizeSnapShot = snapShot => snapShot;

exports.normalizeSnapShot = normalizeSnapShot;

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

exports.isArray = isArray;

const reverseSide = side => {
  if (side === 'left') return 'right';
  return 'left';
};

exports.reverseSide = reverseSide;