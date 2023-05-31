import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsRepository } from './repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private clientsRepository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    const findClient = await this.clientsRepository.findByEmail(
      createClientDto.email,
    );
    if (findClient) throw new ConflictException('Client already exists!');

    const client = await this.clientsRepository.create(createClientDto);
    return client;
  }

  async findAll() {
    const clients = await this.clientsRepository.findAll();
    if (!clients.length)
      throw new NotFoundException('There is no clients to list!');

    return clients;
  }

  async findOne(id: string) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) throw new NotFoundException('Client not found!');

    return client;
  }

  async findByEmail(email: string) {
    const client = await this.clientsRepository.findOne(email);
    if (!client) throw new NotFoundException('Client not found!');

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const findClient = await this.clientsRepository.findOne(id);
    if (!findClient) throw new NotFoundException('Client not found!');

    const client = await this.clientsRepository.update(id, updateClientDto);
    return client;
  }

  async remove(id: string) {
    const client = await this.clientsRepository.findOne(id);
    if (!client) throw new NotFoundException('Client not found!');

    await this.clientsRepository.delete(id);
    return;
  }
}
