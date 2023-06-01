import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export abstract class ContactsRepository {
  abstract create(
    data: CreateContactDto,
    clientId: string,
  ): Promise<Contact> | Contact;
  abstract findAll(clientId: string): Promise<Contact[]> | Contact[];
  abstract findOne(id: string): Promise<Contact> | Contact;
  abstract findByEmail(email: string): Promise<Contact> | Contact;
  abstract update(
    id: string,
    data: UpdateContactDto,
  ): Promise<Contact> | Contact;
  abstract delete(id: string): Promise<void> | void;
}
