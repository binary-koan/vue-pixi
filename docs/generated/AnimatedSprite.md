
undefined
<p>An AnimatedSprite is a simple way to display an animation depicted by a list of textures.</p>
<pre class="prettyprint source lang-js"><code>let alienImages = [&quot;image_sequence_01.png&quot;,&quot;image_sequence_02.png&quot;,&quot;image_sequence_03.png&quot;,&quot;image_sequence_04.png&quot;];
let textureArray = [];

for (let i=0; i &lt; 4; i++)
{
     let texture = PIXI.Texture.fromImage(alienImages[i]);
     textureArray.push(texture);
};

let mc = new PIXI.AnimatedSprite(textureArray);</code></pre>

<div class="pixi-prop">

<p>The speed that the AnimatedSprite will play at. Higher is faster, lower is slower</p>
</div>
<div class="pixi-prop">

<p>Whether or not the animate sprite repeats after playing.</p>
</div>
<div class="pixi-prop">

<p>Function to call when a AnimatedSprite finishes playing</p>
</div>
<div class="pixi-prop">

<p>Function to call when a AnimatedSprite changes which texture is being rendered</p>
</div>
<div class="pixi-prop">

<p>Function to call when 'loop' is true, and an AnimatedSprite is played and loops around to start again</p>
</div>
<div class="pixi-prop">

<p>Indicates if the AnimatedSprite is currently playing</p>
</div>
<div class="pixi-prop">

<p>The array of textures used for this AnimatedSprite</p>
</div>
