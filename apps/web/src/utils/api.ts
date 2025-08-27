import axios from 'axios';

// Base API URL for the backend services
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Function to handle API requests
const apiRequest = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any) => {
    try {
        const response = await axios({
            url: `${API_URL}${url}`,
            method,
            data,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach JWT token if available
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error('API request error:', error); // Log any errors
        throw error; // Rethrow the error for further handling
    }
};

// Function to register a new user
export const registerUser = async (userData: { email: string; password: string; tenantId: string; }) => {
    return await apiRequest('/auth/register', 'POST', userData);
};

// Function to login a user
export const loginUser = async (credentials: { email: string; password: string; }) => {
    return await apiRequest('/auth/login', 'POST', credentials);
};

// Function to fetch contacts
export const fetchContacts = async () => {
    return await apiRequest('/contacts', 'GET');
};

// Function to create a new contact
export const createContact = async (contactData: { name: string; email: string; phone: string; }) => {
    return await apiRequest('/contacts', 'POST', contactData);
};

// Function to update an existing contact
export const updateContact = async (contactId: string, contactData: { name?: string; email?: string; phone?: string; }) => {
    return await apiRequest(`/contacts/${contactId}`, 'PUT', contactData);
};

// Function to delete a contact
export const deleteContact = async (contactId: string) => {
    return await apiRequest(`/contacts/${contactId}`, 'DELETE');
};