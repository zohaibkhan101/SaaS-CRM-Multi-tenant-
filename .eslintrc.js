module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Use the recommended rules from ESLint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Use eslint-config-prettier to disable ESLint rules that would conflict with prettier
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows modern ECMAScript features
    sourceType: 'module', // Allows using imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};