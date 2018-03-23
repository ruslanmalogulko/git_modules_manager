const isEmpty = require('lodash/isEmpty');
const fs = require('fs');
const has = require('lodash/has');
const get = require('lodash/get');
const path = require('path');
const exec = require('child_process').exec;
const parallelLimit = require('async/parallelLimit');
const definitions = require('./module_definitions').byName;
const log = require('./utils').log;

function installDefinitions(modulesToInstall) {
    parallelLimit(resolveWithDependencies(modulesToInstall).map(mod => (callback) => {
        const relevantModuleObj = definitions[mod];
        const basePath = path.join(__dirname, 'src');
        const newPath = path.join(basePath, relevantModuleObj.location);

        if (!fs.existsSync(path.join(basePath, relevantModuleObj.location))) {
            createPath(basePath, relevantModuleObj.location);
        }
        if (fs.existsSync(path.join(basePath, relevantModuleObj.location, `${relevantModuleObj.name}/.git`))) {
            log(`Package [${relevantModuleObj.name}] location is not empty! (...${relevantModuleObj.location})`);
            return callback(null, `${newPath}/${relevantModuleObj.name} (skipped)`);
        }

        return exec(`git clone ${relevantModuleObj.uri}`, {
            cwd: newPath,
            env: process.env
        }, (err) => {
            if (err) return log(err);
            return callback(null, `${newPath}/${relevantModuleObj.name}`);
        });
    }), 3, (err, results) => {
        if (err) {
            return log(err);
        }
        log('\n >>> Installed packages:');
        return log(results);
    });
}

function createPath(basePath, pathTail) {
    function checkCreateFolder(currentPath, tail) {
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        const folder = tail.shift();
        if (folder) {
            checkCreateFolder(path.join(currentPath, folder), tail);
        }
    }
    checkCreateFolder(basePath, pathTail.split('/'));
}

function resolveWithDependencies(modulesToInstall) {
    const resolvedList = [];

    function resolveDependencies(depItem) {
        const relevantDefinition = get(definitions, depItem, {});
        resolvedList.push(relevantDefinition.name);

        if (!isEmpty(relevantDefinition.dependencies)) {
            relevantDefinition.dependencies.forEach(dep => resolveDependencies(dep));
        }
    }

    modulesToInstall.forEach(resolveDependencies);

    return resolvedList
        .filter(item => !!item)
        .filter((item, idx, all) => all.indexOf(item) === idx);
}

module.exports = installDefinitions;
