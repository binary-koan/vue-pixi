<header>
<h1>PixiApplication
</h1>

</header>

The root component for a Pixi scene

<p>Convenience class to create a new PIXI application.
This class automatically creates the renderer, ticker
and root container.</p>

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

<div class='prop'>
<div class='name'>autoStart</div>
<div class='prop-pixi-description is-initializer'>
<p>automatically starts the rendering after the construction.
    Note that setting this parameter to false does NOT stop the shared ticker even if you set
    options.sharedTicker to true in case that it is already started. Stop it by your own.</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
true
</div>
</div>

<div class='prop'>
<div class='name'>width</div>
<div class='prop-pixi-description is-initializer'>
<p>the width of the renderers view</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
800
</div>
</div>

<div class='prop'>
<div class='name'>height</div>
<div class='prop-pixi-description is-initializer'>
<p>the height of the renderers view</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
600
</div>
</div>

<div class='prop'>
<div class='name'>transparent</div>
<div class='prop-pixi-description is-initializer'>
<p>If the render view is transparent, default false</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>antialias</div>
<div class='prop-pixi-description is-initializer'>
<p>sets antialias (only applicable in chrome at the moment)</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>resolution</div>
<div class='prop-pixi-description is-initializer'>
<p>The resolution / device pixel ratio of the renderer, retina would be 2</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
1
</div>
</div>

<div class='prop'>
<div class='name'>forceCanvas</div>
<div class='prop-pixi-description is-initializer'>
<p>prevents selection of WebGL renderer, even if such is present</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>backgroundColor</div>
<div class='prop-pixi-description is-initializer'>
<p>The background color of the rendered area
 (shown if not transparent).</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
0x000000
</div>
</div>

<div class='prop'>
<div class='name'>clearBeforeRender</div>
<div class='prop-pixi-description is-initializer'>
<p>This sets if the renderer will clear the canvas or
  not before the new render pass.</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
true
</div>
</div>

<div class='prop'>
<div class='name'>roundPixels</div>
<div class='prop-pixi-description is-initializer'>
<p>If true PixiJS will Math.floor() x/y values when rendering,
 stopping pixel interpolation.</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>forceFXAA</div>
<div class='prop-pixi-description is-initializer'>
<p>forces FXAA antialiasing to be used over native.
 FXAA is faster, but may not always look as great <strong>webgl only</strong></p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>legacy</div>
<div class='prop-pixi-description is-initializer'>
<p><code>true</code> to ensure compatibility with older / less advanced devices.
 If you experience unexplained flickering try setting this to true. <strong>webgl only</strong></p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>powerPreference</div>
<div class='prop-pixi-description is-initializer'>
<p>Parameter passed to webgl context, set to &quot;high-performance&quot;
 for devices with dual graphics card <strong>webgl only</strong></p>
<div class='prop-initializer-only'>init only</div>
</div>
</div>

<div class='prop'>
<div class='name'>sharedTicker</div>
<div class='prop-pixi-description is-initializer'>
<p><code>true</code> to use PIXI.ticker.shared, <code>false</code> to create new ticker.</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>

<div class='prop'>
<div class='name'>sharedLoader</div>
<div class='prop-pixi-description is-initializer'>
<p><code>true</code> to use PIXI.loaders.shared, <code>false</code> to create new Loader.</p>
<div class='prop-initializer-only'>init only</div>
</div>
<div class='prop-pixi-default'>
false
</div>
</div>
