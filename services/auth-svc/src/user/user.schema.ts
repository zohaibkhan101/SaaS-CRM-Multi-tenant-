import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// User schema definition for MongoDB using Mongoose
@Schema({ timestamps: true }) // Automatically manage createdAt and updatedAt fields
export class User extends Document {
  @Prop({ required: true, unique: true }) // Email must be unique and is required
  email: string;

  @Prop({ required: true }) // Password is required
  password: string;

  @Prop({ required: true }) // Tenant ID is required for multi-tenancy
  tenantId: string;

  @Prop({ required: true, enum: ['owner', 'admin', 'member'] }) // Role must be one of the specified values
  role: 'owner' | 'admin' | 'member';
}

// Create the Mongoose schema from the User class
export const UserSchema = SchemaFactory.createForClass(User);