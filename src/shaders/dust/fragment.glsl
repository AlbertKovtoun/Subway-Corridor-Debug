varying vec2 vUv;
varying float vRandom;
varying float vProgress;

void main()
{
	float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

	//Fading circles
	float alpha = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
	alpha = alpha * 0.1 * vRandom;

	vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, alpha);
}