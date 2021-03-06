import { actions } from './constants';

const withoutLastElement = array => array.slice(0, -1);

const getTableWithoutLastColumn = rows => rows.map(withoutLastElement);

const getNumOfFirstRowColumns = table => table[0].length;

const isWrongValue = (value, maxLength) => isNaN(value) || (value > maxLength);

const alertUser = (maxLength) => {
  alert(`WRONG VALUE - MUST BE NUMERIC OF MAX: ${maxLength} AND MIN OF 0.`);
};

const guard = (
  numToSetFromUser,
  maxNumToSetTo,
  callback,
) => (
  isWrongValue(numToSetFromUser, maxNumToSetTo)
    ? alertUser(maxNumToSetTo)
    : callback()
);

const concatNewRows = (table, numOfRowsToSetFromUser, numOfRows) => {
  const firstRow = table[0];
  const firstRowColumnsValuesNullified = firstRow.map(() => '');
  const numOfRowsToAdd = numOfRowsToSetFromUser - numOfRows;

  return table.concat(Array(numOfRowsToAdd).fill(firstRowColumnsValuesNullified));
};

const handleAddingRows = (table, numOfRows, numOfRowsToSetFromUser) => ({
  numOfRows: numOfRowsToSetFromUser,
  table: numOfRowsToSetFromUser > 0
    ? concatNewRows(table, numOfRowsToSetFromUser, numOfRows)
    : table,
});

const handleAddingColumns = (table, numOfColumns, numOfColumnsToSetFromUser) => ({
  numOfColumns: numOfColumnsToSetFromUser,
  table: numOfColumnsToSetFromUser > 0
    ? (
      table.map((row) => {
        const columnsToAdd = Array(numOfColumnsToSetFromUser - numOfColumns).fill('');

        return row.concat(columnsToAdd);
      })
    )
    : table,
});

const handleSubtractingRows = (table, numOfRows, numOfRowsToSetFromUser) => {
  const subNumOfRowsBy = numOfRows - numOfRowsToSetFromUser;

  return {
    numOfRows: numOfRowsToSetFromUser,
    table: ((subNumOfRowsBy > 0) && numOfRowsToSetFromUser > 0
      ? table.slice(0, -subNumOfRowsBy)
      : table
    ),
  };
};

const handleSubtractingColumns = (table, numOfColumns, numOfColumnsToSetFromUser) => {
  const subNumOfColumnsBy = numOfColumns - numOfColumnsToSetFromUser;

  return {
    numOfColumns: numOfColumnsToSetFromUser,
    table: numOfColumnsToSetFromUser > 0
      ? (
        table.map(row => ((subNumOfColumnsBy !== 0)
          ? row.slice(0, -subNumOfColumnsBy)
          : row))
      )
      : table,
  };
};

const clone = obj => JSON.parse(JSON.stringify(obj));

const splice = (table, ...xs) => {
  const copy = clone(table);

  copy.splice(...xs);

  return copy;
};

const handleAction = (action, len, maxLen, callback) => ((action === actions.REMOVE_ACTION)
  ? window.confirm('Are you sure to remove this?') ? callback() : () => null
  : guard(len, maxLen, callback));

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
  handleAction,
};
