import { Selector } from './Selector';
import { isArray } from './Utilitites';

const { Value, Operation } = require('slate');
const { isImmutable } = require('immutable');

function serializedApply(snapshot, op) {
  console.log('serializedApply', snapshot);
  let value = Value.create(snapshot);
  op.forEach((o) => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value.toJS();
}

function deserializedApply(snapshot, op) {
  console.log('deserializedApply', snapshot);
  let value = snapshot;
  op.forEach((o) => {
    const operation = Operation.create(o);
    value = operation.apply(value);
  });
  return value;
}

const slateType = {
  Value,
  Operation,
  type: {
    name: 'slate-ot-type',
    uri: 'http://sharejs.org/types/slate-ot-type',
    create(data) {
      console.log('create', data);
      return data;
    },
    createDeserialized(data) {
      console.log('createDeserialized', data);
      if (isImmutable(data)) {
        return data;
      }
      if (data == null) {
        return null;
      }
      return Value.create(data);
    },
    apply(snapshot, op) {
      if (isImmutable(snapshot)) {
        return deserializedApply(snapshot, op);
      }
      return serializedApply(snapshot, op);
    },
    transform(op1, op2, side) {
      op1 = op1.map((o) => Operation.create(o));
      op2 = op2.map((o) => Operation.create(o));
      return slateType.transformOpLists(op1, op2, side);
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
    normalize(op) {
      return isArray(op) ? op : [op];
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
  transformOpLists(op1, op2, side) {
    let transformedOps = [];
    for (let i = 0; i < op1.length; i += 1) {
      let leftOp = op1[i];
      for (let j = 0; j < op2.length; j += 1) {
        const rightOp = op2[j];
        leftOp = Selector.transform(leftOp, rightOp, side);
        if (isArray(leftOp) && leftOp.length > 1) {
          leftOp = slateType.transformOpLists(leftOp, op2.slice(j), side);
          break;
        }
      }

      transformedOps = isArray(leftOp)
        ? [...transformedOps, ...leftOp]
        : [...transformedOps, leftOp];
    }

    return transformedOps;
  },
};

export default slateType;
