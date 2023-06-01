import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto, clientId: string) {
    if (createContactDto.email) {
      const contactEmail: string = createContactDto.email;
      const findContact = await this.contactRepository.findByEmail(
        contactEmail,
      );
      if (findContact)
        throw new ConflictException('Client with this email already exists!');
    }

    const contact = await this.contactRepository.create(
      createContactDto,
      clientId,
    );
    return contact;
  }

  async findAll(clientId: string) {
    const contacts = await this.contactRepository.findAll(clientId);

    if (!contacts.length)
      throw new NotFoundException('Do not have contacts yet');

    return contacts;
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) throw new NotFoundException('Contact not found');
    return findContact;
  }

  async findByEmail(email: string) {
    const contact = await this.contactRepository.findByEmail(email);
    if (!contact)
      throw new ConflictException('Contact with this email already exists!');

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepository.update(id, updateContactDto);
    return contact;
  }

  async remove(id: string) {
    await this.contactRepository.delete(id);
    return;
  }
}
