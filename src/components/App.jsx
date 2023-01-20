import { useState} from 'react';
import useLocalStorage from './hooks/useLocalStorage';

import Form from './form/Form';
import { ContactList } from './сontactList/ContactList';


export default function App() {
  const STOREG_KEY = "feedback-form-state";

  const [contacts, setContacts] = useLocalStorage(STOREG_KEY, [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]);

  const [filterName, setFilterName] = useState('');

  const onInputClick = event => {
    event.preventDefault();
    setFilterName(event.target.value);
  };

  const deleteContact = contactsId => {
    setContacts(contacts.filter(contact => contact.id !== contactsId));
  };

  const formHandelSubmit = data => {
    setContacts([...contacts, data]);
  };

   const filtered = !filterName
    ? contacts
    : contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filterName.toLowerCase())
      );

  return (

    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Form contacts={contacts} onSubmit={formHandelSubmit} />

      <h2>Contacts</h2>

      <label >Find contact by name</label>

      <input
        type="text"
        placeholder={filterName ? filterName : 'Search ...'}
        value={filterName}
        onChange={onInputClick}

      />

      <ContactList
        contacts={filtered}
        onDeleteContact={deleteContact}
      />

    </div>
  );
}
