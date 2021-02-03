import { NextApiRequest, NextPage } from 'next';
import jwt from 'jsonwebtoken';
import React from 'react';
import Navigation from '../components/navigation';
import {
  Box,
  Container,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

interface Props {
  contracts?: Contract[];
  authorizationError: boolean;
}

interface ValidityPeriod {
  from: string;
  until: string;
}

interface Signartory {
  id: string;
}

interface Contract {
  id: string;
  created: string;
  updated: string;
  validityPeriod: ValidityPeriod;
  signatory: Signartory;
}

const Page: NextPage<Props> = ({
  contracts = [],
  authorizationError = false,
}) => {
  React.useEffect(() => {
    if (authorizationError) {
      location.replace('/');
    }
  }, []);

  const formatDateTime = (date: string) => new Date(date).toLocaleString();
  const formatDate = (date: string) => new Date(date).toLocaleDateString();
  return (
    <main>
      <Navigation />
      <Box mb={8}>
        <Container maxWidth={'lg'}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Contract Id</TableCell>
                  <TableCell align="right">Created</TableCell>
                  <TableCell align="right">Updated</TableCell>
                  <TableCell align="right">Valid from:</TableCell>
                  <TableCell align="right">Valid to:</TableCell>
                  <TableCell align="left">Signatory id:</TableCell>
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
                    <TableCell align="left">{contract.signatory.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </main>
  );
};

Page.getInitialProps = async ({ req }): Promise<Props> => {
  try {
    const { jwt: token } = (req as NextApiRequest).cookies;
    const decoded: any = jwt.verify(token, process.env.jwtSecret);

    const data = await fetch(
      `${process.env.contractsUri}/users/${decoded.sub}`,
      {
        method: 'GET',
        headers: new Headers({ Cookie: `jwt=${token}` }),
      },
    );
    const contracts = await data.json();
    const authorizationError = false;
    return { contracts, authorizationError };
  } catch (err) {
    console.error('msg', err);
    return { authorizationError: true };
  }
};

export default Page;
