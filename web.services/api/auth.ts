export const AuthApi = {
  signIn: async (login: string, password: string): Promise<any> => {
    const response = await fetch(process.env.authUri, {
      method: "POST",
      body: JSON.stringify({ login, password }),
      cache: "no-cache",
      headers: new Headers({
        Accept: "application/json",
        "content-type": "application/json",
      }),
    });
    return { status: response.status, data: await response.json() };
  },
};
