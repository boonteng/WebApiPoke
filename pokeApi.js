const axios = require('axios');
const ins = require('./pokeDb');
const mongoose = require('mongoose');
const query = "https://pokeapi.co/api/v2/pokemon?name=ditto";
const db = "mongodb+srv://Boon:abcd@cluster0-zb3dy.mongodb.net/pokemon?retryWrites=true&w=majority";


mongoose.connect(db).then(() => {
    console.log('connected');
})

axios.get(query).then((response) => {
    console.log(response.data[0]);
    cat = new ins({
        name: response.data[0].pokemon[0].name,
        species: response.data[0].pokemon[0].species,
        
    });
  
}).catch((error) => {
    console.log(error);
})

