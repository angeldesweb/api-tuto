const mongoose = require('mongoose');
const Anuncio = require('../models/Anuncio');
const data = require('./data.json');

const populateDb = async () => {
    try {
        await Anuncio.insertMany(data);
        console.log('La base de datos ha sido inicializada');
        return;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const initialize = async () => {
    const docs = Anuncio.find();
    try {
        if(docs.length !== 0) await Anuncio.deleteMany()
        console.log('DB cleaned');
        return;
    } catch (error) {
        console.log(error);
        return error;
    }
}

(async () => {
    
    console.log('Configurando base de datos');
    console.log('---------------------------');
    console.log('\n');
    try {
        await mongoose.connect('mongodb://localhost/nodepop')
        await initialize();
        await populateDb();
        return;
    } catch (error) {
        console.log(error)
        return;
    }
})()
