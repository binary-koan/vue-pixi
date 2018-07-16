Test comment on export

<p>The Sprite object is the base for all textured objects that are rendered to the screen</p>
<p>A sprite can be created directly from an image like this:</p>
<pre class="prettyprint source lang-js"><code>let sprite = new PIXI.Sprite.fromImage('assets/image.png');</code></pre>

<div class='prop'>
<div class='name'>blendMode</div>
<div class='prop-pixi-description'>
<p>The blend mode to be applied to the sprite. Apply a value of <code>PIXI.BLEND_MODES.NORMAL</code> to reset the blend mode.</p>
</div>
</div>

<div class='prop'>
<div class='name'>shader</div>
<div class='prop-pixi-description'>
<p>The shader that will be used to render the sprite. Set to null to remove a current shader.</p>
</div>
</div>

<div class='prop'>
<div class='name'>pluginName</div>
<div class='prop-pixi-description'>
<p>Plugin that is responsible for rendering this element.
Allows to customize the rendering process without overriding '_renderWebGL' &amp; '_renderCanvas' methods.</p>
</div>
</div>

<div class='prop'>
<div class='name'>width</div>
<div class='prop-pixi-description'>
<p>The width of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
</div>

<div class='prop'>
<div class='name'>height</div>
<div class='prop-pixi-description'>
<p>The height of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
</div>

<div class='prop'>
<div class='name'>anchor</div>
<div class='prop-pixi-description'>
<p>The anchor sets the origin point of the texture.
The default is 0,0 this means the texture's origin is the top left
Setting the anchor to 0.5,0.5 means the texture's origin is centered
Setting the anchor to 1,1 would mean the texture's origin point will be the bottom right corner</p>
</div>
</div>

<div class='prop'>
<div class='name'>tint</div>
<div class='prop-pixi-description'>
<p>The tint applied to the sprite. This is a hex value.
A value of 0xFFFFFF will remove any tint effect.</p>
</div>
</div>

<div class='prop'>
<div class='name'>texture</div>
<div class='prop-pixi-description'>
<p>The texture that the sprite is using</p>
</div>
</div>

<div class='prop'>
<div class='name'>atlas</div>
<div class='prop-description'>
Test comment on prop
</div>
</div>