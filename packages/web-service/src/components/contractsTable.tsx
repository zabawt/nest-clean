import {
  TableContainer,
  TableHead,
  TableCell,
  Paper,
  Table,
  TableBody,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { Contract } from '../interfaces/contracts';

interface ContractsTableProps {
  contracts: Contract[];
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
}) => {
  const formatDateTime = (date: string) => new Date(date).toLocaleString();
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contract Id</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Updated</TableCell>
            <TableCell align="right">Valid from</TableCell>
            <TableCell align="right">Valid to</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts?.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell component="th" scope="row">
                {contract.id}
              </TableCell>
              <TableCell align="right">
                {formatDateTime(contract.created)}
              </TableCell>
              <TableCell align="right">
                {formatDateTime(contract.updated)}
              </TableCell>
              <TableCell align="right">
                {formatDate(contract.validityPeriod.from)}
              </TableCell>
              <TableCell align="right">
                {formatDate(contract.validityPeriod.until)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
