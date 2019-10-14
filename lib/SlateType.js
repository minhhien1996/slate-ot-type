"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Selector = require("./Selector");

var _Utilitites = require("./Utilitites");

const {
  Value,
  Operation
} = require('slate');

const {
  isImmutable
} = require('immutable');

const slateType = {
  Value,
  Operation,
  type: {
    name: 'slate-ot-type',
    uri: 'http://sharejs.org/types/slate-ot-type',

    create(init) {
      return Value.create(init);
    },

    apply(snapshot, op) {
      let value = Value.create(snapshot);
      op.forEach(o => {
        const operation = Operation.create(o);
        value = operation.apply(value);
      });
      value = Value.create((0, _Utilitites.normalizeSnapShot)(value));
      return value;
    },

    transform(op1, op2, side) {
      op1 = op1.map(o => Operation.create(o));
      op2 = op2.map(o => Operation.create(o));
      return slateType.transformOpLists(op1, op2, side);
    },

    serialize(snapshot) {
      if (isImmutable(snapshot)) {
        return (0, _Utilitites.normalizeSnapShot)(snapshot.toJS());
      }

      return (0, _Utilitites.normalizeSnapShot)(snapshot);
    },

    deserialize(data) {
      return Value.fromJS(data);
    },

    normalize(op) {
      return (0, _Utilitites.isArray)(op) ? op : [op];
    }
    /**
         * TODO:
         *      compose operations to send them out together, at least compose for text
         *      which is the most common usage of text editor
         * @param {Operation} op1
         * @param {Operation} op2
         * compose: function (op1, op2) {
             }
         */


  },

  transformOpLists(op1, op2, side) {
    let transformedOps = [];

    for (let i = 0; i < op1.length; i += 1) {
      let leftOp = op1[i];

      for (let j = 0; j < op2.length; j += 1) {
        const rightOp = op2[j];
        leftOp = _Selector.Selector.transform(leftOp, rightOp, side);

        if ((0, _Utilitites.isArray)(leftOp) && leftOp.length > 1) {
          leftOp = slateType.transformOpLists(leftOp, op2.slice(j), side);
          break;
        }
      }

      transformedOps = (0, _Utilitites.isArray)(leftOp) ? [...transformedOps, ...leftOp] : [...transformedOps, leftOp];
    }

    return transformedOps;
  }

};
var _default = slateType;
exports.default = _default;