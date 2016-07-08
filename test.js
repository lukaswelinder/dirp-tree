const dirptree = require('./index');
const path = require('path');
const tree = require('./dirptree.config');

dirptree(tree, __dirname);