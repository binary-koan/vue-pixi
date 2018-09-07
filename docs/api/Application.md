<header>
<h1>PixiApplication
</h1>

</header>

The root component for a Pixi scene
<div class='pixi-description'>
<p>Convenience class to create a new PIXI application.
This class automatically creates the renderer, ticker
and root container.</p>
</div>


## Examples

```html
/*vue*/
<template>
  <pixi-application width="400" height="300">
    <pixi-sprite></pixi-sprite>
  </pixi-application>
</template>

<script>
export default {}
</script>
```



## Props

<table class="prop-list"><tr>
<td><strong><code>antialias</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>sets antialias (only applicable in chrome at the moment)</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>autoStart</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>true</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>automatically starts the rendering after the construction.
    Note that setting this parameter to false does NOT stop the shared ticker even if you set
    options.sharedTicker to true in case that it is already started. Stop it by your own.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>backgroundColor</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>0x000000</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>The background color of the rendered area
 (shown if not transparent).</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>clearBeforeRender</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>true</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>This sets if the renderer will clear the canvas or
  not before the new render pass.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>forceCanvas</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>prevents selection of WebGL renderer, even if such is present</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>forceFXAA</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>forces FXAA antialiasing to be used over native.
 FXAA is faster, but may not always look as great <strong>webgl only</strong></p>
</div>
</td>
</tr>


<tr>
<td><strong><code>height</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>600</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>the height of the renderers view</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>legacy</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p><code>true</code> to ensure compatibility with older / less advanced devices.
 If you experience unexplained flickering try setting this to true. <strong>webgl only</strong></p>
</div>
</td>
</tr>


<tr>
<td><strong><code>powerPreference</code></strong></td>
<td>

</td>
<td>
<div class='pixi-description is-initializer'>
<p>Parameter passed to webgl context, set to &quot;high-performance&quot;
 for devices with dual graphics card <strong>webgl only</strong></p>
</div>
</td>
</tr>


<tr>
<td><strong><code>resolution</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>1</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>The resolution / device pixel ratio of the renderer, retina would be 2</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>roundPixels</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>If true PixiJS will Math.floor() x/y values when rendering,
 stopping pixel interpolation.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>sharedLoader</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p><code>true</code> to use PIXI.loaders.shared, <code>false</code> to create new Loader.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>sharedTicker</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p><code>true</code> to use PIXI.ticker.shared, <code>false</code> to create new ticker.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>transparent</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>false</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>If the render view is transparent, default false</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>width</code></strong></td>
<td>

<p class='prop-default'><small>Default:</small>
<br />
<code>800</code>
</p>
</td>
<td>
<div class='pixi-description is-initializer'>
<p>the width of the renderers view</p>
</div>
</td>
</tr>
</table>
