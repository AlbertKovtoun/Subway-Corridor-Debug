uniform sampler2D tDiffuse;
uniform float uTime;

varying vec2 vUv;

vec2 computeUV( vec2 uv, float k, float kcube ){
    
    vec2 t = uv - .5;
    float r2 = t.x * t.x + t.y * t.y;
	float f = 0.;
    
    if( kcube == 0.0){
        f = 1. + r2 * k;
    }else{
        f = 1. + r2 * ( k + kcube * sqrt( r2 ) );
    }
    
    vec2 nUv = f * t + .5;
    nUv.y = 1. - nUv.y;
 
    return nUv;
    
}

void main()
{
    vec2 uv = vUv;

    //rotate uv 180 degrees
    uv.y = 1.0 - uv.y;

    vec4 color = texture2D(tDiffuse, vUv);

    // float k = 1.0 * sin( uTime * .9 );
    float k = -0.6;

    // float kcube = .5 * sin( uTime );
    float kcube = 0.9;
    
    // float offset = .1 * sin( uTime * .5 );
    float offset = 0.05;
    
    float red = texture2D( tDiffuse, computeUV( uv, k + offset, kcube ) ).r; 
    float green = texture2D( tDiffuse, computeUV( uv, k, kcube ) ).g; 
    float blue = texture2D( tDiffuse, computeUV( uv, k - offset, kcube ) ).b; 
    
    gl_FragColor = vec4( red, green, blue, 1.0 ); 
}