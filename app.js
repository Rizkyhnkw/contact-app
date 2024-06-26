const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const explayout = require("express-ejs-layouts");
// const morgan = require("morgan");
const { loadcontact, findcontact } = require("./utils/contacts");

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
app.use(express.urlencoded())
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
const contacts = loadcontact()
console.log(contacts)
  res.render("contact", {
    title: "halaman contact",
    layout: "layouts/main-layout",
    contacts
  });
});
// form add kontak
app.get('/contact/add', (req,res)=>{
  res.render('add-contact', {
    title: 'form tambah kontak',
    layout: 'layouts/main-layout'
  })
})
//  
app.post('/contact', (req,res)=>{
  addContact(req.body);
  res.redirect('/contact')
})
// cari kontak
app.get("/contact/:nama", (req, res) => {
  // res.sendFile("./contact.html", { root: __dirname });
const contact = findcontact(req.params.nama)
  res.render("detail", {
    title: "halaman detail contact",
    layout: "layouts/main-layout",
    contact
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
