import React, { useEffect, useState } from 'react';
import { Contact } from '../../../packages/shared/src/types/Contact';
import { fetchContacts } from '../utils/api';

// This component fetches and displays a list of contacts for the logged-in user.
const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const fetchedContacts = await fetchContacts();
                setContacts(fetchedContacts);
            } catch (err) {
                setError('Failed to load contacts');
            } finally {
                setLoading(false);
            }
        };

        loadContacts();
    }, []);

    if (loading) return <div>Loading contacts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        {contact.name} - {contact.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;