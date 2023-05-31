import { randomUUID } from 'node:crypto';

export class Contact {
  readonly id: string;
  full_name: string;
  email: string;
  phone: string;
  readonly register_date: string;
  clientId?: string;

  constructor() {
    this.id = randomUUID();
    this.register_date = new Date().toString();
  }
}
