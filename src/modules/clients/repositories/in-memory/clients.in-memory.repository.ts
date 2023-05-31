import { plainToInstance } from 'class-transformer';
import { CreateClientDto } from '../../dto/create-client.dto';
import { UpdateClientDto } from '../../dto/update-client.dto';
import { Client } from '../../entities/client.entity';
import { ClientsRepository } from '../clients.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsInMemoryRepository implements ClientsRepository {
  private database: Client[] = [];

  create(data: CreateClientDto): Client | Promise<Client> {
    const newClient = new Client();
    Object.assign(newClient, { ...data });

    this.database.push(newClient);
    return plainToInstance(Client, newClient);
  }

  findAll(): Client[] | Promise<Client[]> {
    return plainToInstance(Client, this.database);
  }

  findOne(id: string): Client | Promise<Client> {
    const client = this.database.find((client) => client.id === id);
    return plainToInstance(Client, client);
  }

  findByEmail(email: string): Client | Promise<Client> {
    const client = this.database.find((client) => client.email === email);
    return plainToInstance(Client, client);
  }

  update(id: string, data: UpdateClientDto): Client | Promise<Client> {
    const clientIndex = this.database.findIndex((client) => client.id === id);
    this.database[clientIndex] = {
      ...this.database[clientIndex],
      ...data,
    };
    return plainToInstance(Client, this.database[clientIndex]);
  }

  delete(id: string): void | Promise<void> {
    const clientIndex = this.database.findIndex((client) => client.id === id);
    this.database.splice(clientIndex, 1);
  }
}
