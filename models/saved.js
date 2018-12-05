const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedSchema = new Schema({
    title: { type: String, required: true },
    author: String,
    description: String,
    img: String,
    eTag: String,
    averageRating: String,
    infoLink: String,
});

const Saved = mongoose.model("Saved", savedSchema);

module.exports = Saved;
