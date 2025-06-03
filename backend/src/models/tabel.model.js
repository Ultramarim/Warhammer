const mongoose = require("mongoose");

const tableSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
  });

module.exports = mongoose.model("tables", tableSchema);
