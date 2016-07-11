'use strict';
const dirptree = require('./index');
const path = require('path');
const tree = require('./dirptree.config');

dirptree(tree, __dirname).then((args) => {
  console.log(args);
});