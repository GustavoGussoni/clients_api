import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';

export class Client {
  readonly id: string;
  full_name: string;
  email: string;
  phone: string;
  readonly register_date: string;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
    this.register_date = new Date().toString();
  }
}
