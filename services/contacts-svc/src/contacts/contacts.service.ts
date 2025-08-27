import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './contact.schema'; // Importing the Contact schema

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  // Create a new contact
  async create(createContactDto: CreateContactDto, tenantId: string): Promise<Contact> {
    const createdContact = new this.contactModel({ ...createContactDto, tenantId });
    return createdContact.save();
  }

  // Retrieve all contacts for a specific tenant
  async findAll(tenantId: string): Promise<Contact[]> {
    return this.contactModel.find({ tenantId }).exec();
  }

  // Retrieve a contact by ID
  async findOne(id: string, tenantId: string): Promise<Contact> {
    const contact = await this.contactModel.findOne({ _id: id, tenantId }).exec();
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  // Update a contact by ID
  async update(id: string, updateContactDto: UpdateContactDto, tenantId: string): Promise<Contact> {
    const updatedContact = await this.contactModel.findOneAndUpdate(
      { _id: id, tenantId },
      updateContactDto,
      { new: true }
    ).exec();
    if (!updatedContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return updatedContact;
  }

  // Delete a contact by ID
  async remove(id: string, tenantId: string): Promise<void> {
    const result = await this.contactModel.deleteOne({ _id: id, tenantId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
  }
}