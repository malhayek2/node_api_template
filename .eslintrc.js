module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 12
    },
    'rules': {
        'linebreak-style': 'off',
        quotes: 'off',
        'comma-dangle': 'off',
        'no-unused-vars': 'warn',
        semi: 'off'
    }
};
