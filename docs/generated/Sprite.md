
Test comment on export
<p>The Sprite object is the base for all textured objects that are rendered to the screen</p>
<p>A sprite can be created directly from an image like this:</p>
<pre class="prettyprint source lang-js"><code>let sprite = new PIXI.Sprite.fromImage('assets/image.png');</code></pre>

<div class="pixi-prop">
Test comment on prop

</div>
<div class="pixi-prop">

<p>The blend mode to be applied to the sprite. Apply a value of <code>PIXI.BLEND_MODES.NORMAL</code> to reset the blend mode.</p>
</div>
<div class="pixi-prop">

<p>The shader that will be used to render the sprite. Set to null to remove a current shader.</p>
</div>
<div class="pixi-prop">

<p>Plugin that is responsible for rendering this element.
Allows to customize the rendering process without overriding '_renderWebGL' &amp; '_renderCanvas' methods.</p>
</div>
<div class="pixi-prop">

<p>The width of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
<div class="pixi-prop">

<p>The height of the sprite, setting this will actually modify the scale to achieve the value set</p>
</div>
<div class="pixi-prop">

<p>The anchor sets the origin point of the texture.
The default is 0,0 this means the texture's origin is the top left
Setting the anchor to 0.5,0.5 means the texture's origin is centered
Setting the anchor to 1,1 would mean the texture's origin point will be the bottom right corner</p>
</div>
<div class="pixi-prop">

<p>The tint applied to the sprite. This is a hex value.
A value of 0xFFFFFF will remove any tint effect.</p>
</div>
<div class="pixi-prop">

<p>The texture that the sprite is using</p>
</div>
