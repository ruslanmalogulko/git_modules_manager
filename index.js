const argv = require('minimist')(process.argv.slice(2));
const operation = argv['_'][0];
const modulesToOperate = typeof argv.p === 'string' ? argv.p.split(',') : [];
const operations = require('./consts').operations;
const installDefinitions = require('./install_definitions');
const removeDefinitions = require('./remove_definitions');
const definitions = require('./module_definitions').byName;
const log = require('./utils').log;

switch(operation) {
  case operations.install:
    {
        return installDefinitions(modulesToOperate);
    }
  case operations.delete:
    {
        return removeDefinitions(modulesToOperate);
    }
  case operations.removeAll:
    {
        return removeDefinitions(Object.keys(definitions));
    }
}
