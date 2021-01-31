import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const { jwt: jwtCookie } = req.cookies;
  // if (jwtCookie) {
  //   try {
  //     jwt.verify(jwtCookie, process.env.jwtSecret);
  //     res.setHeader('location', '/api/contracts');
  //     res.status(200).json({ location: '/api/contracts' });
  //     res.end();
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  const response = await fetch(process.env.authUri, {
    method: 'POST',
    body: req.body,
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.ok) {
    const { access_token } = await response.json();
    res.setHeader('set-cookie', `jwt=${access_token};httpOnly;path='/'`);
  }
  res.status(response.status).end();
}
