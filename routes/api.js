const { Router } = require('express');
const { getAnuncios , createAnuncio } = require('../controllers/anuncios');

const api = Router();

api.get('/anuncios',getAnuncios);
api.post('/anuncio',createAnuncio)

module.exports = api;