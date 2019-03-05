import React from 'react';
import PropTypes from 'prop-types';

import {
  Label,
  Counter,
  IncDecButtons,
  InputStyle,
  AdjStyle,
  Button,
} from '../styled_components';

const Adjuster = ({
  label, numOfColumns, handleNumOfColumnsChange, incColumnNum, decColumnNum, refreshAdjusters,
}) => (
  <AdjStyle>
    <Counter>
      <InputStyle
        value={numOfColumns > 0 ? numOfColumns : ''}
        onBlur={refreshAdjusters}
        onChange={handleNumOfColumnsChange}
      />
      <Label>
        {label}
      </Label>
    </Counter>
    <IncDecButtons>
      <Button onClick={incColumnNum}>+</Button>
      <Button onClick={decColumnNum}>-</Button>
    </IncDecButtons>
  </AdjStyle>
);

Adjuster.propTypes = {
  label: PropTypes.string.isRequired,
  numOfColumns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleNumOfColumnsChange: PropTypes.func.isRequired,
  incColumnNum: PropTypes.func.isRequired,
  decColumnNum: PropTypes.func.isRequired,
  refreshAdjusters: PropTypes.func.isRequired,
};

export default Adjuster;
