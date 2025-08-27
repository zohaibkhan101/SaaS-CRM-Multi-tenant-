import { Module } from '@nestjs/common'; // Importing the Module decorator from NestJS
import { MongooseModule } from '@nestjs/mongoose'; // Importing MongooseModule for MongoDB integration
import { ContactService } from './contact.service'; // Importing the ContactService for business logic
import { ContactSchema } from './contact.schema'; // Importing the Contact schema for MongoDB
import { ContactsController } from '../contacts/contacts.controller'; // Importing the ContactsController for handling requests

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]), // Registering the Contact schema with Mongoose
  ],
  controllers: [ContactsController], // Registering the ContactsController
  providers: [ContactService], // Registering the ContactService
  exports: [ContactService], // Exporting the ContactService for use in other modules
})
export class ContactModule {} // Exporting the ContactModule for use in the application