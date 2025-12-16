module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          esmodules: true
        }
      }],
      ['@babel/preset-react', {
        runtime: 'automatic'
      }],
      ['@babel/preset-typescript', {
        isTSX: true,
        allExtensions: true,
        allowDeclareFields: true
      }]
    ],
    plugins: [
      'babel-plugin-react-compiler', // must run first!
      ['@babel/plugin-syntax-import-assertions', { assert: 'assert' }],
      ['babel-plugin-tsconfig-paths', { 
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        configFile: './tsconfig.json'
      }]
    ]
  };
};