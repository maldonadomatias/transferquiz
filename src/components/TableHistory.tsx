import styled from "styled-components";
import { Transfer } from "../interfaces/transfers";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  white-space: nowrap; /* Prevent text wrapping */
`;

const TableDataCell = styled.td`
  padding: 10px;
  text-align: left;
`;

const TableBody = styled.tbody`
  max-height: 100px;
  overflow-y: auto;
`;

interface Props {
  currentPlayer: Transfer;
}

const TableHistory = ({ currentPlayer }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Old Club</TableHeaderCell>
          <TableHeaderCell>New Club</TableHeaderCell>
          <TableHeaderCell>Season</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {currentPlayer.history.map((transfer, index) => (
          <TableRow key={index}>
            <TableDataCell>{transfer.oldClubName}</TableDataCell>
            <TableDataCell>{transfer.newClubName}</TableDataCell>
            <TableDataCell>{transfer.transferSeason}</TableDataCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableHistory;
