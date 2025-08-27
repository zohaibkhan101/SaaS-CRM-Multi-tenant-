import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtGuard } from './jwt.guard';
import { Contact } from '../../contact/contact.schema'; // Importing the Contact schema

// Controller for handling contacts-related routes
@Controller('contacts')
@UseGuards(JwtGuard) // Protecting all routes with JWT guard
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  // Endpoint to create a new contact
  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  // Endpoint to get a contact by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(id);
  }

  // Endpoint to update a contact by ID
  @Post(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto): Promise<Contact> {
    return this.contactsService.update(id, updateContactDto);
  }

  // Endpoint to get all contacts for the authenticated tenant
  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }
}