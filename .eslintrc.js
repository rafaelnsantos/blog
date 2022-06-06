module.exports = {
  extends: ['@monx/eslint-config-next', 'plugin:cypress/recommended'],
  plugins: ['jsx-a11y', 'cypress'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'react/prop-types': 'off',
  },
};
