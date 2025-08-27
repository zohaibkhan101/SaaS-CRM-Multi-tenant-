import { Schema, Document } from 'mongoose';

// Interface representing a contact document in MongoDB
export interface Contact extends Document {
  tenantId: string; // ID of the tenant to which the contact belongs
  name: string; // Name of the contact
  email: string; // Email address of the contact
  phone?: string; // Optional phone number of the contact
  createdAt: Date; // Timestamp of when the contact was created
  updatedAt: Date; // Timestamp of when the contact was last updated
}

// Mongoose schema definition for the contact model
const ContactSchema = new Schema<Contact>(
  {
    tenantId: { type: String, required: true }, // Required field for tenant ID
    name: { type: String, required: true }, // Required field for contact name
    email: { type: String, required: true, unique: true }, // Required and unique field for email
    phone: { type: String, required: false }, // Optional field for phone number
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Exporting the schema for use in the service
export default ContactSchema;