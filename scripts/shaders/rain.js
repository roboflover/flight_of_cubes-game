  //float rounLen = length(sin((fragCoord + fragCoord - iResolution.xy) / iResolution.y * 5.));
//vec4 pixelMandlA = vec4(sin(iTime * (10. + rounLen)) > .5);

export const fsRain  = `
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
  // romb mask
  vec2 uvMask = gl_PointCoord / vec2(1.);
  vec2 bMask = vec2(0.4, 0.5);
  vec2 boxPos = uvMask; 
  boxPos.x -= 0.5;
  boxPos.y -= 0.5;  
  float distMask = sdRhombus(boxPos, bMask);
  vec3 colMask = vec3(0.0, 0.0, 0.0);
  if (distMask < 0.005)
    colMask = vec3(1.0, 1.0, 1.0);
  else
    colMask = vec3(.0, .0, .0);
  //////  
  // romb stroke
  vec2 uvStroke = gl_PointCoord / vec2(1.);
  vec2 bStroke = vec2(0.3*(sin(iTime)*0.3+0.8), 0.4);
  vec2 boxPosStroke = uvStroke; 
  boxPosStroke.x -= 0.5;
  boxPosStroke.y -= 0.5;  
  float distStroke = sdRhombus(boxPosStroke, bStroke);
  vec3 colStroke = vec3(iMixcolB);
  if (distStroke < 0.005)
    colStroke = vec3(vColor);
  else
    colStroke = vec3(.0, .0, .0);
  //////  
  vec2 st = fragCoord.xy;
  //st.x -= 0.2;
  //st.x *= iResolution.x / iResolution.y;
  vec3 color = 2.5 + 9.5 * cos(iTime + st.xyx + vec3(0, 2, 4));
  float d = 0.0;
  st = st * 1. - .5;
  float sin_factor = sin(iTime / 5.);
  float cos_factor = cos(iTime / 5.);
  d = length(abs(sin(abs(st * 2.) + iTime*.2)) * (sin(abs(cos(st.x) * sin(st * 5.)) * .8) / 2.));
  float mask = sin(d * 50.0);  
  fragColor = vec4(vec3(mask), 1.);
  fragColor = vec4(vec3(colStroke*mask), colMask.r);
  // fragColor = vec4(vec3(pixelMandlA.rgb), 1.);


}
     
void main() {
  vec2 vUv = gl_PointCoord - vec2(0.5);
  float dist = length(gl_PointCoord - vec2(0.5));
  float alphaA = 0.99 - smoothstep(0.46, .5, dist);
  //float alphaB = 1. -smoothstep(0.35, .48, dist);
  //float alpha = alphaA-alphaB;

  mainImage(gl_FragColor, gl_PointCoord, alphaA);
  //gl_FragColor = vec4(1.0);
}
`;

export const vsRain = ` 

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
    
    vec3 newPos = position;
    float sinnX;
    float sinnY;
    float zet = 0.2;
    sinnX += sin(iTime + position.x * zet);
    sinnY += sin(iTime + position.y * zet);
    newPos.z = (sinnX * sinnY) * 5.8;

    vec3 nPos = position;
    float one;
    one  = cos(iTime * 1.000 + distance(vUv, vec2(0.0, 0.0)) * 8.0) * 0.5 + 0.5;
    one += cos(iTime * 0.666 + distance(vUv, vec2(1.0, 0.0)) * 8.0) * 0.5 + 0.5;
    one += cos(iTime * 0.777 + distance(vUv, vec2(0.5, 1.3)) * 8.0) * 0.5 + 0.5;
    one = one / 3.0;
    nPos = vec3(position.x, position.y, one+position.z);
    
    vec4 mvPosition = modelViewMatrix * vec4(nPos, 1.0);
    float pnewSX = abs(sin((iTime * position.x) * 0.05)) + .11;
    float pnewSY = abs(sin((iTime * position.y) * 0.05)) + .11;
    float pnew = (pnewSX + pnewSY) * 0.5;
    float gps = 10. * (1.5 / - mvPosition.z) * vSize*(one+3.);
    
    float r = 0.5;
    float a = pow(r, 2.0);
    float b = sin(r * 0.8 - 1.6);
    float c = sin(r - 0.010);
    float ss = sin(a - iTime * 3.0 + b) * c;
    
    gl_PointSize = gps * (ss * .5+1.1);  ;    
    
    gl_Position = projectionMatrix * mvPosition;
    
    }
    `;
