<header>
<h1>PixiSprite
</h1>

<p class='extends'>extends Container</p></header>


<div class='pixi-description'>
<p>The Sprite object is the base for all textured objects that are rendered to the screen</p>
<p>A sprite can be created directly from an image like this:</p>
<pre class="prettyprint source lang-js"><code>let sprite = new PIXI.Sprite.fromImage('assets/image.png');</code></pre>
</div>


## Examples

<p class="demo-caption">Displaying a single image as a sprite</p>

```html
/*vue*/
<template>
  <pixi-application :width="300" :height="300">
    <pixi-sprite texture="assets/sample.png" :width="300" :height="300"></pixi-sprite>
  </pixi-application>
</template>

<script>
export default {}
</script>
```


<p class="demo-caption">Loading multiple sprites from the same file with a texture atlas</p>

```html
/*vue*/
<template>
  <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
    <pixi-sprite atlas="assets/sprites.json" texture="gabe-idle-run_01.png" :x="100" :y="100" :width="48" :height="48"></pixi-sprite>
    <pixi-sprite atlas="assets/sprites.json" texture="mani-idle-run_01.png" :x="150" :y="150" :width="48" :height="48"></pixi-sprite>
  </pixi-application>
</template>

<script>
export default {}
</script>
```



## Props

<table class="prop-list"><tr>
<td><strong><code>anchor</code></strong></td>
<td>
PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The anchor sets the origin point of the texture.
The default is 0,0 this means the texture's origin is the top left
Setting the anchor to 0.5,0.5 means the texture's origin is centered
Setting the anchor to 1,1 would mean the texture's origin point will be the bottom right corner</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>atlas</code></strong></td>
<td>

</td>
<td>
Test comment on prop
</td>
</tr>


<tr>
<td><strong><code>blendMode</code></strong></td>
<td>
number
<p class='prop-default'><small>Default:</small>
<br />
<code>PIXI.BLEND_MODES.NORMAL</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>The blend mode to be applied to the sprite. Apply a value of <code>PIXI.BLEND_MODES.NORMAL</code> to reset the blend mode.</p>
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
<p>The height of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>pluginName</code></strong></td>
<td>
string
<p class='prop-default'><small>Default:</small>
<br />
<code>'sprite'</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>Plugin that is responsible for rendering this element.
Allows to customize the rendering process without overriding '_renderWebGL' &amp; '_renderCanvas' methods.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>shader</code></strong></td>
<td>
PIXI.Filter | PIXI.Shader
</td>
<td>
<div class='pixi-description'>
<p>The shader that will be used to render the sprite. Set to null to remove a current shader.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>texture</code></strong></td>
<td>
PIXI.Texture
</td>
<td>
<div class='pixi-description'>
<p>The texture that the sprite is using</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>tint</code></strong></td>
<td>
number
<p class='prop-default'><small>Default:</small>
<br />
<code>0xFFFFFF</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>The tint applied to the sprite. This is a hex value.
A value of 0xFFFFFF will remove any tint effect.</p>
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
