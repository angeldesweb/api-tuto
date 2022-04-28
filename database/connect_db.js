let { connection , connect } = require('mongoose');
const db = connection;

Promise = global.Promise;

db.on('error', function (err) {
  console.error('mongodb connection error:', err);
  process.exit(1);
});

db.once('open', function () {
  console.info('Connected to mongodb.');
});

connect('mongodb://localhost/nodepop');

module.exports = db;