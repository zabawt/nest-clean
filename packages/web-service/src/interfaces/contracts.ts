export interface ValidityPeriod {
  from: string;
  until: string;
}

export interface Signartory {
  id: string;
}

export interface Contract {
  id: string;
  created: string;
  updated: string;
  validityPeriod: ValidityPeriod;
  signatory: Signartory;
}
