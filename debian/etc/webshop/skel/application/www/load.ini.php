<?php
/**
 * Svelte - Rapid web application development using best practice.
 * @copyright Copyright 2011 Justified Ltd. All rights reserved.
 * @author Matt Renyard (matt@justified-online.co.uk)
 * @package uk.ltd.justified.byw
 * @version 0.0.9;
 */
namespace svelte;

$config = parse_ini_file(__DIR__.'/../svelte.ini', \TRUE);
foreach ($config as $sectionName => $section) {
  foreach ($section as $settingName => $settingValue) {
    $settingName = strtoupper($sectionName.'_'.$settingName);
    if (!defined($settingName)) { define($settingName, $settingValue); }
  }
}
set_include_path( "'" . SVELTE_LOCAL_DIR . "'" . PATH_SEPARATOR . get_include_path() );

/**
 * register '__autoload()' function to handle namespaces for Svelte projects
 * [http://php.net/manual/en/language.oop5.autoload.php]
 */
spl_autoload_register(function ($class_name) {
  $class_name = str_replace('\\','/', $class_name);
  $local_path = SVELTE_LOCAL_DIR . '/' . $class_name . '.class.php';
  $core_path = '/usr/share/php/'. $class_name . '.class.php';
  $path = (file_exists($local_path))? $local_path : $core_path;
  require_once($path);
}, true, true);
