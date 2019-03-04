import React  from 'react';

import {
  Label,
  Counter,
  IncDecButtons,
  InputStyle,
  AdjStyle,
  Button
} from '../styled_components';

const Adjuster = ({ label, numOfColumns, handleNumOfColumnsChange, incColumnNum, decColumnNum, refreshAdjusters }) => {
  return (
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
  )
};

export default Adjuster;
