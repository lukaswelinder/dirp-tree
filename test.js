const dirptree = require('./index');
const path = require('path');
const tree = require('./dirptree.config');

dirptree(null, path.join(__dirname,'/'));