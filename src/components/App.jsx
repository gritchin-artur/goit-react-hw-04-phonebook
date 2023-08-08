import { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import InputPhoneBook from "./inputPhoneBook/inputPhoneBook";
import ContactsList from "./contactsList/contactsList";
import FindContact from "./findContact/findContact";
import { Formik } from "formik";
import css from "./app.module.css";

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("phoneBook")) ?? [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ]
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("phoneBook", JSON.stringify(contacts));
  }, [contacts]);

  // add name in phonebook
  const addContact = (contact) => {
    const sameNsame = contacts.some(
      ({ name }) =>
        name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );

    if (sameNsame) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }

    const newUser = {
      ...contact,
      id: nanoid(),
    };
    setContacts((contacts) => [...contacts, newUser]);
  };

  // filter of contacts
  const handleFilter = (filterData) => {
    setFilter(filterData);
  };

  const getFilterContacts = () => {
    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  //listener of input
  const filterValue = (e) => {
    const value = e.currentTarget.value.toUpperCase();
    handleFilter(value);
  };

  //delete contact
  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  return (
    <Formik>
      <div className={css.appContainer}>
        <h1>Phonebook</h1>
        <InputPhoneBook submitChange={addContact} />
        <h1>Contacts</h1>
        <FindContact findContact={filterValue} />
        <ContactsList
          contacts={getFilterContacts(contacts)}
          deleteContact={handleDeleteContact}
        />
      </div>
    </Formik>
  );
}
