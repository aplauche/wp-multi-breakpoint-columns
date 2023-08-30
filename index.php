<?php

/**
 * @wordpress-plugin
 * Plugin Name:       Multi Breakpoint Columns
 * Plugin URI:        https://fullstackdigital.io
 * Description:       Adds additional breakpoints to the core columns block
 * Version:           0.1.0
 * Author:            Anton Plauche
 * Author URI:        https://fullstackdigital.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       mbpc
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
  die;
}

/**
 * Current plugin version.
 */
define('MBPC_VERSION', '0.1.0');


class MultiBreakpointColumns
{
  public function __construct()
  {
    // Base path is used to include PHP server-side
    $this->basePath = plugin_dir_path(__FILE__);
    // Base url is used for the client side asset urls
    $this->baseUrl = plugins_url('/', __FILE__);

    // Get our asset.php files that include version and dependency info
    $this->jsAssetInfo = include($this->basePath . 'build/js/editor.asset.php');
    $this->cssAssetInfo = include($this->basePath . 'build/css/style.asset.php');

    // Hooks for the editor and front end - uses array callable syntax: [class instance, method name to call]
    add_action('enqueue_block_editor_assets', [$this, 'addEditorAssets']);
    add_action('wp_enqueue_scripts', [$this, 'addFrontEndAssets']);
  }

  public function addEditorAssets()
  {
    wp_enqueue_style('mbpc-editor-css', $this->baseUrl . 'build/css/style-style.css', $this->cssAssetInfo['dependencies'], $this->cssAssetInfo['version']);
    wp_enqueue_script('mbpc-editor-js', $this->baseUrl . 'build/js/editor.js', $this->jsAssetInfo['dependencies'], $this->jsAssetInfo['version']);
  }

  public function addFrontEndAssets()
  {
    wp_enqueue_style('mbpc-frontend-css', $this->baseUrl . 'build/css/style-style.css', $this->cssAssetInfo['dependencies'], $this->cssAssetInfo['version']);
  }
}

new MultiBreakpointColumns();
