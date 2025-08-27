import request from 'supertest'; // Import supertest for HTTP assertions
import { Test, TestingModule } from '@nestjs/testing'; // Import NestJS testing utilities
import { AppModule } from '../src/app.module'; // Import the main application module
import { INestApplication } from '@nestjs/common'; // Import NestJS common types
import mongoose from 'mongoose'; // Import mongoose for database connection

describe('Contacts E2E Tests', () => {
  let app: INestApplication; // Declare the NestJS application instance

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import the main application module
    }).compile();

    app = moduleFixture.createNestApplication(); // Create the NestJS application
    await app.init(); // Initialize the application
  });

  afterAll(async () => {
    await app.close(); // Close the application after tests
    await mongoose.connection.close(); // Close the mongoose connection
  });

  it('should create a contact', async () => {
    const response = await request(app.getHttpServer())
      .post('/contacts') // Endpoint to create a contact
      .send({
        name: 'John Doe', // Sample contact name
        email: 'john.doe@example.com', // Sample contact email
        tenantId: 'tenant123', // Sample tenant ID
      })
      .expect(201); // Expect a 201 Created response

    expect(response.body).toHaveProperty('id'); // Check if response has an ID
    expect(response.body.name).toBe('John Doe'); // Check if name matches
  });

  it('should list contacts', async () => {
    const response = await request(app.getHttpServer())
      .get('/contacts') // Endpoint to list contacts
      .set('Authorization', 'Bearer <valid-jwt-token>') // Set authorization header
      .expect(200); // Expect a 200 OK response

    expect(Array.isArray(response.body)).toBe(true); // Check if response is an array
  });
});