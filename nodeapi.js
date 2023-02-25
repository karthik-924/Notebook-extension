const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());
mongoose.connect(
  "mongodb://0.0.0.0:27017/notebook",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const schema = {
  name: String,
  email: String,
  password: String,
  notebook: String,
};
const monmodel = mongoose.model("NEWCOL", schema);

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const notebook = "";
  var exists;
  monmodel.find({ email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length > 0) {
        exists = true;
        res.status(200).send({ exists: exists });
      } else {
        if (name && email && password) {
          const newuser = new monmodel({ name, email, password, notebook });
          newuser.save();
          return res.status(200).send({ success: true, exists: exists });
        }
      }
    }
  });
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  monmodel.find({ email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data[0].password == req.body.password)
        res.status(200).json({ success: true, data: data });
      else {
        res.status(200).json({ success: false });
      }
    }
  });
});

app.post("/notebook", (req, res) => {
  const { email } = req.body;
  monmodel.findOne({ email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ success: true, data: data });
    }
  });
});

app.post("/notebook/save", (req, res) => {
  const { email, notes } = req.body;
  monmodel.findOne({ email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      const update = { notebook: notes };
      let doc = monmodel.findOneAndUpdate({ email }, update, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json({ success: true, data: data });
    }
  });
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
