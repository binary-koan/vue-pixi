<header>
<h1>extras.PixiTilingSprite
</h1>

<p class='extends'>extends Sprite</p></header>


<div class='pixi-description'>
<p>A tiling sprite is a fast way of rendering a tiling image</p>
</div>


## Examples

```html
/*vue*/
<template>
  <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
    <pixi-extras-tiling-sprite
      texture="assets/tile.png"
      :x="0"
      :y="0"
      :width="300"
      :height="300"
    ></pixi-extras-tiling-sprite>
  </pixi-application>
</template>

<script>
export default {}
</script>
```



## Props

<table class="prop-list"><tr>
<td><strong><code>clampMargin</code></strong></td>
<td>
number
<p class='prop-default'><small>Default:</small>
<br />
<code>0.5</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>Changes frame clamping in corresponding textureTransform, shortcut
Change to -0.5 to add a pixel to the edge, recommended for transparent trimmed textures in atlas</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>height</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The height of the TilingSprite, setting this will actually modify the scale to achieve the value set</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>pluginName</code></strong></td>
<td>
string
<p class='prop-default'><small>Default:</small>
<br />
<code>'tilingSprite'</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>Plugin that is responsible for rendering this element.
Allows to customize the rendering process without overriding '_renderWebGL' method.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>tilePosition</code></strong></td>
<td>
PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The offset of the image that is being tiled</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>tileScale</code></strong></td>
<td>
PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The scaling of the image that is being tiled</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>tileTransform</code></strong></td>
<td>
PIXI.TransformStatic
</td>
<td>
<div class='pixi-description'>
<p>Tile transform</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>uvRespectAnchor</code></strong></td>
<td>
boolean
<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>Whether or not anchor affects uvs</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>uvTransform</code></strong></td>
<td>
PIXI.TextureMatrix
</td>
<td>
<div class='pixi-description'>
<p>transform that is applied to UV to get the texture coords</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>width</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The width of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
</td>
</tr>
</table>
