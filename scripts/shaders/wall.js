  //float rounLen = length(sin((fragCoord + fragCoord - iResolution.xy) / iResolution.y * 5.));
//vec4 pixelMandlA = vec4(sin(iTime * (10. + rounLen)) > .5);

export const fsWall  = `
  // #include <common>
  uniform vec2 iResolution;
  uniform float iTime;
  uniform float iOpacity;
  uniform vec3 iMixcolB;
  uniform vec3 iMixcolA;
  varying vec3 vColor;
  //varying vec2 vUv;
  varying vec2 pCoord;
  varying float vSize;

float sdRhombus(in vec2 p, in vec2 b)
{
    
    vec2 s = vec2(0.0, b.y);	// Point on the Y-axis
    vec2 t = vec2(b.x, 0.0);	// Point on the X-axis
    vec2 ps = abs(p) - s;		// Vector ps for projection on ts 
    vec2 ts = t-s;				// Vector ts
    float h = clamp(dot(ps, ts)/dot(ts, ts), 0.0, 1.0);	// Project ps on ts, take the ratio of the projection and clamp it
    vec2 l = ts * h;			// Vector l by taking ratio of ts
    vec2 x = s + l;				// Point x on the edge of the rhombus obtained by adding vector l to the point on the Y-axis
    vec2 d = abs(p) - x;		// Compute the distance (same as sdBox)
    return length(max(d, vec2(0))) + min(max(d.x, d.y), 0.0);	// Compute the distance (same as sdBox)
    
}


void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{

  // Rhomb mask
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uvMask = gl_PointCoord / vec2(1.);
  vec2 bMask = vec2(0.5, 0.5);
  vec2 boxPos = uvMask; 
  // Move rhombus to the center:
  boxPos.x -= 0.5;
  boxPos.y -= 0.5;  
  // Calcualte the distance"
  float distMask = sdRhombus(boxPos, bMask);
  // Default color:
  vec3 colMask = vec3(0.0, 0.0, 0.0);
  // Draw filled rhombus with red color:
  if (distMask < 0.005)
    colMask = vec3(1.0, 1.0, 1.0);
  else
    colMask = vec3(.0, .0, .0);
  //////
  
  float iSin = sin(iTime)*0.5+12.;
  float newTime = iTime;
  //vec3 vColor = color;
  vec2 newres = vec2(1.0, 1.0);
  
  float rounLen = length(sin((fragCoord.xy + fragCoord.xy - newres.xy) / newres.y * 3.));
  vec4 pixelMandlA = vec4(sin(iSin * (20. + rounLen)) > .5);
  
  vec3 colorNoise = vec3(pixelMandlA.rgb);
  colorNoise=colorNoise*vColor;
  float speedX = 2.5;
  colorNoise.r*=sin(newTime* speedX*5.)*0.5+0.8;
  //colorNoise.g*=sin(iTime+1.5* speedX*0.5)*0.5+1.5;
  colorNoise.b*=sin(iTime+2.0* speedX*2.)*0.5+.85;
  
  // border
  float dist = length(gl_PointCoord - vec2(0.5));
  float borderA = 0.99 - smoothstep(0.46, .5, dist);
  float borderB = 1. - smoothstep(0.35, .48, dist);
  float border = borderA-borderB;
  vec3 newborder = vec3(border*iMixcolB.r, border*iMixcolB.g, border*iMixcolB.b);
  newborder*=iMixcolB;
  
  //fragColor = vec4(vec3(colMask), 1.0);
  fragColor = vec4(vec3(colorNoise+=(iMixcolA*0.3)), colMask.r);
  //fragColor = vec4(vec3(pixelMandlA.rgb), 1.);


}
     
void main() {
  vec2 vUv = gl_PointCoord - vec2(0.5);
  float dist = length(gl_PointCoord - vec2(0.5));
  float alphaA = 0.99 - smoothstep(0.46, .5, dist);
  //float alphaB = 1. -smoothstep(0.35, .48, dist);
  //float alpha = alphaA-alphaB;

  mainImage(gl_FragColor, gl_PointCoord, alphaA);
  gl_FragColor = vec4(1.0);
}
`;

export const vsWall = ` 

  attribute float size;
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;
  varying vec2 pCoord;
  varying vec3 vColor;
  varying float vSize;
  
    void main() {
    
    vUv = uv*position.xy;
    vColor = color;
    pCoord = vec2(position.x, position.y);
    vSize = size;
    
    
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    gl_PointSize = vSize;    
    
    gl_Position = projectionMatrix * mvPosition;
    
    }
    `;
