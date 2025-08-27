import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './contact.schema'; // Importing the Contact schema
import { CreateContactDto } from './dto/create-contact.dto'; // DTO for creating a contact
import { UpdateContactDto } from './dto/update-contact.dto'; // DTO for updating a contact
import { JwtUser } from '../../../packages/shared/src/types/JwtUser'; // Importing shared type for JWT user

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>, // Injecting the Mongoose model for contacts
  ) {}

  // Create a new contact
  async create(createContactDto: CreateContactDto, user: JwtUser): Promise<Contact> {
    const createdContact = new this.contactModel({ ...createContactDto, tenantId: user.tenantId });
    return createdContact.save(); // Saving the contact to the database
  }

  // Retrieve all contacts for a specific tenant
  async findAll(user: JwtUser): Promise<Contact[]> {
    return this.contactModel.find({ tenantId: user.tenantId }).exec(); // Finding contacts scoped by tenantId
  }

  // Retrieve a contact by ID
  async findOne(id: string, user: JwtUser): Promise<Contact> {
    return this.contactModel.findOne({ _id: id, tenantId: user.tenantId }).exec(); // Finding a contact by ID and tenantId
  }

  // Update a contact by ID
  async update(id: string, updateContactDto: UpdateContactDto, user: JwtUser): Promise<Contact> {
    return this.contactModel.findOneAndUpdate(
      { _id: id, tenantId: user.tenantId },
      updateContactDto,
      { new: true },
    ).exec(); // Updating the contact and returning the updated document
  }

  // Delete a contact by ID
  async remove(id: string, user: JwtUser): Promise<Contact> {
    return this.contactModel.findOneAndDelete({ _id: id, tenantId: user.tenantId }).exec(); // Deleting the contact
  }
}