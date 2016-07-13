DIRP-TREE
=========
*powerful, async filetree generator*

NOTE: dirptree is in an early/development state; expect breaking changes until the first major version, `1.0.0`.

v`0.1.0` TODO:
* [feat] allow for callback~~/transform~~ in config-object:
    * path-filled: [design] ? array of streams : concatenated stream
    * file-created: stream
* [chore] extensive testing and benchmarking (pushed to `0.1.X`)
* ~~[feat] complete implementation of file-contents sourcing~~ DONE
* ~~[feat] complete implementation of return value~~ DONE
    * ~~return promise on completion~~
    * ~~pass array of streams to `.then()`~~
* ~~[design] consider implementation of vinyl streams~~ HOLD

##What is dirp-tree???

This module is essentially a very fast file-tree generator; it uses async and parallel control flow, to first create directories in breadth-first order, then fill those directories depth-first.
 
 Why is that worth mentioning?
 
The result is an array of streams in the order they traditionally depend upon each other. While currently we can consider it a 'sapling', dirp-tree is already a useful, extensible tool for use in your development workflow.

---

###How it works:

1. `npm install dirp-tree`
2. In the file you want to use it: `const dirptree = require('dirp-tree');`
3. Invoke the dirptree: `dirptree();`
4. ???
5. Profit

---

###In more detail...

The dirp-tree will accept two optional arguments, the first is an object that defines the structure of your dirp-tree(example below), the second is a string representing the absolute path in which your dirp-tree will be planted.

Like so: `dirptree([file_tree][,root_path]);`

The `file_tree` argument will default to the object exported by your `dirptree.config.js` file, place it at the root directory of your project (next to the `node_modules` folder). 

If you've neglected to configure your dirp-tree, fear not, the module provides a basic config file, resembling your average Node.js MVC app, that it defaults to.

The `root_path` argument will default to your project's root directory. If you want to hand a `root_path` argument to your dirp-tree, **be careful**! Make sure that it's a complete path from the **root directory**, otherwise you may end up with some unexpected results...

Invoking the dirptree results in a `Promise` which, if successful, is handed an array of Node.js `WriteStream` objects (opened in `a+` mode). This functionality is under active development and may change in the future; if you have any feature-requests, don't hesitate to reach out.

---

###Example tree structure:
```
const mytree = {
    name: 'app/dirptree', // defines the folder name
    // all subfolders (ie 'app') will also be created
    files: [
      'roots.js',
      // Files can be strings,
      // or objects with a source to pipe from;
      // stream transform support is coming soon!
      { name: 'seeds.js', src: 'src/seedfile.js' },
      { name: 'bark.js', src: 'src/barkfile.js' }
    ],
    paths: [
      'leaves',
      // Paths can be strings too;
      // the path object resemble the tree object,
      // this makes dirp_tree easy to modularize
      { name: 'trunk', files: ['branch.js','twigs.json'] },
      { name: 'drunk', files: ['water.js','roots.json'] }
    ]
};

// if you're using dirp_tree with a dirptree.config.js,
// don't forget to export your tree!
module.exports = mytree;
```

---

If you have any questions about dirp-tree, or maybe you have some awesome features to recommend, feel free to file an issue and I'll be in touch!