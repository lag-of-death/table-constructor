import React  from 'react';
import PropTypes from 'prop-types';

import {
  Column,
  RowHeader,
  Row,
  ColumnActionsContainer,
  RowContainer,
  Action,
  RowActionsContainer
} from '../styled_components';

import {actions} from "../helpers/constants";

const { BACK_ACTION, FRONT_ACTION, REMOVE_ACTION } = actions;

const getRowContent = (rowIdx, row, rows, handleColumnValueChange, getComponent = () => null) =>
  {
    const isHeader = rowIdx === 0;

    return row.map((column, columnIdx) =>
      (
        <Column
          isHeader
          key={rowIdx + ':' + columnIdx}>
          { getComponent(columnIdx) }
          <textarea
            rows={isHeader ? 1 : 2}
            value={rows[rowIdx][columnIdx]}
            onChange={(evt) => handleColumnValueChange(rowIdx, columnIdx, evt)}
          />
        </Column>
      )
    );
  };

const getColumnActions = (handleColumnAction, columnIdx) => {
  return (
    <ColumnActionsContainer>
      { getActions(handleColumnAction, columnIdx) }
    </ColumnActionsContainer>
  )
};

const getActions = (actionHandler, idx) => {
  return [[BACK_ACTION, '+'], [REMOVE_ACTION, '-'], [FRONT_ACTION, '+']].map((action) =>
    <Action
      key={`${action}:${idx}`}
      onClick={() => actionHandler(idx, action[0])}>
      {action[1]}
    </Action>
  );
};

const TableContent = ({rows, handleColumnValueChange, handleColumnAction, handleRowAction}) =>
  (
    rows.map((row, rowIdx) =>
      <RowContainer key={rowIdx}
      >
        <RowActionsContainer>
          { getActions(handleRowAction, rowIdx) }
        </RowActionsContainer>
        {
          (rowIdx === 0)
            ? (
              <RowHeader
                key={rowIdx}>
                { getRowContent(rowIdx, row, rows, handleColumnValueChange, getColumnActions.bind(null, handleColumnAction) ) }
              </RowHeader>
            )
            : (
              <Row
                key={rowIdx}>
                { getRowContent(rowIdx, row, rows, handleColumnValueChange) }
              </Row>
            )
        }
      </RowContainer>
    )
  );

TableContent.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  handleColumnValueChange: PropTypes.func.isRequired,
  handleColumnAction: PropTypes.func.isRequired,
  handleRowAction: PropTypes.func.isRequired
};

export default TableContent;
