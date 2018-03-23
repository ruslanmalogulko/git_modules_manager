const definitions = {
    byName: {
        tree: {
            name: 'tree',
            id: 0,
            uri: 'https://github.com/ruslanmalogulko/tree.git',
            location: 'components',
            dependencies: []
        },
        tree_builder: {
            name: 'tree_builder',
            id: 1,
            uri: 'https://github.com/ruslanmalogulko/tree_builder.git',
            location: 'components',
            dependencies: ['tree']
        }
    }
};

module.exports = definitions;
