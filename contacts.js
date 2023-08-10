import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.format({
  dir: "db",
  base: "contacts.json",
});

export function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error));
}

export function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const getContact = parsedData.find((option) => option.id === contactId);

      console.table(getContact);
    })
    .catch((error) => console.log(error));
}

export function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contacts = parsedData.filter((option) => option.id !== contactId);

      fs.writeFile(contactsPath, JSON.stringify(contacts));
    })
    .catch((error) => console.log(error));
}

export function addContact(name, email, phone) {
  const contact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  fs.readFile(contactsPath)
    .then((data) => {
      const parsedData = JSON.parse(data);
      parsedData.push(contact);

      fs.writeFile(contactsPath, JSON.stringify(parsedData));
    })
    .catch((error) => console.log(error));
}
