## Git modules manager

### Purpose
This tool helps to track modules through definition config. It can install a bunch of packages or remove several/all on demand.

### Definitions setup

Add list of module definitions to `module_definitions.js` file.

```
  ...
  tree_builder: {
      name: 'tree_builder',
      id: 1,
      uri: 'https://github.com/ruslanmalogulko/tree_builder.git',
      location: 'components',
      dependencies: ['tree']
  }
  ...
```
Where:
`location` - location in src folder which will be parent to installed depencency
`dependencies` - you may have another module definitions as depencency for current definition. They would be installed as well. (Make sure they are described in config as well: location, name, uri, their dependencies and so on)
`name` - should be the same as git repo name
`id` - convenient way to make sure everything is fine and content is unique
`uri` - it's url for git repository

### Installing git modules
To install one or several modules you need to use command `install` from `index.js` like
```
node index.js install -p tree_builder[...more modules]
```
You may pass more than one module to install with comma separated string
```
node index.js install -p tree_builder,some_another_module,some_more_module
```
After that you can observe installed modules in relevant path. In our case under `src/components`, which is taken from `location` prop. `src` is common parent directory.

### Removing git modules
To remove one or several modules you need to use command `delete`' from `index.js` like
```
node index.js delete -p tree_builder[...more modules]
```
You man pass more than one module to remove with comman separated string

If there is no relevant module by name to remove, you will be alerted with error message like
```
Error: no such module detected: (<module name>)
```

### Removing all git modules
To remove all modules you need to use command `removeAll` from `index.js` like
```
node index.js removeAll
```
