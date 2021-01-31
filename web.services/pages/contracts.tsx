import { NextApiRequest, NextPage } from 'next';

interface Props {
  contracts?: any[];
}

const Page: NextPage<Props> = ({ contracts }) => {
  return <main>{JSON.stringify(contracts)}</main>;
};

Page.getInitialProps = async ({ req }) => {
  console.error('req.cookies', (req as NextApiRequest).cookies);
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWM0ZDYzMy01MzMyLTRkYjktYTQyMS1lZjQ4ZmZhODI3NDciLCJuYW1lIjoiTmVkIEtlbmF3YXkiLCJpYXQiOjE1MTYyMzkwMjJ9.Zy8AEkGDp7dbXjowlmnd9vcPfH4b3mZDz9UTpEkt1bc';
  const data = await fetch(
    'http://localhost:54080/contracts/users/b1defb25-55b3-462a-beae-fb8c785a2b95',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  const result = await data.json();
  return { contracts: result };
};

export default Page;
