import { useEffect, useState } from 'react';
import { Contact } from '../../../../../packages/shared/src/types/Contact'; // Importing the Contact type
import { fetchContacts } from '../utils/api'; // Importing the API utility function
import ContactList from '../components/ContactList'; // Importing the ContactList component

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]); // State to hold contacts
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await fetchContacts(); // Fetching contacts from the API
        setContacts(fetchedContacts); // Setting the fetched contacts to state
      } catch (err) {
        setError('Failed to load contacts'); // Setting error message on failure
      } finally {
        setLoading(false); // Setting loading to false after fetching
      }
    };

    loadContacts(); // Calling the loadContacts function
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div>
      <h1>Contacts</h1>
      <ContactList contacts={contacts} /> {/* Rendering the ContactList component with contacts */}
    </div>
  );
};

export default ContactsPage; // Exporting the ContactsPage component