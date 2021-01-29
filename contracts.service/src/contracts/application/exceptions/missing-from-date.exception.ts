export class MissingFromDate extends Error {
  constructor() {
    super();
    this.message = 'Missing from date.';
    this.name = 'Missing From Date';
  }
}
