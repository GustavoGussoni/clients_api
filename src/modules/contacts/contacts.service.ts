import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactsRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private contactRepository: ContactsRepository) {}

  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactRepository.create(createContactDto);
    return contact;
  }

  async findAll() {
    return this.contactRepository.findAll();
  }

  async findOne(id: string) {
    const findContact = await this.contactRepository.findOne(id);
    if (!findContact) throw new NotFoundException('Contact not found');
    return findContact;
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
