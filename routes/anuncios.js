'use strict';

const { Router } = require('express');
const {getAnuncios} = require('../controllers/anuncios');
const adv = Router();

adv.get('/', async function (req, res, next) {
    req.view = true;
    try {
        const resp = await getAnuncios(req,res,next);
        res.render('anuncios', { total:resp.total, anuncios: resp.rows });
    } catch(err){
        return next(err); 
    }
});

module.exports = adv;