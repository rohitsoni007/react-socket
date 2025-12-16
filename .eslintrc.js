module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-hooks/recommended-latest'
  ],
  plugins: [
    'react-hooks'
  ],
  rules: {
    // React Compiler rules will be enabled through the recommended-latest preset
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};