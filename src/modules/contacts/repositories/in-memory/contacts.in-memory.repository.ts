import { Injectable } from '@nestjs/common';
import { ContactsRepository } from '../contact.repository';
import { CreateContactDto } from '../../dto/create-contact.dto';
import { Contact } from '../../entities/contact.entity';
import { UpdateContactDto } from '../../dto/update-contact.dto';

@Injectable()
export class ContactsInMemoryRepository implements ContactsRepository {
  private database: Contact[] = [];

  async create(data: CreateContactDto, clientId: string): Promise<Contact> {
    const newContact = new Contact();
    Object.assign(newContact, {
      clientId: clientId,
      ...data,
    });
    this.database.push(newContact);

    return newContact;
  }

  async findAll(): Promise<Contact[]> {
    return this.database;
  }

  async findOne(id: string): Promise<Contact> {
    const contact = this.database.find((contact) => contact.id === id);
    return contact;
  }

  findByEmail(email: string): Contact | Promise<Contact> {
    const contact = this.database.find((contact) => contact.email === email);
    return contact;
  }

  update(id: string, data: UpdateContactDto): Contact | Promise<Contact> {
    const contactIndex = this.database.findIndex(
      (contact) => contact.id === id,
    );
    this.database[contactIndex] = {
      ...this.database[contactIndex],
      ...data,
    };
    return this.database[contactIndex];
  }
  delete(id: string): void | Promise<void> {
    const contactIndex = this.database.findIndex(
      (contact) => contact.id === id,
    );
    this.database.splice(contactIndex, 1);
  }
}
