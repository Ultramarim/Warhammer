const Table = require('../models/table.model');
const TableController = {};

// get all tables
TableController.getAllTables = async (req, res) => {
  const tables = await Table.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json( error ));
};

// get table by id
TableController.getTableById = async (req, res) => {
 const table = await Table.findById(req.params.id)
 .then((data)  =>{
    if(data!=null) res.status(200).json(data)
    else res.status(404).json({ message: 'Table not found' })
 })
 .catch((err) => console.error(err));
};

// add movie
TableController.addTable = async (req, res) => {
  const table = new Table(req.body);
  await table.save()
    .then(() => { 
        res.status(201).json({status: 'Table succesfully inserted'})
    })
    .catch(err => {
     res.send(err.message);
     console.error(err);
    });
};


// update table
TableController.updateTable = async (req, res) => {
  const table = req.body;
  await Table.findByIdAndUpdate(
    req.params.id,
    {$set: movie},
    {new: true})
    .then((data) => {
        if (data != null) res.status(200).json({status: 'Table succesfully updated!', data})
            else res.status(404).json({status: 'Table not found'})
    })
    .catch(err => res.status(400).send(err.message));
};

// delete table
TableController.deleteTable = async (req, res) => {
    await Table.findByIdAndDelete(req.params.id)
    .then((data) => {
        if (data != null) res.status(200).json({status: 'Table succesfully deleted!'})
            else res.status(404).json({status: 'Table not found'})
    })
    .catch(err => res.status(400).send(err.message));
};