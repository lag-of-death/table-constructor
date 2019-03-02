import React  from 'react';

import {
  Column,
  RowHeader,
  Row,
} from '../styled_components';

const getRowContent = (rowIdx, row, rows, handleColumnValueChange ) =>
  row.map((column, columnIdx) =>
    (
      <Column
        key={rowIdx + ':' + columnIdx}>
        <textarea
          rows='1'
          value={rows[rowIdx][columnIdx]}
          onChange={(evt) => handleColumnValueChange(rowIdx, columnIdx, evt)}
        />
      </Column>
    )
  );

const TableContent = ({rows, handleColumnValueChange}) =>
  (
    rows.map((row, rowIdx) =>
      (rowIdx === 0)
        ? (
          <RowHeader
            key={rowIdx}>
            { getRowContent(rowIdx, row, rows, handleColumnValueChange) }
          </RowHeader>
        )
        : (
          <Row
            key={rowIdx}>
            { getRowContent(rowIdx, row, rows, handleColumnValueChange) }
          </Row>
        )
    )
  );

export default TableContent;
