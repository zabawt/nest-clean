import { NextApiRequest, NextPage } from 'next';
import jwt from 'jsonwebtoken';

interface Props {
  contracts?: any[];
}

const Page: NextPage<Props> = ({ contracts }) => {
  return <main>{JSON.stringify(contracts)}</main>;
};

Page.getInitialProps = async ({ req }) => {
  const { jwt: token } = (req as NextApiRequest).cookies;
  console.error(token)
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    const data = await fetch(
      `${process.env.contractsUri}/users/${decoded.sub}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({"Authorization": `Bearer ${token}`})
      },
    );
    const result = await data.json();
    return { contracts: result };
  } catch (err) {
    location.replace('/');
  }
};

export default Page;
