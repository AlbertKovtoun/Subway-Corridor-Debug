uniform sampler2D tDiffuse;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(tDiffuse, vUv);

    //create a vignette effect
    float distanceToCenter = distance(vUv, vec2(0.5, 0.5));
    color.rgb *= smoothstep(0.8, 0.2, distanceToCenter);

    gl_FragColor = color;
}