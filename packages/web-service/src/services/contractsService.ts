import { Contract } from '../interfaces/contracts';

export class contractsService {
  private apiUri: string = process.env.contractsUri;

  constructor(private readonly authCookie: string) {}
  /**
   * Returns contract data
   * @param userId
   */
  async getUserContracts(userId: string): Promise<Contract[]> {
    const contracts = await fetch(`${this.apiUri}/users/${userId}`, {
      method: 'GET',
      headers: new Headers({
        Cookie: `jwt=${this.authCookie};httpOnly;Path='/',maxAge=${
          15 * 60 * 1000
        }`,
      }),
    });
    return contracts.json();
  }
}
