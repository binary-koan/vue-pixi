<header>
<h1>extras.PixiAnimatedSprite
</h1>

<p class='extends'>extends Sprite</p></header>


<div class='pixi-description'>
<p>An AnimatedSprite is a simple way to display an animation depicted by a list of textures.</p>
<pre class="prettyprint source lang-js"><code>let alienImages = [&quot;image_sequence_01.png&quot;,&quot;image_sequence_02.png&quot;,&quot;image_sequence_03.png&quot;,&quot;image_sequence_04.png&quot;];
let textureArray = [];

for (let i=0; i &lt; 4; i++)
{
     let texture = PIXI.Texture.fromImage(alienImages[i]);
     textureArray.push(texture);
};

let mc = new PIXI.AnimatedSprite(textureArray);</code></pre>
</div>


## Examples

```html
/*vue*/
<template>
  <pixi-application :width="300" :height="300" :background-color="0x6df7b1">
    <pixi-extras-animated-sprite
      atlas="assets/sprites.json"
      :textures="gabeRun"
      :x="100"
      :y="100"
      :width="48"
      :height="48"
      :playing="true"
      :animation-speed="0.1"
    ></pixi-extras-animated-sprite>
    <pixi-extras-animated-sprite
      atlas="assets/sprites.json"
      :textures="maniRun"
      :x="150"
      :y="150"
      :width="48"
      :height="48"
      :playing="true"
      :animation-speed="0.1"
    ></pixi-extras-animated-sprite>
  </pixi-application>
</template>

<script>
export default {
  data() {
    return {
      gabeRun: [2, 3, 4, 5, 6, 7].map(n => `gabe-idle-run_0${n}.png`),
      maniRun: [2, 3, 4, 5, 6, 7].map(n => `mani-idle-run_0${n}.png`)
    }
  }
}
</script>
```



## Props

<table class="prop-list"><tr>
<td><strong><code>animationSpeed</code></strong></td>
<td>
number
<p class='prop-default'><small>Default:</small>
<br />
<code>1</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>The speed that the AnimatedSprite will play at. Higher is faster, lower is slower</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>atlas</code></strong></td>
<td>

</td>
<td>
Path to an atlas (JSON file) which contains the textures for the sprite. Unlike plain Pixi,
this must be specified and must contain all the textures in the animation
</td>
</tr>


<tr>
<td><strong><code>loop</code></strong></td>
<td>
boolean
<p class='prop-default'><small>Default:</small>
<br />
<code>true</code>
</p>
</td>
<td>
<div class='pixi-description'>
<p>Whether or not the animate sprite repeats after playing.</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>onComplete</code></strong></td>
<td>
function
</td>
<td>
<div class='pixi-description'>
<p>Function to call when a AnimatedSprite finishes playing</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>onFrameChange</code></strong></td>
<td>
function
</td>
<td>
<div class='pixi-description'>
<p>Function to call when a AnimatedSprite changes which texture is being rendered</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>onLoop</code></strong></td>
<td>
function
</td>
<td>
<div class='pixi-description'>
<p>Function to call when 'loop' is true, and an AnimatedSprite is played and loops around to start again</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>playing</code></strong></td>
<td>
boolean
</td>
<td>
<div class='pixi-description'>
<p>Indicates if the AnimatedSprite is currently playing</p>
</div>
</td>
</tr>


<tr>
<td><strong><code>textures</code></strong></td>
<td>
Array.<PIXI.Texture>
</td>
<td>
<div class='pixi-description'>
<p>The array of textures used for this AnimatedSprite</p>
</div>
</td>
</tr>
</table>
