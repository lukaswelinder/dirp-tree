// 'use strict';

const fs = require('fs');
const path = require('path');
const stream = require('stream');

const co = require('co');
const mkdirp = require('mkdirp');


/*
 * ROOT_DIR - absolute path to location of
 * node_modules folder (ie project root folder)
 *
 * @type {[string]}
 */
const ROOT_DIR = path.join(__dirname, '../../');

/*
 * CONFIG - IIFE checks if file 'dirptree.CONFIG.js' exists
 * in project root-directory, if it does not, loads default from
 * package
 *
 * @return {[stream]} write_stream
 */
const CONFIG = (function loadConfig(fp) {
  let cfi_path = path.join(ROOT_DIR, fp || 'dirptree.CONFIG.js');
  try {
    fs.statSync(cfi_path);
    return require(cfi_path);
  } catch(err) {
    return require('./dirptree.CONFIG');
  }
})();
// TODO: apply 'loadConfig()' as prototype of the export to allow custom CONFIG locations



/*
 * dirp_file - internal API used to create file and/or pipe
 * to file from src defined in directory tree object; accepts
 * either an object or a string for the argument 'file' and 
 * behaves accordingly
 * 
 * @param  {[object || string]} file       file to be created as a writestream,
 *                                         'src' property defines a file to pipe from
 *                                         relative to the project root (loc of node_modules)
 * 
 * @param  {[string]} dir_path            directory path from root into which the
 *                                        file will be created
 *                                        
 * @return {[stream]} write_stream        returns instance of the writeStream class
 *                                        currently unused, future implementation of
 *                                        promises and/or vinyl streams for gulp planned
 */
const dirp_file = (file, dir_path) => 
  new Promise(function(resolve, reject) {
    try {
      let file_path = path.join(dir_path,file.name||file);
      let write_stream = fs.createWriteStream(file_path, {flags: 'a+'});
      if(file.src)
        fs.createReadStream(path.join(ROOT_DIR,file.src)).pipe(write_stream);
      resolve(write_stream);
    } catch(err) {
      reject(err);
    }
  });


// const dirp_dirs = (dir_tree, dir_path) => {
//
//
// };

/*
 *  dirp_tree - filetree generator directly exported from module;
 *  currently the return value has no functionality, implementation
 *  of promises or streams planned
 * 
 * @param  {[object]} dir_tree   object from which the directory tree will
 *                               be constructed, formatting documentation
 *                               can be found in dirptree.CONFIG.js,
 *                               defaults to the obj in the CONFIG file
 *                               
 * @param  {[string]} root_path  absolute path of location to place dir_tree,
 *                               defaults to location of node_modules folder
 *
 * @return {[stream]} mkdirp     currently does nothing as far as functionality
 */
const dirp_tree = function(dir_tree, root_path) {
  dir_tree = dir_tree || CONFIG;
  root_path = root_path || ROOT_DIR;
  let dir_path = path.join(root_path, dir_tree.name);
  return new Promise (function(resolve,reject) {
    mkdirp(dir_path, (err, path) => {
      if(err)
        reject(err);
      if(dir_tree.paths)
        co(function*(){
          return yield dir_tree.paths.map((tree) => dirp_tree(tree, dir_path));
        });
      if(dir_tree.files)
        co(function*(){
          return yield dir_tree.files.map((file) => dirp_file(file, dir_path));
        }).then((args) => console.log(args));
    });
  });
};

module.exports = dirp_tree;