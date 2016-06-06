const server_file_tree = {
  name: 'server',
  files: ['server_config.js'],
  paths: [
    {
      name: 'data',
      files: ['data_config.js'],
      paths: [
        {
          name: 'models',
          files: ['models_index.js']
        },{
          name: 'collections',
          files: ['collections_index.js']
        },{
          name: 'utils',
          files: ['utils_index.js']
        }
      ]
    },{
      name: 'router',
      files: ['router_config.js'],
      paths: [
        {
          name: 'utils',
          files: ['utils_index.js']
        }
      ]
    }
  ]
};


const client_file_tree = {
  name: 'public',
  files: ['index.html'],
  paths: [
    {
      name: 'css',
      files: ['stylesheet.js']
    },{
      name: 'js',
      files: ['public_index.js'],
      paths: [
        {
          name: 'state',
          files: ['state_config.js']
        },{
          name: 'models',
          files: ['models_index.js']
        },{
          name: 'collections',
          files: ['collections_index.js']
        },{
          name: 'utils',
          files: ['utils_index.js']
        }
      ]
    }
  ]
};

module.exports = {
  name: 'app',
  paths: [
    server_file_tree,
    client_file_tree
  ]
};