const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./api');
const adv = require('./anuncios');
const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const filename = path.join(__dirname, '../README.md'); // raiz del directorio + README
    const readme = await new Promise((res, rej) => 
      fs.readFile(filename, 'utf8', (err, data) => err ? rej(err) : res(data) )
    );
    res.render('index', { readme });
  } catch (err) { return next(err); }
});

router.use('/apiv1',api);
router.use('/anuncios',adv);

module.exports = router;
