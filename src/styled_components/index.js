import styled, { css } from 'styled-components';
import { minRes, midRes } from './variables';

const sharedStyle = css`
  background: lightblue;
  border: 2px solid black;
  box-shadow: 1px 1px 1px white inset, 1px 1px 1px black;
`;

const Button = styled.button`
  ${sharedStyle}
  
  height: 46%;
`;

const DownloadCSV = styled.a`
  ${sharedStyle}
  
  align-items: center;
  color: black;
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
  border: 2px solid black;
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

const RowContainer = styled.div`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  text-align: center;
  flex-grow: 1;
`;

const RowHeader = styled.div`
  background: lightblue;
  display: flex;
  text-align: center;
  flex-grow: 1;
`;

const RowActionsContainer = styled.div`
  display: flex; 
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background: lightblue;
  border-right: 1px solid black;
  width: 20px;
  padding: 2px;
`;

const ColumnActionsContainer = styled.div`
  display: flex; 
  margin-bottom: 4px; 
  background: white; 
  justify-content: space-between;
  padding: 2px;
`;

const Column = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: ${ (props) => props.isHeader ? 'column' : 'row' }
  padding: 4px;
  width: 100%;
  
  textarea {
    background: transparent;
    border: none;
    border-bottom: 1px dotted black;
    border-right: 1px dotted black;
    box-shadow: 2px 2px 1px gray inset;
    box-sizing: border-box; 
    font-size: 20px;   
    margin: 0; 
    padding: 4px; 
    width: 100%; 
  }
`;

const AdjStyle = styled.div`
  border: 1px solid black; 
  box-shadow: 2px 2px 2px black, 2px 2px 2px black inset;
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
  border-bottom: 1px dotted black;
  border-right: 1px dotted black;
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
  RowActionsContainer
}