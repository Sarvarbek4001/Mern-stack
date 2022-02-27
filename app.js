const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");

//Config
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/contact");

//data schema

const contactSchema = {
  name: String,
  descr: String,
  number: Number,
};

//data model
const Contact = mongoose.model("Contact", contactSchema);

//read route
app.get("/contacts", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// create route
app.post("/newContact", (req, res) => {
  const newContact = new Contact({
    name: req.body.name,
    descr: req.body.descr,
    number: req.body.number,
  });
  newContact
    .save()
    .then((contact) => console.log(contact))
    .catch((err) => {
      res.status(400).json(err);
    });
});

//delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("Deleted");
    } else {
      console.log(err);
    }
  });
});
//update route

app.put("/put/:id", (req, res) => {
  const updateContact = {
    name: req.body.name,
    descr: req.body.descr,
    number: req.body.number,
  };
  Contact.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updateContact },
    (req, res, err) => {
      if (!err) {
        console.log("Updated");
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server has been started on port 5000...");
});
