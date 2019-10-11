"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.normalizeSnapShot = void 0;

const {
  isImmutable
} = require('immutable');

const normalizeSnapShot = snapShot => {
  let o = snapShot;

  if (isImmutable(snapShot)) {
    o = snapShot.toJSON();
  }

  return o;
};

exports.normalizeSnapShot = normalizeSnapShot;

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

exports.isArray = isArray;