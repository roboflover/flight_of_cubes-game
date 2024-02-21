export const fsMandalacenter = `

precision highp float; 

uniform vec3 iColor;
uniform float  iTime;
varying vec2 vUv;
varying float vScale;
varying vec3 vColor;
varying float vHealth;

  
float sdRhombus(in vec2 p, in vec2 b)
{

 vec2 s = vec2(0.0, b.y); // Point on the Y-axis
 vec2 t = vec2(b.x, 0.0); // Point on the X-axis
 vec2 ps = abs(p) - s; // Vector ps for projection on ts 
 vec2 ts = t - s; // Vector ts
 float h = clamp(dot(ps, ts) / dot(ts, ts), 0.0, 1.0); // Project ps on ts, take the ratio of the projection and clamp it
 vec2 l = ts * h; // Vector l by taking ratio of ts
 vec2 x = s + l; // Point x on the edge of the rhombus obtained by adding vector l to the point on the Y-axis
 vec2 d = abs(p) - x; // Compute the distance (same as sdBox)
 return length(max(d, vec2(0))) + min(max(d.x, d.y), 0.0); // Compute the distance (same as sdBox)

}


void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
 // romb mask
 vec2 uvMask = fragCoord / vec2(1.);
 uvMask*=30.;
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
 vec2 uvStroke = fragCoord / vec2(1.);
 vec2 bStroke = vec2(0.3 * (sin(iTime) * 0.3 + 0.8), 0.4);
 vec2 boxPosStroke = uvStroke;
 boxPosStroke.x -= .5;
 boxPosStroke.y -= .5;
 float distStroke = sdRhombus(boxPosStroke, bStroke);
 vec3 colStroke = vec3(1.);
 if (distStroke < 0.5)
  colStroke = vec3(vColor);
 else
  colStroke = vec3(.0, .0, .0);
 //////  
 vec2 st = fragCoord.xy*1.;
 //st.x -= 0.2;
 //st.x *= iResolution.x / iResolution.y;
 vec3 color = 2.5 + 9.5 * cos(iTime + st.xyx + vec3(0, 2, 4));
 float d = 0.0;
 st = st * 1. - .5;
 float sin_factor = sin(iTime / 5.);
 float cos_factor = cos(iTime / 5.);
 /// rand tut
 d = length(abs(sin(abs(st * 8.) + iTime * .2)) * (sin(abs(cos(st.x) * sin(st * 5.)) * .8) / 2.));
 float mask = sin(d * 50.0);
 vec3 palitra = vec3(0.0, 9., 0.);
 fragColor = vec4(vec3(mask*palitra), colStroke.g+mask);
 fragColor = vec4(vec3(mask*palitra), 1.0);
 fragColor = vec4(vec3(uvMask.x, st.y, st.x), 1.0);
 fragColor = vec4(vec3(colStroke * mask * iColor*1.), 1.);
 //fragColor = vec4(1.);


}

void main() {
 vec2 iResolution = vec2(1.);
 
 mainImage(gl_FragColor, vUv*iResolution.xy, 1.);
// gl_FragColor = vec4(1.0);
}
`;

export const vsMandalacenter = `   
    uniform float iTime;
    varying vec3 vColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
    vColor = color;
    vNormal = normal;
    vPosition = position;
    vUv = uv;
    vec3 newpos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
    }
    `;
