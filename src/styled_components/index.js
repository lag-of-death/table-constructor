import styled, { css } from 'styled-components';
import {
  minRes, midRes, minColumnWidth, blueBackground, grayBackground, blackColor, whiteColor,
} from './variables';

const sharedStyle = css`
  background: ${blueBackground};
  border: 2px solid ${blackColor};
  box-shadow: 1px 1px 1px ${whiteColor} inset, 1px 1px 1px ${blackColor};
`;

const Button = styled.button`
  ${sharedStyle}
  
  height: 46%;
`;

const DownloadCSV = styled.a`
  ${sharedStyle}
  
  align-items: center;
  color: ${blackColor};
  display: flex;
  font-weight: bold; 
  margin-top: 8px;
  padding: 6px;
  text-align: center;
  text-decoration: none;
  
  @media(min-width: ${midRes}) {
      margin-top: 0px;
  }
`;

const Table = styled.div`
  border: 2px solid ${blackColor};
  margin-top: 40px;
  text-align: center;
`;

const ActionsPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media(min-width: ${midRes}) {
    flex-direction: row;
  }
`;

const Adjusters = styled.div`
  display: flex;
`;

const Action = styled.button`
  align-items: center;
  background: ${grayBackground};
  border: 2px solid ${blackColor};
  display: flex;
  justify-content: center;
  line-height: 10px;
  width: 20px;
  padding: 2px;
  
  &:hover {
    cursor: pointer;
  }
`;

const RowContainer = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  text-align: center;
  flex-grow: 1;
`;

const RowHeader = styled.div`
  background: ${blueBackground};
  display: flex;
  text-align: center;
  flex-grow: 1;
`;

const RowActionsContainer = styled.div`
  display: flex; 
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background: ${blueBackground};
  border-right: 1px solid ${blackColor};
  width: 20px;
  padding: 2px;
`;

const ColumnActionsContainer = styled.div`
  display: flex; 
  margin-bottom: 4px; 
  background: ${whiteColor}; 
  justify-content: space-between;
  padding: 2px;
`;

const Column = styled.div`
  border: 1px solid ${blackColor};
  display: flex;
  flex-direction: ${props => (props.isHeader ? 'column' : 'row')}
  padding: 4px;
  width: 100%;
  min-width: ${minColumnWidth};
  
  textarea {
    background: transparent;
    border: none;
    border-bottom: 1px dotted ${blackColor};
    border-right: 1px dotted ${blackColor};
    box-shadow: 2px 2px 1px gray inset;
    box-sizing: border-box; 
    font-size: 20px;   
    margin: 0; 
    padding: 4px; 
    width: 100%; 
  }
`;

const AdjStyle = styled.div`
  border: 1px solid ${blackColor}; 
  box-shadow: 2px 2px 2px ${blackColor}, 2px 2px 2px ${blackColor} inset;
  display: flex;
  justify-content: space-between;
  margin-right: 0;
  padding: 6px 4px 4px 2px; 
  width: 50%;
  
  @media(min-width: ${midRes}) {
    margin-right: 10px;
    width: fit-content;
  }
`;

const InputStyle = styled.input`
  border: none; 
  border-bottom: 1px dotted ${blackColor};
  border-right: 1px dotted ${blackColor};
  box-shadow: 2px 2px 1px gray inset;
  box-sizing: border-box; 
  font-size: 20px;
  margin: 6px; 
  text-align: center; 
  width: 20px;
  
  @media(min-width: ${minRes}) {
    font-size: 30px;
    width: 40px;
  }
  
  @media(min-width: ${midRes}) {
    width: 70px; 
  }
`;

const IncDecButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  
  @media(min-width: ${minRes}) {
    width: 40px;
  }
  
  @media(min-width: ${midRes}) {
    width: initial;
  }
`;

const Counter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  justify-content: center;
  
  @media(min-width: ${midRes}) {
    flex-direction: column;
  }
`;

const Label = styled.div`
  margin-left: 0;
  padding: 2px;
  padding-left: 0;
  padding-right: 6px;
  text-align: center;
  width: 100%;
  word-break: break-all;
        
  @media(min-width: ${minRes}) {
    margin-left: 2px;
    font-size: 20px;
  }
  
 @media(min-width: ${midRes}) {
    font-size: 14px;
  }
`;

export {
  Label,
  Counter,
  IncDecButtons,
  InputStyle,
  AdjStyle,
  Column,
  RowHeader,
  Row,
  Adjusters,
  ActionsPanel,
  Table,
  DownloadCSV,
  Button,
  RowContainer,
  ColumnActionsContainer,
  RowActionsContainer,
  Action,
};
