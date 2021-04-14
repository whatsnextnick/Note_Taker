const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const data = require("./db/db.json");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/notes", function(req, res) {
  res.json(data);
});

app.get("/notes", function(req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.post("/api/notes", function(req, res) {
  const newNote = req.body;
  const id = data.length;
  newNote.id = id + 1; //add a unique id to each note
  data.push(newNote); //add note to db

  res.send("Added new note!");
});