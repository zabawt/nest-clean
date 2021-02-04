import { NextApiRequest, NextPage } from 'next';
import Navigation from '../components/navigation';
import { Box, Container } from '@material-ui/core';
import { ContractsTable } from '../components/contractsTable';
import { Contract } from '../interfaces/contracts';
import { contractsService } from '../services/contractsService';
import { AuthService } from '../services/authService';

interface Props {
  contracts?: Contract[];
}

const Page: NextPage<Props> = ({ contracts = [] }) => {
  return (
    <main>
      <Navigation />
      <Box mb={8}>
        <Container maxWidth={'lg'}>
          <ContractsTable contracts={contracts} />
        </Container>
      </Box>
    </main>
  );
};

Page.getInitialProps = async ({ req, res }): Promise<Props> => {
  try {
    const authService = new AuthService();
    const token = await authService.getToken(req as NextApiRequest);
    const { sub: userId } = await authService.verifyToken(token);

    const contracts = await new contractsService(token).getUserContracts(
      userId,
    );

    return { contracts };
  } catch (err) {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }
};

export default Page;
