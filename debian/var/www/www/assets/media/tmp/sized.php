<?php
/**
 * Content-Type image/svg+xml
 */
header('Content-Type: image/svg+xml');
$imgSize = split('x',strtolower(trim($_SERVER["PATH_INFO"],'/')));
$imgWidth = $imgSize[0];
$imgHeight = $imgSize[1];

?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="<?=$imgWidth; ?>" height="<?=$imgHeight; ?>">
  <rect stroke-dasharray="none" width="<?=$imgWidth; ?>" height="<?=$imgHeight; ?>" stroke="#000000" y="0" x="0" stroke-width="1px" fill="none" />
  <path d="m 0 0 l <?=$imgWidth; ?> <?=$imgHeight; ?>" stroke="#000000" stroke-width="1px" fill="none" />
  <path d="M <?=$imgWidth; ?> 0 L 0 <?=$imgHeight; ?>" stroke="#000000" stroke-width="1px" fill="none" />
  <g font-size="12" font="serif" fill="black" stroke="none" text-anchor="middle">
    <text x="<?=$imgWidth/2; ?>" y="<?=$imgHeight-3; ?>"><?=$imgWidth; ?>x<?=$imgHeight; ?></text>
  </g>
</svg>
