import { SignInDto } from '../src/dto/signInDto';

export const AuthApi = {
  signIn: async (signInDto: SignInDto): Promise<any> => {
    const response = await fetch(process.env.authUri, {
      method: 'POST',
      body: JSON.stringify(signInDto),
      cache: 'no-cache',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
    });

    return { status: response.status, data: await response.json() };
  },
};
