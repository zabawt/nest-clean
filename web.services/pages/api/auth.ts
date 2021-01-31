import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { jwt: jwtCookie } = req.cookies;
  if (jwtCookie) {
    try {
      jwt.verify(jwtCookie, process.env.jwtSecret);
      res.setHeader('location', '/api/contracts');
      res.status(200).json({ location: '/api/contracts' });
    } catch (err) {
      console.error(err.message);
    }
  }

  const response = await fetch(process.env.authUri, {
    method: 'POST',
    credentials: 'include',
    body: req.body,
    headers: {
      'content-type': 'application/json',
    },
  });

  if (response.status === 201) {
    const { access_token } = await response.json();
    res.setHeader('set-cookie', `jwt=${access_token};httpOnly;path='/'`);
    res.setHeader('location', '/api/contracts');
  }
  res.status(response.status).send('');
}
