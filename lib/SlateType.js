"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fp = require("lodash/fp");

var _Selector = require("./Selector");

var _Utilitites = require("./Utilitites");

const {
  Value,
  Operation
} = require('slate');

const {
  isImmutable
} = require('immutable');

function serializedApply(snapshot, op) {
  let value = Value.create(snapshot);
  op.forEach(o => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value.toJS();
}

function deserializedApply(oldValue, op) {
  let value = oldValue;
  op.forEach(o => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value;
}

const toJSON = op => {
  if (op instanceof Operation) {
    return op.toJS();
  }

  return op;
};

const logOps = (message = '', op) => {
  if ((0, _Utilitites.isArray)(op)) {
    console.log(message, op.map(toJSON));
    return;
  }

  console.log(message, toJSON(op));
};

const ensureArray = singleOrListOp => {
  const list = (0, _Utilitites.isArray)(singleOrListOp) ? singleOrListOp : [singleOrListOp]; // FIXME: instanceof maybe heavy?

  return list.map(op => op instanceof Operation ? op : Operation.create(op));
};

const transformOpLists = (op1, op2, side) => {
  logOps('transformOpLists op1', op1);
  logOps('transformOpLists op2', op2);
  console.log('transformOpLists', side);
  let top = ensureArray(op2);
  const left = ensureArray(op1);
  if ((0, _fp.isEmpty)(left) || (0, _fp.isEmpty)(top)) return left;
  const right = [];
  left.forEach(leftOp => {
    const middle = [];
    const bottom = [];
    logOps('left op ', leftOp);
    top.forEach((topOp, j) => {
      logOps('top op ', topOp);
      const currentLeftOp = j === 0 ? leftOp : middle[j - 1];
      logOps('current left op ', currentLeftOp);

      const middleOp = _Selector.Selector.transform(currentLeftOp, topOp, side);

      const bottomOp = _Selector.Selector.transform(topOp, currentLeftOp, (0, _Utilitites.reverseSide)(side));

      logOps('middle op', middleOp);
      logOps('bottom op', bottomOp);
      bottom.push(bottomOp);
      middle.push(middleOp);
    });
    right.push((0, _fp.last)(middle));
    logOps('current right', right);
    top = bottom;
  });
  return right;
};

const slateType = {
  Value,
  Operation,
  type: {
    name: 'slate-ot-type',
    uri: 'http://sharejs.org/types/slate-ot-type',

    create(data) {
      return data;
    },

    createDeserialized(data) {
      if (isImmutable(data)) {
        return data;
      }

      if (data == null) {
        return null;
      }

      return Value.create(data);
    },

    apply(snapshot, op) {
      logOps('apply ops', op);

      if (isImmutable(snapshot)) {
        return deserializedApply(snapshot, op);
      }

      return serializedApply(snapshot, op);
    },

    transform(op1, op2, side) {
      console.log('will transform ops', side);
      logOps(op1);
      logOps(op2);
      return transformOpLists(op1, op2, side);
    },

    serialize(value) {
      if (!isImmutable(value)) {
        return value;
      }

      return value.toJS();
    },

    deserialize(data) {
      return Value.create(data);
    },

    normalize(singleOrListOp) {
      logOps('normalize', singleOrListOp);
      return ensureArray(singleOrListOp);
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
  transformOpLists
};
var _default = slateType;
exports.default = _default;