uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uNoiseStrength;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(tDiffuse, vUv);

    float strength = uNoiseStrength;

    float x = (vUv.x + 4.0 ) * (vUv.y + 4.0 ) * (uTime * 10.0);
	vec4 noise = 1.0 - vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;

    color *= noise;
    
    gl_FragColor = color;
}