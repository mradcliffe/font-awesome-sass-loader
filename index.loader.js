module.exports = function () {};
module.exports.pitch = function (remainingRequest) {
  var configFilePath = this.resourcePath || remainingRequest;
  this.cacheable(true);

  if (!configFilePath || configFilePath.trim() === '') {
    var msg = 'You specified the font-awesome-sass-loader with no configuration file. Please specify' +
      ' the configuration file, like: \'font-awesome-sass-loader!./font-awesome-sass.config.js\' or use' +
      ' require(\'font-awesome-sass-loader\').';
    console.error('ERROR: ' + msg);
    throw new Error(msg);
  }

  var config = require(configFilePath);

  var styleLoaders = config.styleLoaders || ['style-loader', 'css-loader', 'sass-loader'];

  if (undefined !== config.extractStyles) {
    var extractModule = '';
    if (config.extractStyles === true) {
      extractModule = 'extract-text-webpack-plugin';
    } else {
      extractModule = config.extractStyles;
    }
    styleLoaders = [
      require(extractModule).loader + '?{"omit":1,"remove":true}',
      styleLoaders.join('!'),
    ];
  }

  return 'require(' + JSON.stringify('-!' + styleLoaders.join('!') + '!' +
    require.resolve('./font-awesome-sass-styles.loader.js') + '!' + configFilePath) + ');';
};
