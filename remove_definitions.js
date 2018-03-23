const fs = require('fs');
const path = require('path');
const definitions = require('./module_definitions').byName;
const parallelLimit = require('async/parallelLimit');
const exec = require('child_process').exec;
const log = require('./utils').log;

function removeDefinitions(modulesToRemove) {
    parallelLimit(modulesToRemove.map(moduleItem => (callback) => {
        const relevantModule = definitions[moduleItem];
        const newPath = path.join(__dirname, 'src', relevantModule.location, relevantModule.name);
        if (fs.existsSync(newPath)) {
            exec(`rm -rf ${newPath}`, {
                cwd: newPath,
                env: process.env
            }, (err) => {
                if (err) return log(err);
                return callback(null, `Successfully removed ${moduleItem}!`);
            });
        } else {
            callback(`Error: no such module detected: (${moduleItem})`);
        }
    }), 3, (err, results) => {
        if (err) {
            return log(err);
        }
        return log(results);
    });
}

module.exports = removeDefinitions;
