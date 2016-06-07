DIRP-TREE
=========
*easy to use filetree generator*

---

How it works:

1. `npm install dirp-tree`
2. In the file you want to use it: `const dirptree = require('dirp-tree');`
3. Invoke the dirptree `dirptree();`
4. ?
5. Profit

The dirp-tree will accept two optional arguments, the first is an object that defines the structure of your dirp-tree(example below), the second is a string representing the absolute path in which your dirp-tree will be planted.

Like so: `dirptree([filetree,rootpath]);`

The `filetree` argument will default to the object returned by the `dirptree.config.js` file. Currently, this is defined by the module, but future iterations on this project will allow for user-defined config files.

The `rootpath` argument with default to your projects root directory (wherever the `node_modules` folder is located).

Example of dirp-tree object structure:
```
const mytree = {
    name: 'app/dirptree', // defines the folder name
    // all subfolders (ie 'app') will also be created
    files: [
      'roots.js', // can be strings
      { 
        name: 'beans.js', 
        src: 'src/beanfile.js' 
        // or an object with an src to pipe from
        // src is relative to loc of node_modules
      }
    ],
    paths: [
      { 
        // currently, paths must be objects
        name: 'trunk',
        files: ['branch.js','twigs.json']
      },
      {
        // future plans are to implement callbacks 
        // & vinyl streams for use in gulp
        name: 'drunk',
        files: ['water.js','roots.json']
      }
    ]
};
```