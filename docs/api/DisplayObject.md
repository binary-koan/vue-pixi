<header>
<h1>PixiDisplayObject
</h1>

</header>


<div class='pixi-description'>
<p>The base class for all objects that are rendered on the screen.
This is an abstract class and should not be used on its own rather it should be extended.</p>
</div>


## Props

<table class="prop-list"><tr>
<td><strong><code>alpha</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The opacity of the object.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>filterArea</code></strong></td>
<td>
PIXI.Rectangle
</td>
<td>
<div class='pixi-description'>
<p>The area the filter is applied to. This is used as more of an optimisation
rather than figuring out the dimensions of the displayObject each frame you can set this rectangle</p>
<p>Also works as an interaction mask</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>filters</code></strong></td>
<td>
Array.<PIXI.Filter>
</td>
<td>
<div class='pixi-description'>
<p>Sets the filters for the displayObject.</p>
<ul>
<li>IMPORTANT: This is a webGL only feature and will be ignored by the canvas renderer.
To remove filters simply set this property to 'null'</li>
</ul>
</div>
</td>
</tr>


<tr>
<td><strong><code>mask</code></strong></td>
<td>
PIXI.Graphics | PIXI.Sprite
</td>
<td>
<div class='pixi-description'>
<p>Sets a mask for the displayObject. A mask is an object that limits the visibility of an
object to the shape of the mask applied to it. In PIXI a regular mask must be a
PIXI.Graphics or a PIXI.Sprite object. This allows for much faster masking in canvas as it
utilises shape clipping. To remove a mask, set this property to null.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>pivot</code></strong></td>
<td>
PIXI.Point | PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The pivot point of the displayObject that it rotates around
Assignment by value since pixi-v4.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>position</code></strong></td>
<td>
PIXI.Point | PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The coordinate of the object relative to the local coordinates of the parent.
Assignment by value since pixi-v4.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>renderable</code></strong></td>
<td>
boolean
</td>
<td>
<div class='pixi-description'>
<p>Can this object be rendered, if false the object will not be drawn but the updateTransform
methods will still be called.</p>
<p>Only affects recursive calls from parent. You can ask for bounds manually</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>rotation</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The rotation of the object in radians.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>scale</code></strong></td>
<td>
PIXI.Point | PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The scale factor of the object.
Assignment by value since pixi-v4.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>skew</code></strong></td>
<td>
PIXI.ObservablePoint
</td>
<td>
<div class='pixi-description'>
<p>The skew factor for the object in radians.
Assignment by value since pixi-v4.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>transform</code></strong></td>
<td>
PIXI.TransformBase
</td>
<td>
<div class='pixi-description'>
<p>World transform and local transform of this object.
This will become read-only later, please do not assign anything there unless you know what are you doing</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>visible</code></strong></td>
<td>
boolean
</td>
<td>
<div class='pixi-description'>
<p>The visibility of the object. If false the object will not be drawn, and
the updateTransform function will not be called.</p>
<p>Only affects recursive calls from parent. You can ask for bounds or call updateTransform manually</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>x</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The position of the displayObject on the x axis relative to the local coordinates of the parent.
An alias to position.x</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>y</code></strong></td>
<td>
number
</td>
<td>
<div class='pixi-description'>
<p>The position of the displayObject on the y axis relative to the local coordinates of the parent.
An alias to position.y</p>
</div>
</td>
</tr>
</table>
