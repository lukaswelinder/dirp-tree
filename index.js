const fs = require('fs');
const path = require('path');
const stream = require('stream');
const mkdirp = require('mkdirp');


/*
 * root_dir - absolute path to location of
 * node_modules folder (ie project root folder)
 *
 * @type {[string]}
 */
const root_dir = path.join(__dirname, '../../');

/*
 * config - IIFE checks if file 'dirptree.config.js' exists
 * in project root-directory, if it does not, loads default from
 * package
 *
 * @return {[stream]} write_stream
 */
const config = (function loadConfig(filepath) {
  let cfi_path = path.join(root_dir, filepath || 'dirptree.config.js');
  let cfi = null;
  try {
    fs.statSync(cfi_path);
    return require.resolve(cfi_path);
  } catch(err) {
    return require.resolve('./dirptree.config')
  }
})();
// TODO: apply 'loadConfig()' as prototype of the export to allow custom config locations



/*
 * dirp_file - internal API used to create file and/or pipe
 * to file from src defined in directory tree object; accepts
 * either an object or a string for the argument 'file' and 
 * behaves accordingly
 * 
 * @param  {[object || string]} file       file to be created as a writestream,
 *                                         if it is an object with an 'src' property
 *                                         then it is piped to from that file; src is
 *                                         a relative path from the location of the
 *                                         node_modules folder
 * 
 * @param  {[string]} dir_path            directory path from root into which the
 *                                        file will be created
 *                                        
 * @return {[stream]} write_stream        returns instance of the writeStream class
 *                                        currently unused, future implementation of
 *                                        promises and/or vinyl streams for gulp planned
 */
const dirp_file = (file, dir_path) => {
  let file_path = path.join(dir_path,file.name||file);
  let write_stream = fs.createWriteStream(file_path, {flags: 'a+'});
  if(file.src)
    fs.createReadStream(path.join(root_dir,file.src)).pipe(write_stream);
  return write_stream;
};

/*
 *  dirp_tree - filetree generator directly exported from module;
 *  currently the return value has no funcitonality, implementation
 *  of promises planned
 * 
 * @param  {[object]} dir_tree   object from which the directory tree will
 *                               be constructed, formatting documentation
 *                               can be found in dirptree.config.js,
 *                               defaults to the obj in the config file
 *                               
 * @param  {[string]} root_path  absolute path of location to place dir_tree,
 *                               defaults to location of node_modules folder
 *
 * @return {[stream]} mkdirp     currently does nothing as far as functionality
 */
const dirp_tree = function(dir_tree, root_path) {
  dir_tree = dir_tree || config;
  root_path = root_path || root_dir;
  let dir_path = path.join(root_path, dir_tree.name);
  return mkdirp(dir_path, (err, path) => {
    if(err)
      return err;
    if(dir_tree.paths)
      dir_tree.paths.forEach((dir) => dirp_tree(dir,dir_path));
    if(dir_tree.files)
      dir_tree.files.forEach((file) => dirp_file(file,dir_path));
  });
};

module.exports = dirp_tree;