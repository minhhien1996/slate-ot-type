"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Selector = exports.OperationTypes = void 0;

var _Transformation = require("./Transformation");

var _Utilitites = require("./Utilitites");

/* eslint-disable no-underscore-dangle */
const OperationTypes = {
  INSERT_TEXT: 'insert_text',
  REMOVE_TEXT: 'remove_text',
  ADD_MARK: 'add_mark',
  REMOVE_MARK: 'remove_mark',
  SET_MARK: 'set_mark',
  INSERT_NODE: 'insert_node',
  MERGE_NODE: 'merge_node',
  MOVE_NODE: 'move_node',
  REMOVE_NODE: 'remove_node',
  SET_NODE: 'set_node',
  SPLIT_NODE: 'split_node',

  /**
   * These operations we can actually omit
   */
  SET_SELECTION: 'set_selection',
  SET_VALUE: 'set_value'
};
exports.OperationTypes = OperationTypes;
const Selector = {
  transform: (op1, op2, side) => {
    const op = Selector._transform(op1, op2, side);

    return (0, _Utilitites.isArray)(op) ? op : [op];
  },

  /**
   *
   * @param {Operator} op1
   * @param {Operator} op2
   * @param {string} side
   */
  _transform: (op1, op2, side) => {
    if (op1.type === OperationTypes.INSERT_TEXT) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformInsTextInsText(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
          return _Transformation.Transform.transformInsTextRemoveText(op1, op2, side);

        case OperationTypes.ADD_MARK:
          return _Transformation.Transform.transformInsTextAddMark(op1, op2, side);

        case OperationTypes.SET_MARK:
          return _Transformation.Transform.transformInsTextSetMark(op1, op2, side);

        case OperationTypes.REMOVE_MARK:
          return _Transformation.Transform.transformInsTextRemoveMark(op1, op2, side);

        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformInsTextInsertNode(op1, op2, side);

        case OperationTypes.MERGE_NODE:
          return _Transformation.Transform.transformInsTextMergeNode(op1, op2, side);

        case OperationTypes.MOVE_NODE:
          return _Transformation.Transform.transformInsTextMoveNode(op1, op2, side);

        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformInsTextRemoveNode(op1, op2, side);

        case OperationTypes.SET_NODE:
          return _Transformation.Transform.transformInsTextSetNode(op1, op2, side);

        case OperationTypes.SPLIT_NODE:
          return _Transformation.Transform.transformInsTextSplitNode(op1, op2, side);

        case OperationTypes.SET_SELECTION:
          return _Transformation.Transform.transformInsTextSetSelection(op1, op2, side);

        case OperationTypes.SET_VALUE:
          return _Transformation.Transform.transformInsTextSetValue(op1, op2, side);

        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.REMOVE_TEXT) {
      switch (op2.type) {
        case OperationTypes.REMOVE_TEXT:
          return _Transformation.Transform.transformRemoveTextRemoveText(op1, op2, side);

        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformRemoveTextInsertText(op1, op2, side);

        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformRemoveTextInsertNode(op1, op2, side);

        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformRemoveTextRemoveNode(op1, op2, side);

        case OperationTypes.SPLIT_NODE:
          return _Transformation.Transform.transformRemoveTextSplitNode(op1, op2, side);

        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.ADD_MARK) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformAddMarkInsText(op1, op2, side);

        case OperationTypes.ADD_MARK:
          return _Transformation.Transform.transformAddMarkAddMark(op1, op2, side);

        case OperationTypes.REMOVE_MARK:
          return _Transformation.Transform.transformAddMarkRemoveMark(op1, op2, side);

        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformAddMarkInsertNode(op1, op2, side);

        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformAddMarkRemoveNode(op1, op2, side);

        case OperationTypes.SET_MARK:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.REMOVE_MARK) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformRemoveMarkInsText(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
          return _Transformation.Transform.transformRemoveMarkAddMark(op1, op2, side);

        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
          return _Transformation.Transform.transformRemoveMarkRemoveMark(op1, op2, side);

        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformRemoveMarkInsertNode(op1, op2, side);

        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformRemoveMarkRemoveNode(op1, op2, side);

        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.SET_MARK) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.INSERT_NODE) {
      switch (op2.type) {
        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformInsertNodeInsertNode(op1, op2, side);

        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformInsertNodeRemoveNode(op1, op2, side);

        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformInsertNodeInsertText(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
          return _Transformation.Transform.transformInsertNodeRemoveText(op1, op2, side);

        case OperationTypes.ADD_MARK:
          return _Transformation.Transform.transformInsertNodeAddMark(op1, op2, side);

        case OperationTypes.REMOVE_MARK:
          return _Transformation.Transform.transformInsertNodeRemoveMark(op1, op2, side);

        case OperationTypes.SET_MARK:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.MERGE_NODE) {
      switch (op2.type) {
        case OperationTypes.SPLIT_NODE:
          return _Transformation.Transform.transformMergeNodeSplitNode(op1, op2, side);

        case OperationTypes.INSERT_TEXT:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          return op1;
        // throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.MOVE_NODE) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.REMOVE_NODE) {
      switch (op2.type) {
        case OperationTypes.REMOVE_NODE:
          return _Transformation.Transform.transformRemoveNodeRemoveNode(op1, op2, side);

        case OperationTypes.INSERT_NODE:
          return _Transformation.Transform.transformRemoveNodeInsertNode(op1, op2, side);

        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformRemoveNodeInsertText(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
          return _Transformation.Transform.transformRemoveNodeRemoveText(op1, op2, side);

        case OperationTypes.ADD_MARK:
          return _Transformation.Transform.transformRemoveNodeAddMark(op1, op2, side);

        case OperationTypes.REMOVE_MARK:
          return _Transformation.Transform.transformRemoveNodeRemoveMark(op1, op2, side);

        case OperationTypes.SET_MARK:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.SET_NODE) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformSetNodeInsText(op1, op2, side);

        case OperationTypes.SPLIT_NODE:
          return _Transformation.Transform.transformSetNodeSplitNode(op1, op2, side);

        case OperationTypes.SET_NODE:
          return _Transformation.Transform.transformSetNodeSetNode(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.SPLIT_NODE) {
      switch (op2.type) {
        case OperationTypes.MERGE_NODE:
          return _Transformation.Transform.transformSplitNodeMergeNode(op1, op2, side);

        case OperationTypes.INSERT_TEXT:
          return _Transformation.Transform.transformSplitNodeInsText(op1, op2, side);

        case OperationTypes.REMOVE_TEXT:
          return _Transformation.Transform.transformSplitNodeRemoveText(op1, op2, side);

        case OperationTypes.SPLIT_NODE:
          return _Transformation.Transform.transformSplitNodeSplitNode(op1, op2, side);

        case OperationTypes.SET_NODE:
          return _Transformation.Transform.transformSplitNodeSetNode(op1, op2, side);

        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          return op1;
        // throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.SET_SELECTION) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else if (op1.type === OperationTypes.SET_VALUE) {
      switch (op2.type) {
        case OperationTypes.INSERT_TEXT:
        case OperationTypes.REMOVE_TEXT:
        case OperationTypes.ADD_MARK:
        case OperationTypes.SET_MARK:
        case OperationTypes.REMOVE_MARK:
        case OperationTypes.INSERT_NODE:
        case OperationTypes.MERGE_NODE:
        case OperationTypes.MOVE_NODE:
        case OperationTypes.REMOVE_NODE:
        case OperationTypes.SET_NODE:
        case OperationTypes.SPLIT_NODE:
        case OperationTypes.SET_SELECTION:
        case OperationTypes.SET_VALUE:
        default:
          throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
      }
    } else {
      throw new Error(`Unsupported operation type passed:  ${op1.type}, ${op2.type}`);
    }
  }
};
exports.Selector = Selector;