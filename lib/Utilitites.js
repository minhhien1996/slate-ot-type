"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.normalizeSnapShot = void 0;

const normalizeSnapShot = snapShot => snapShot;

exports.normalizeSnapShot = normalizeSnapShot;

const isArray = obj => Object.prototype.toString.call(obj) === '[object Array]';

exports.isArray = isArray;