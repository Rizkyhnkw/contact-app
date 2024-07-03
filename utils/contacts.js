const fs = require("fs");
// const chalk = require("chalk");
// const validator = require("validator");
// const { json } = require("express");

// Create folder if it doesn't exist
const dirpath = "./data";
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}

// Create contact.json file if it doesn't exist
const datapath = "./data/contact.json";
if (!fs.existsSync(datapath)) {
  fs.writeFileSync(datapath, "[]", "utf-8");
}
//lload semua contact
const loadcontact = () => {
  try {
    const filebuff = fs.readFileSync(datapath, "utf-8");
    const datacontact = JSON.parse(filebuff);
    return datacontact;
  } catch (error) {
    // console.error(chalk.red.inverse.bold("Error reading contacts data"), error);
    return [];
  }
};

//cari kontak
const findcontact = (nama) => {
  const datacontact = loadcontact();
  const contact = datacontact.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};
// menuliskan / menimpa file contacts.json
const saveContact = (datacontact) => {
  fs.writeFileSync("data/contact.json", JSON.stringify(datacontact));
};
// menambahkan data contact baru
const addContact = (contact) => {
  const datacontact = loadcontact();
  datacontact.push(contact);
  saveContact(datacontact);
};
// cek duplikat nama
const cekDuplikat = (nama)=>{
  const datacontact = loadcontact()
  return datacontact.find((contact)=> contact.nama === nama);
}
// hapus contact
const deleteContact = (nama) =>{
  const datacontact = loadcontact();
  const filteredContact = datacontact.filter((contact)=> contact.nama !== nama)
  // console.log(filteredContact);
  saveContact(filteredContact);
}
// update contact
const updateContact = (contactBaru)=>{
  const datacontact = loadcontact()
// hilangkan contact lama yang namanya sama dengan oldnama 
const filteredContact = datacontact.filter((contact)=> contact.nama !== contactBaru.oldNama)
delete contactBaru.oldNama;
filteredContact.push(contactBaru)
saveContact(filteredContact)
}
module.exports = { loadcontact, findcontact, addContact, cekDuplikat,deleteContact,updateContact};
