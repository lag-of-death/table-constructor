import React  from 'react';
import {
  Adjusters,
  ActionsPanel,
  Table,
  DownloadCSV,
} from './styled_components';

import {
  Adjuster,
  TableContent
} from './components';

import {
  withoutLastElement,
  getTableWithoutLastColumn,
  getNumOfLastRowColumns,
  guard,
  handleAddingRows,
  handleAddingColumns,
  handleSubtractingRows,
  handleSubtractingColumns
} from './helpers';

const MAX_ROWS_LENGTH = 5;
const MAX_COLS_LENGTH = 5;

class TableConstructor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      table: [
        ['Name', 'Surname'],
        ['John', 'Doe']
      ],
      csvLink : '',
      numOfRows: 2,
      numOfColumns: 2,
    }
  }

  incColumnNum = () => {
    this.setState(({ table }) => {
      const numOfLastRowColumns = getNumOfLastRowColumns(table);

      return {
        table: numOfLastRowColumns < MAX_COLS_LENGTH ? table.map(row => row.concat([''])) : table,
        numOfColumns: numOfLastRowColumns < MAX_COLS_LENGTH ? numOfLastRowColumns + 1 : numOfLastRowColumns
      }
    })
  };

  decColumnNum = () => {
    this.setState(({ table }) => {
      const lastRowColumnLength = getNumOfLastRowColumns(table);

      return {
        table: lastRowColumnLength > 1 ? getTableWithoutLastColumn(table) : table,
        numOfColumns: lastRowColumnLength - 1,
      };
    })
  };

  downloadCSV = () => {
    const csvContent = `data:text/csv;charset=utf-8,${this.state.table.map(row => row.join(',')).join('\n')}`;

    this.setState({
      csvLink: encodeURI(csvContent)
    })
  };

  incRowNum = () => {
    this.setState(({ table }) => {
      const { length: numOfRows } = table;
      const columnsForNewRows = Array(getNumOfLastRowColumns(table)).fill('');

      return (
        (numOfRows >= MAX_ROWS_LENGTH)
          ? { numOfRows }
          : { table: table.concat([columnsForNewRows]), numOfRows: numOfRows + 1 }
      )
    })
  };

  decRowNum = () => {
    this.setState(({ table }) => {
      const { length : numOfRows } = table;

      return {
        table: numOfRows > 1 ? withoutLastElement(table) : table,
        numOfRows: numOfRows - 1,
      };
    })
  };

  handleColumnValueChange = (rowIdx, columnIdx, { target : { value : columnNewValue }}) => {
    this.setState(({ table }) => {
      const immutableTableData = JSON.stringify(table);
      const tableDataCopy = JSON.parse(immutableTableData);

      tableDataCopy[rowIdx][columnIdx] = columnNewValue;

      return {
        table: tableDataCopy
      };
    });
  };
  
  handleNumOfColumnsChange = ({ target : { value : numOfColumnsToSetFromUser }}) => {
    guard(numOfColumnsToSetFromUser, MAX_COLS_LENGTH, () => {
      this.setState(({ table }) => {
        const numOfLastRowColumns = getNumOfLastRowColumns(table);

        const handler = (
          (numOfColumnsToSetFromUser > numOfLastRowColumns)
            ? handleAddingColumns
            : handleSubtractingColumns
        );

        return handler(table, numOfLastRowColumns, numOfColumnsToSetFromUser);
      });
    });
  };
  
  handleNumOfRowsChange = ({ target : { value : numOfRowsToSetFromUser }}) => {
    guard(numOfRowsToSetFromUser, MAX_ROWS_LENGTH, () => {
      this.setState(({ table }) => {
        const { length : numOfRows } = table;
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

    const numOfRows = state.numOfRows;
    const numOfColumns = state.numOfColumns;

    return (
      <React.Fragment>
        <ActionsPanel>
          <Adjusters>
            <Adjuster
              numOfColumns={numOfColumns}
              handleNumOfColumnsChange={this.handleNumOfColumnsChange}
              incColumnNum={this.incColumnNum}
              decColumnNum={this.decColumnNum}
              label={numOfColumns > 1 ? 'COLUMNS' : 'COLUMN'}
            />

            <Adjuster
              numOfColumns={numOfRows}
              handleNumOfColumnsChange={this.handleNumOfRowsChange}
              incColumnNum={this.incRowNum}
              decColumnNum={this.decRowNum}
              label={numOfRows > 1 ? 'ROWS' : 'ROW'}
            />
          </Adjusters>

          <div>
            <DownloadCSV
              onClick={this.downloadCSV}
              download='data.csv'
              href={state.csvLink}>
              DOWNLOAD CSV
            </DownloadCSV>
          </div>

        </ActionsPanel>

        <Table>
          <TableContent 
            rows={state.table}
            handleColumnValueChange={this.handleColumnValueChange}
          />
        </Table>

        <div style={{position: 'absolute', 'bottom': 100}}>
          {JSON.stringify(state.table)}
        </div>

      </React.Fragment>
    )
  }
}

export default TableConstructor;
