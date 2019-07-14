
const mongoose = require('mongoose');

const pokeSchema = new mongoose.Schema({
  name: { type: String },
  species: { type: String }
});

const Poke = mongoose.model('poke', pokeSchema);

module.exports = Poke;