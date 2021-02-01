export class MissingUserId extends Error {
  constructor() {
    super();
    this.message = 'Missing user id.';
    this.name = 'Missing User Id';
  }
}
