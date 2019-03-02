import React  from 'react';
import styled from 'styled-components';

const Table = styled.table`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Row = styled.tr`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Column = styled.td`
  padding: 4em;
  background: papayawhip;
`;

export default () => (
  <Table>
    <tbody>
      <Row>
        <Column>
          Hello World!
        </Column>
      </Row>
    </tbody>
  </Table>
);
