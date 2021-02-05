import { SignInCard } from '../components/signInCard';
import React from 'react';
import { NextApiRequest, NextPage } from 'next';
import { AuthService } from '../services/authService';
import { Box, Container, Paper } from '@material-ui/core';
import Navigation from '../components/navigation';

interface Props {
  signedIn: boolean;
}

const Logged: React.FC<any> = () => (
  <Paper>
    <Box mx="auto" padding={2}>
      You are already logged in, please log-out in order to sign to other
      account.
    </Box>
  </Paper>
);

const Index: NextPage<Props> = ({ signedIn = false }) => {
  return (
    <main>
      <Navigation />
      <Container maxWidth={'lg'}>
        {signedIn ? <Logged /> : <SignInCard />}
      </Container>
    </main>
  );
};

Index.getInitialProps = async ({ req }): Promise<Props> => {
  const authService = new AuthService();
  const token = await authService.getToken(req as NextApiRequest);

  try {
    await authService.verifyToken(token);
    return { signedIn: true };
  } catch (err) {}
  return { signedIn: false };
};

export default Index;
