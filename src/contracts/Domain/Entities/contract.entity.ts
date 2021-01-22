export interface IContract {
  id: string;
  validFrom: Date;
  validTo: Date;
  userId: number;
  created: Date;
  updated: Date;
}

export class Contract {
  constructor(
    public id: string,
    public validFrom: Date,
    public validTo: Date,
    public userId: number,
    public created: Date,
    public updated: Date,
  ) {}
}
