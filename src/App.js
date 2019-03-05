import React from 'react';
import {
  Adjusters,
  ActionsPanel,
  Table,
  DownloadCSV,
} from './styled_components';

import {
  Adjuster,
  TableContent,
} from './components';

import {
  withoutLastElement,
  getTableWithoutLastColumn,
  getNumOfFirstRowColumns,
  guard,
  handleAddingRows,
  handleAddingColumns,
  handleSubtractingRows,
  handleSubtractingColumns,
  clone,
  splice,
  handleAction,
} from './helpers';

import { actions, limits } from './helpers/constants';

const { MAX_COLS_LENGTH, MAX_ROWS_LENGTH } = limits;
const { BACK_ACTION, FRONT_ACTION, REMOVE_ACTION } = actions;

class TableConstructor extends React.Component {
  columnActions = {
    [BACK_ACTION]: (columnsOnTheLeft, currentColumnVal) => columnsOnTheLeft.concat('', currentColumnVal),
    [FRONT_ACTION]: (columnsOnTheLeft, currentColumnVal) => columnsOnTheLeft.concat(currentColumnVal, ''),
    [REMOVE_ACTION]: (columnsOnTheLeft, currentColumnVal, row) => (
      (row.length > 1) ? columnsOnTheLeft : columnsOnTheLeft.concat(currentColumnVal)
    ),
  };

  rowActions = {
    [BACK_ACTION]: (table, rowIdx, tableClone) => ((rowIdx === 0)
      ? [table[rowIdx].map(() => ''), ...tableClone]
      : splice(table, rowIdx, 0, table[rowIdx].map(() => ''))),
    [FRONT_ACTION]: (table, rowIdx) => splice(table, rowIdx + 1, 0, table[rowIdx].map(() => '')),
    [REMOVE_ACTION]: (table, rowIdx, tableClone) => ((table.length > 1)
      ? splice(table, rowIdx, 1)
      : tableClone),
  };

  constructor(props) {
    super(props);

    this.state = {
      table: [
        ['Name', 'Surname'],
        ['John', 'Doe'],
      ],
      csvLink: '',
      numOfRows: 2,
      numOfColumns: 2,
    };
  }

  incColumnNum = () => {
    this.setState(({ table }) => {
      const numOfFirstRowColumns = getNumOfFirstRowColumns(table);

      return {
        table: numOfFirstRowColumns < MAX_COLS_LENGTH ? table.map(row => row.concat([''])) : table,
        numOfColumns: numOfFirstRowColumns < MAX_COLS_LENGTH
          ? numOfFirstRowColumns + 1
          : numOfFirstRowColumns,
      };
    });
  };

  decColumnNum = () => {
    this.setState(({ table }) => {
      const firstRowColumnLength = getNumOfFirstRowColumns(table);

      if (firstRowColumnLength > 1) {
        return {
          table: getTableWithoutLastColumn(table),
          numOfColumns: firstRowColumnLength - 1,
        };
      }
      return {};
    });
  };

  downloadCSV = () => {
    this.setState(({ table }) => {
      const csvContent = `data:text/csv;charset=utf-8,${table.map(row => row.join(',')).join('\n')}`;

      return {
        csvLink: encodeURI(csvContent),
      };
    });
  };

  incRowNum = () => {
    this.setState(({ table }) => {
      const { length: numOfRows } = table;
      const columnsForNewRows = Array(getNumOfFirstRowColumns(table)).fill('');

      return (
        (numOfRows >= MAX_ROWS_LENGTH)
          ? { numOfRows }
          : { table: table.concat([columnsForNewRows]), numOfRows: numOfRows + 1 }
      );
    });
  };

  decRowNum = () => {
    this.setState(({ table }) => {
      const { length: numOfRows } = table;

      if (numOfRows > 1) {
        return {
          table: withoutLastElement(table),
          numOfRows: numOfRows - 1,
        };
      }
      return {

      };
    });
  };

  handleColumnValueChange = (rowIdx, columnIdx, { target: { value: columnNewValue } }) => {
    this.setState(({ table }) => {
      const tableCopy = clone(table);

      tableCopy[rowIdx][columnIdx] = columnNewValue;

      return {
        table: tableCopy,
      };
    });
  };

