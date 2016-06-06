const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const config = require('./dirptree.config');

const root_dir = path.join(__dirname, '../../');

const dirp_file = (file, dir_path) => {
  let file_path = path.join(dir_path,file.name||file);
  let write_stream = fs.createWriteStream(file_path, {flags: 'wx'});
  if(file.src)
    fs.createReadStream(path.join(root_dir,file.src)).pipe(write_stream);
  return write_stream;
};

const dirp_tree = function(dir_tree,root_path) {
  dir_tree = dir_tree || config;
  root_path = root_path || root_dir;
  let dir_path = path.join(root_path,dir_tree.name);
  return mkdirp(dir_path, (err, path) => {
    if(err)
      return err;
    if(dir_tree.paths)
      dir_tree.paths.forEach((path) => dirp_tree(dir,dir_path));
    if(dir_tree.files)
      dir_tree.files.forEach((file) => dirp_file(file,dir_path));
  });
};

module.exports = dirp_tree;