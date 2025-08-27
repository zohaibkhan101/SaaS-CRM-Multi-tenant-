import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { GetSubscriptionDto } from './dto/get-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt.guard'; // Importing JWT guard for protecting routes
import { Subscription } from '@prisma/client'; // Importing Subscription type from Prisma

@Controller('billing') // Defining the base route for billing
export class BillingController {
  constructor(private readonly billingService: BillingService) {} // Injecting BillingService

  @Post('subscriptions') // Route for creating a subscription
  @UseGuards(JwtAuthGuard) // Protecting the route with JWT guard
  async createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.billingService.createSubscription(createSubscriptionDto); // Calling service method to create subscription
  }

  @Get('subscriptions/:id') // Route for retrieving a subscription by ID
  @UseGuards(JwtAuthGuard) // Protecting the route with JWT guard
  async getSubscription(@Param('id') id: string): Promise<GetSubscriptionDto> {
    return this.billingService.getSubscription(id); // Calling service method to get subscription
  }
}