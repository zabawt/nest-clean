export interface IContract {
  id: string;
  validFrom: Date;
  validTo: Date;
  userId: number;
  created: Date;
  updated: Date;
}

export class Contract {
  private signed: boolean;
  constructor(
    public id: string,
    public validFrom: Date,
    public validTo: Date,
    public userId: string,
    public created: Date,
    public updated: Date,
  ) {}

  public sign(): void {
    this.signed = true;
  }
}
