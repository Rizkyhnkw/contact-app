const http = require("http");
const express = require("express");
const path = require("path");
const explayout = require("express-ejs-layouts");
const { query, validationResult, check, body } = require("express-validator");
const bodyParser = require("body-parser");
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express();
const port = 5000;
// const morgan = require("morgan");
const {
  loadcontact,
  findcontact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact
} = require("./utils/contacts");
const { error } = require("console");
const { title } = require("process");

app.set("view engine", "ejs");

// 3rd party middleware
app.use(explayout);
// app.use(morgan("dev"));

// app level middleware
// app.use((req, res, next) => {
//   console.log("time", Date.now());
//   next();
// });

// built in middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash())
app.get("/", (req, res) => {
  // respons json
  // res.json({
  //     nama: "rizky"
  // });
  // res.sendFile("./index.html", { root: __dirname });

  const murid = [
    { nama: "satoko", email: "lambda@gmail.com" },
    {
      nama: "rikka",
      email: "bern@gmail.com",
    },
  ];
  res.render("index", {
    nama: "rizky",
    murid,
    title: "home",
    layout: "layouts/main-layout",
  });
});

app.get("/contact", (req, res) => {
  // res.sendFile("./contact.html", { root: __dirname });
  const contacts = loadcontact();
  console.log(contacts);
  res.render("contact", {
    title: "halaman contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash('msg'),
  });
});
// form add kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "form tambah kontak",
    layout: "layouts/main-layout",
  });
});
//
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("nama sudah digunakan");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "form tambah data contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    }else{addContact(req.body);
      req.flash('msg', 'Data contact berhasil ditambahkan.')
    res.redirect("/contact");}    
  }
);
// proses delete contact
app.get('/contact/delete/:nama', (req,res)=>{
  const contact = findcontact(req.params.nama);
// jika contact tidak ada 
if(!contact){
  res.status(404)
  res.send('<h1>404</h1>')
}else{
deleteContact(req.params.nama)
req.flash('msg', 'Data contact berhasil dihapus.')
res.redirect("/contact");
}
})
// edit contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact= findcontact(req.params.nama)

  res.render("edit-contact", {
    title: "form edit kontak",
    layout: "layouts/main-layout",
    contact,
  });
});
// proses update
app.post('/contact/update', [
  body("nama").custom((value, { req}) => {
    const duplikat = cekDuplikat(value);
    if (value !== req.body.oldNama && duplikat) {
      throw new Error("nama sudah digunakan");
    }
    return true;
  }),
  check("email", "email tidak valid").isEmail(),
  check("nohp", "no hp tidak valid").isMobilePhone("id-ID"),
],(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    res.render("edit-contact", {
      title: "form ubah data contact",
      layout: "layouts/main-layout",
      errors: errors.array(),
      contact: req.body,
    });
  }else{
    updateContact(req.body);
    req.flash('msg', 'Data contact berhasil diubah!')
  res.redirect("/contact");
}    
})
// cari kontak
app.get("/contact/:nama", (req, res) => {
  // res.sendFile("./contact.html", { root: __dirname });
  const contact = findcontact(req.params.nama);
  res.render("detail", {
    title: "halaman detail contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about", layout: "layouts/main-layout" });
  // res.sendFile("./about.html", { root: __dirname });
});

app.get("/product/:id", (req, res) => {
  res.send(`Product ID ${req.params.id} <br> Category ${req.query.category}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
