import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Importing Prisma service for database operations
import { CreateSubscriptionDto } from './dto/create-subscription.dto'; // DTO for creating a subscription
import { GetSubscriptionDto } from './dto/get-subscription.dto'; // DTO for retrieving a subscription
import { Subscription } from '@prisma/client'; // Importing the Subscription model from Prisma

@Injectable()
export class BillingService {
  constructor(private readonly prisma: PrismaService) {} // Injecting Prisma service

  // Method to create a new subscription
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    const { tenantId, planId } = createSubscriptionDto; // Destructuring DTO
    return this.prisma.subscription.create({
      data: {
        tenantId, // Setting tenantId
        planId, // Setting planId
      },
    });
  }

  // Method to get a subscription by tenantId
  async getSubscription(tenantId: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({
      where: { tenantId }, // Finding subscription by tenantId
    });
  }
}