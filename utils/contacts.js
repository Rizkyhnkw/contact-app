const fs = require("fs");
// const chalk = require("chalk");
const validator = require("validator");
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
// menambahkan data contact baru

module.exports = { loadcontact, findcontact };
