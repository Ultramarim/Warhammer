const express = require("express");
const tableSchema = require("../models/tabel.model");
const router = express.Router();

//create table
router.post("/table", (req, res) => {
  const table = tableSchema(req.body);
  table.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get all tables
router.get("/table", (req, res) => {
 tableSchema
  .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get table by id
router.get("/table/:id", (req, res) => {
  const { id } = req.params;
  tableSchema
   .findById(id)
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });

//update table by id
router.put("/table/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, points } = req.body;
  tableSchema
   .updateOne({ _id: id}, { $set: { title, description, points } })
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });

//delete table by id
router.delete("/table/:id", (req, res) => {
  const { id } = req.params;
  tableSchema
   .deleteOne({ _id: id})
     .then((data) => res.json(data))
     .catch((error) => res.json({ message: error }));
 });


module.exports = router;
