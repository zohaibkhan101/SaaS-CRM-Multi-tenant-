import request from 'supertest'; // Importing supertest for HTTP assertions
import { Test, TestingModule } from '@nestjs/testing'; // Importing NestJS testing utilities
import { AppModule } from '../src/app.module'; // Importing the main application module
import { INestApplication } from '@nestjs/common'; // Importing NestJS common types
import { MongoMemoryServer } from 'mongodb-memory-server'; // Importing MongoDB in-memory server
import mongoose from 'mongoose'; // Importing mongoose for MongoDB interactions

describe('Auth E2E Tests', () => {
  let app: INestApplication; // NestJS application instance
  let mongoServer: MongoMemoryServer; // In-memory MongoDB server instance

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create(); // Start in-memory MongoDB server
    const uri = mongoServer.getUri(); // Get the URI for the in-memory server

    process.env.MONGODB_URI = uri; // Set the MongoDB URI in the environment variables

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import the main application module
    }).compile();

    app = moduleFixture.createNestApplication(); // Create the NestJS application
    await app.init(); // Initialize the application
  });

  afterAll(async () => {
    await app.close(); // Close the application
    await mongoServer.stop(); // Stop the in-memory MongoDB server
    await mongoose.disconnect(); // Disconnect from mongoose
  });

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register') // Endpoint for user registration
      .send({
        username: 'testuser', // Test username
        password: 'password123', // Test password
        tenantId: 'tenant1', // Test tenant ID
        role: 'owner', // Test user role
      })
      .expect(201); // Expect HTTP status 201 (Created)

    expect(response.body).toHaveProperty('accessToken'); // Check if accessToken is returned
  });

  it('should login an existing user', async () => {
    await request(app.getHttpServer())
      .post('/auth/register') // Register the user first
      .send({
        username: 'testuser',
        password: 'password123',
        tenantId: 'tenant1',
        role: 'owner',
      });

    const response = await request(app.getHttpServer())
      .post('/auth/login') // Endpoint for user login
      .send({
        username: 'testuser', // Test username
        password: 'password123', // Test password
      })
      .expect(200); // Expect HTTP status 200 (OK)

    expect(response.body).toHaveProperty('accessToken'); // Check if accessToken is returned
  });
}); // End of the test suite