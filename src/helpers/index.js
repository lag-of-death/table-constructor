const withoutLastElement = (array) => {
  return array.slice(0, -1);
};

const getTableWithoutLastColumn = (rows) => {
  return rows.map(withoutLastElement);
};

const getNumOfLastRowColumns = (table) => {
  return getLastRow(table).length;
};

const isWrongValue = (value, maxLength) => {
  return isNaN(value) || (value > maxLength);
};

const guard = (numToSetFromUser, maxNumToSetTo, callback) => {
  if (isWrongValue(numToSetFromUser, maxNumToSetTo)) {
    alertUser(maxNumToSetTo);
  } else {
    callback();
  }
};

const alertUser = (maxLength) => {
  alert(`WRONG VALUE - MUST BE NUMERIC OF MAX: ${maxLength} AND MIN OF 0.`);
};

const getLastRow = (table) => {
  const { length : numOfRows } = table;

  return table[numOfRows - 1];
};

const handleAddingRows = (table, numOfRows, numOfRowsToSetFromUser) => {
  return {
    numOfRows: numOfRowsToSetFromUser,
    table: numOfRowsToSetFromUser > 0 ? concatNewRows(table, numOfRowsToSetFromUser, numOfRows) : table
  }
};

const concatNewRows = (table, numOfRowsToSetFromUser, numOfRows) => {
  const lastRow = getLastRow(table);
  const lastRowColumnsValuesNullified = lastRow.map(() => '');
  const numOfRowsToAdd = numOfRowsToSetFromUser - numOfRows;

  return table.concat(Array(numOfRowsToAdd).fill(lastRowColumnsValuesNullified))
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

export {
  withoutLastElement,
  getTableWithoutLastColumn,
  getNumOfLastRowColumns,
  guard,
  handleAddingRows,
  handleAddingColumns,
  handleSubtractingRows,
  handleSubtractingColumns
}