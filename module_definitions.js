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
        },
        'ruslanmalogulko.github.io': {
            name: 'ruslanmalogulko.github.io',
            id: 2,
            uri: 'https://github.com/ruslanmalogulko/ruslanmalogulko.github.io.git',
            location: 'sites',
            dependencies: []
        },
        vimrc: {
            name: 'vimrc',
            id: 3,
            uri: 'https://github.com/ruslanmalogulko/vimrc.git',
            location: 'configs',
            dependencies: ['vimperator']
        },
        vimperator: {
            name: 'vimperator',
            id: 4,
            uri: 'https://github.com/ruslanmalogulko/vimperator.git',
            location: 'configs',
            dependencies: ['vimrc']
        }

    }
};

module.exports = definitions;
