//WordPress config
const defaultConfig = require("@wordpress/scripts/config/webpack.config.js");

const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

const path = require( 'path' );

module.exports = {
  ...defaultConfig,
  entry: {
    "js/editor": path.resolve( __dirname, "src/js",  "editor.js"),
    "css/style": path.resolve( __dirname, "src/css",  "style.scss")
  },
  plugins: [
    // Include WP's plugin config.
    ...defaultConfig.plugins,

    // Removes the empty `.js` files generated by webpack but
    // sets it after WP has generated its `*.asset.php` file.
    new RemoveEmptyScriptsPlugin( {
      stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS
    } )
  ]
};