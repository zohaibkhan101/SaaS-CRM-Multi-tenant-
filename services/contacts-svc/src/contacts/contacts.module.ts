import { Module } from '@nestjs/common'; // Importing the Module decorator from NestJS
import { MongooseModule } from '@nestjs/mongoose'; // Importing MongooseModule for MongoDB integration
import { ContactsController } from './contacts.controller'; // Importing the ContactsController
import { ContactsService } from './contacts.service'; // Importing the ContactsService
import { Contact, ContactSchema } from './dto/contact.schema'; // Importing the Contact schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]), // Registering the Contact schema with Mongoose
  ],
  controllers: [ContactsController], // Registering the ContactsController
  providers: [ContactsService], // Registering the ContactsService
  exports: [ContactsService], // Exporting the ContactsService for use in other modules
})
export class ContactsModule {} // Exporting the ContactsModule for use in the application