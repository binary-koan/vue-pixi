<header>
<h1>extras.PixiAnimatedSprite
</h1>

<p class='extends'>extends Sprite</p></header>

<p>An AnimatedSprite is a simple way to display an animation depicted by a list of textures.</p>
<pre class="prettyprint source lang-js"><code>let alienImages = [&quot;image_sequence_01.png&quot;,&quot;image_sequence_02.png&quot;,&quot;image_sequence_03.png&quot;,&quot;image_sequence_04.png&quot;];
let textureArray = [];

for (let i=0; i &lt; 4; i++)
{
     let texture = PIXI.Texture.fromImage(alienImages[i]);
     textureArray.push(texture);
};

let mc = new PIXI.AnimatedSprite(textureArray);</code></pre>

## Props

<div class='prop'>
<div class='name'>animationSpeed</div>
<div class='prop-pixi-description'>
<p>The speed that the AnimatedSprite will play at. Higher is faster, lower is slower</p>
</div>
<div class='prop-pixi-default'>
1
</div>
</div>

<div class='prop'>
<div class='name'>loop</div>
<div class='prop-pixi-description'>
<p>Whether or not the animate sprite repeats after playing.</p>
</div>
<div class='prop-pixi-default'>
true
</div>
</div>

<div class='prop'>
<div class='name'>onComplete</div>
<div class='prop-pixi-description'>
<p>Function to call when a AnimatedSprite finishes playing</p>
</div>
</div>

<div class='prop'>
<div class='name'>onFrameChange</div>
<div class='prop-pixi-description'>
<p>Function to call when a AnimatedSprite changes which texture is being rendered</p>
</div>
</div>

<div class='prop'>
<div class='name'>onLoop</div>
<div class='prop-pixi-description'>
<p>Function to call when 'loop' is true, and an AnimatedSprite is played and loops around to start again</p>
</div>
</div>

<div class='prop'>
<div class='name'>playing</div>
<div class='prop-pixi-description'>
<p>Indicates if the AnimatedSprite is currently playing</p>
</div>
</div>

<div class='prop'>
<div class='name'>textures</div>
<div class='prop-pixi-description'>
<p>The array of textures used for this AnimatedSprite</p>
</div>
</div>
