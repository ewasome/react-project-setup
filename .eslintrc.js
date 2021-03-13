const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
  },
  plugins: [
    'react-hooks',
    'jsx-a11y',
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      jsx: true,
      arrowFunction: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': [WARN, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': [ERROR, { ignore: ['children'] }],
    'react/jsx-indent': [OFF],
    'react/no-unused-prop-types': OFF,
    'react/forbid-prop-types': WARN,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARN,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
