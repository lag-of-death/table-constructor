import { actions } from './constants';

const withoutLastElement = (array) => {
  return array.slice(0, -1);
};

const getTableWithoutLastColumn = (rows) => {
  return rows.map(withoutLastElement);
};

const getNumOfFirstRowColumns = (table) => {
  return table[0].length;
};

const isWrongValue = (value, maxLength) => {
  return isNaN(value) || (value > maxLength);
};

const guard = (numToSetFromUser, maxNumToSetTo, callback) =>
  (isWrongValue(numToSetFromUser, maxNumToSetTo))
    ? alertUser(maxNumToSetTo)
    : callback();

const alertUser = (maxLength) => {
  alert(`WRONG VALUE - MUST BE NUMERIC OF MAX: ${maxLength} AND MIN OF 0.`);
};

const handleAddingRows = (table, numOfRows, numOfRowsToSetFromUser) => {
  return {
    numOfRows: numOfRowsToSetFromUser,
    table: numOfRowsToSetFromUser > 0 ? concatNewRows(table, numOfRowsToSetFromUser, numOfRows) : table
  }
};

const concatNewRows = (table, numOfRowsToSetFromUser, numOfRows) => {
  const firstRow = table[0];
  const firstRowColumnsValuesNullified = firstRow.map(() => '');
  const numOfRowsToAdd = numOfRowsToSetFromUser - numOfRows;

  return table.concat(Array(numOfRowsToAdd).fill(firstRowColumnsValuesNullified))
};

const handleAddingColumns = (table, numOfColumns, numOfColumnsToSetFromUser) => {
  return {
    numOfColumns: numOfColumnsToSetFromUser,
    table: numOfColumnsToSetFromUser > 0
      ? (
        table.map(row => {
          const columnsToAdd = Array(numOfColumnsToSetFromUser - numOfColumns).fill('');

          return row.concat(columnsToAdd);
        })
      )
      : table
  }
};

const handleSubtractingRows = (table, numOfRows, numOfRowsToSetFromUser) => {
  const subNumOfRowsBy = numOfRows - numOfRowsToSetFromUser;

  return {
    numOfRows: numOfRowsToSetFromUser,
    table: ((subNumOfRowsBy > 0) && numOfRowsToSetFromUser > 0
        ? table.slice(0, - subNumOfRowsBy)
        : table
    )
  }
};

const handleSubtractingColumns = (table, numOfColumns, numOfColumnsToSetFromUser) => {
  const subNumOfColumnsBy = numOfColumns - numOfColumnsToSetFromUser;

  return {
    numOfColumns: numOfColumnsToSetFromUser,
    table: numOfColumnsToSetFromUser > 0
      ? (
        table.map(row =>
          (subNumOfColumnsBy !== 0)
            ? row.slice(0, - subNumOfColumnsBy)
            : row
        )
      )
      : table
  }
};

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const splice = (table, ...xs) => {
  const copy = clone(table);

  copy.splice(...xs);

  return copy;
};

const handleAction = (action, len, maxLen, callback) => {
  return (action === actions.REMOVE_ACTION)
    ? callback()
    : guard(len, maxLen, callback);
};

export {
  clone,
  getNumOfFirstRowColumns,
  getTableWithoutLastColumn,
  guard,
  handleAddingColumns,
  handleAddingRows,
  handleSubtractingColumns,
  handleSubtractingRows,
  splice,
  withoutLastElement,
  handleAction
}