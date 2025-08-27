import { Module } from '@nestjs/common'; // Importing the Module decorator from NestJS
import { MongooseModule } from '@nestjs/mongoose'; // Importing MongooseModule for MongoDB integration
import { ContactsModule } from './contacts/contacts.module'; // Importing the Contacts module
import { HealthController } from './health.controller'; // Importing the Health controller

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI), // Connecting to MongoDB using the URI from environment variables
    ContactsModule, // Registering the Contacts module
  ],
  controllers: [HealthController], // Registering the Health controller
  providers: [], // No providers are defined at the moment
})
export class AppModule {} // Exporting the AppModule class as the main application module for the contacts service