  getAdjustedStateForRowAction = (table, action, rowIdx) => {
    const tableClone = clone(table);
    const rows = this.rowActions[action](table, rowIdx, tableClone);

    return {
      numOfRows: rows.length,
      table: rows,
    };
  };

  handleRowAction = (rowIdx, action) => {
    this.setState(({ table }) => handleAction(
      action,
      table.length + 1,
      MAX_ROWS_LENGTH,
      this.getAdjustedStateForRowAction.bind(this, table, action, rowIdx),
    ));
  };

  getAdjustedStateForColumnAction = (table, columnIdx, action) => {
    const rows = table.map(row => row.reduce(
      (columnsOnTheLeft, currentColumnVal, i) => ((i === columnIdx)
        ? this.columnActions[action](columnsOnTheLeft, currentColumnVal, row)
        : columnsOnTheLeft.concat(currentColumnVal)),
      [],
    ));

    return {
      numOfColumns: rows[0].length,
      table: rows,
    };
  };

  handleColumnAction = (columnIdx, action) => {
    this.setState(({ table }) => handleAction(
      action,
      table[0].length + 1,
      MAX_COLS_LENGTH,
      this.getAdjustedStateForColumnAction.bind(this, table, columnIdx, action),
    ));
  };

  refreshAdjusters = () => {
    this.setState(({ table }) => ({
      numOfRows: table.length,
      numOfColumns: table[0].length,
    }));
  };

  handleNumOfColumnsChange = ({ target: { value: numOfColumnsToSetFromUser } }) => {
    guard(numOfColumnsToSetFromUser, MAX_COLS_LENGTH, () => {
      this.setState(({ table }) => {
        const numOfFirstRowColumns = getNumOfFirstRowColumns(table);

        const handler = (
          (numOfColumnsToSetFromUser > numOfFirstRowColumns)
            ? handleAddingColumns
            : handleSubtractingColumns
        );

        return handler(table, numOfFirstRowColumns, numOfColumnsToSetFromUser);
      });
    });
  };

  handleNumOfRowsChange = ({ target: { value: numOfRowsToSetFromUser } }) => {
    guard(numOfRowsToSetFromUser, MAX_ROWS_LENGTH, () => {
      this.setState(({ table }) => {
        const { length: numOfRows } = table;
        const handler = (
          (numOfRowsToSetFromUser > numOfRows)
            ? handleAddingRows
            : handleSubtractingRows
        );

        return handler(table, numOfRows, numOfRowsToSetFromUser);
      });
    });
  };

  render() {
    const { state } = this;

    const { numOfRows } = state;
    const { numOfColumns } = state;

    return (
      <React.Fragment>
        <ActionsPanel>
          <Adjusters>
            <Adjuster
              numOfColumns={numOfColumns}
              handleNumOfColumnsChange={this.handleNumOfColumnsChange}
              incColumnNum={this.incColumnNum}
              decColumnNum={this.decColumnNum}
              refreshAdjusters={this.refreshAdjusters}
              label={numOfColumns > 1 ? 'COLUMNS' : 'COLUMN'}
            />

            <Adjuster
              numOfColumns={numOfRows}
              handleNumOfColumnsChange={this.handleNumOfRowsChange}
              incColumnNum={this.incRowNum}
              decColumnNum={this.decRowNum}
              refreshAdjusters={this.refreshAdjusters}
              label={numOfRows > 1 ? 'ROWS' : 'ROW'}
            />
          </Adjusters>

          <div>
            <DownloadCSV
              onClick={this.downloadCSV}
              download="data.csv"
              href={state.csvLink}
            >
              DOWNLOAD CSV
            </DownloadCSV>
          </div>

        </ActionsPanel>

        <Table>
          <TableContent
            handleColumnAction={this.handleColumnAction}
            handleRowAction={this.handleRowAction}
            rows={state.table}
            handleColumnValueChange={this.handleColumnValueChange}
          />
        </Table>
      </React.Fragment>
    );
  }
}

export default TableConstructor;
