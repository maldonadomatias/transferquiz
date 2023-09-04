import styled from "styled-components";
import { Transfer } from "../interfaces/transfers";

const Container = styled.div`
  width: 100%;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.2);
`;

const Row = styled.div<{ even?: boolean }>`
  display: flex;
  background-color: ${(props) =>
    props.even ? "#f2f2f2" : "var(--white-color)"};
  padding: 10px;
  font-size: 1.5rem;
  border-bottom: 1px solid #ccc;
`;

const HeaderCell = styled.div`
  flex: 1;
  padding: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

const DataCell = styled.div`
  flex: 1;
  padding: 10px;
  white-space: nowrap;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Body = styled.div`
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #ccc;
`;

interface Props {
  currentPlayer: Transfer;
}

const TableHistory = ({ currentPlayer }: Props) => {
  return (
    <Container>
      <Row>
        <HeaderCell>Old Club</HeaderCell>
        <HeaderCell>New Club</HeaderCell>
        <HeaderCell>Season</HeaderCell>
      </Row>
      <Body>
        {currentPlayer.history.map((transfer, index) => (
          <Row key={index} even={index % 2 === 0}>
            <DataCell>{transfer.oldClubName}</DataCell>
            <DataCell>{transfer.newClubName}</DataCell>
            <DataCell>{transfer.transferSeason}</DataCell>
          </Row>
        ))}
      </Body>
    </Container>
  );
};

export default TableHistory;
