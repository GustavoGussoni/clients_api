import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ClientsModule, ContactsModule, AuthModule],
})
export class AppModule {}
