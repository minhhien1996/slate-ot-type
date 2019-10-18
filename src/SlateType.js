import { Selector } from './Selector';
import { isArray } from './Utilitites';

const { Value, Operation } = require('slate');
const { isImmutable } = require('immutable');

function serializedApply(snapshot, op) {
  let value = Value.create(snapshot);
  op.forEach((o) => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value.toJS();
}

function deserializedApply(oldValue, op) {
  let value = oldValue;
  op.forEach((o) => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value;
}

const toJSON = (op) => {
  if (op instanceof Operation) {
    return op.toJS();
  }
  return op;
};

const logOps = (message = '', op) => {
  if (isArray(op)) {
    console.log(message, op.map(toJSON));
    return;
  }
  console.log(message, toJSON(op));
};

const transformOpLists = (op1, op2, side) => {
  let transformedOps = [];
  logOps('transformOpLists op1', op1);
  logOps('transformOpLists op2', op2);
  op1.forEach((op, i) => {
    let leftOp = op instanceof Operation ? op : Operation.create(op);
    logOps(`Left ops at step ${i}`, leftOp);
    // eslint-disable-next-line
    for (let j = 0; j < op2.length; j++) {
      const rightOp = op2[j] instanceof Operation ? op2[j] : Operation.create(op2[j]);
      leftOp = Selector.transform(leftOp, rightOp, side);
      logOps('transform result', leftOp);
      if (isArray(leftOp)) {
        if (leftOp.length > 1) {
          leftOp = transformOpLists(leftOp, op2.slice(j), side);
          break;
        } else {
          // eslint-disable-next-line prefer-destructuring
          leftOp = leftOp[0];
        }
      }
    }

    transformedOps = isArray(leftOp)
      ? [...transformedOps, ...leftOp]
      : [...transformedOps, leftOp];

    logOps(`transformedOps ops at step ${i}`, transformedOps);
  });

  return transformedOps;
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
      const opList = isArray(singleOrListOp) ? singleOrListOp : [singleOrListOp];
      return opList.map((o) => Operation.create(o));
    },
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
  transformOpLists,
};

export default slateType;
