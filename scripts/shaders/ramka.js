export const fsRamka = `

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
varying vec3 vNormal;
varying vec3 vPosition;

#define EPSILON 0.04
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{  
    float randA = 1.;
    //рамка струны
    vec2 uv = (fragCoord.xy / iResolution.xy) * 2.0 - 1.0;
    uv.x *= iResolution.x / iResolution.y*randA;
    float speed = 1.1;
    float amplitude = 0.5;
    float frequency = 3.0;
    float damping = 0.05;
    float timeScaled = sin(iTime * speed);
    float noise = 0.1 * (2.0 * fract(sin(dot(gl_FragCoord.xyz + timeScaled, vec3(12.9898, 78.233, 45.5432))) * 43758.5453) - 1.0);
    float offset = noise * amplitude;
    float y = uv.y + offset;
    float dy = sin(timeScaled * frequency + uv.x * frequency) * amplitude;
    dy *= pow(1.0 - damping, timeScaled);
    y -= dy;
    float colorN = pow(1.0 - y, 3.0);
    fragColor = vec4(vec3(colorN*iColor), 1.0);
    // рамка струны


  
  fragColor = vec4(vec3(colorN*iColor), 1.0);
}


void main() {

vec2 uv = vUv;
//mainImage(gl_FragColor, vPosition.xy*vUv*200.1);
mainImage(gl_FragColor, vUv*iResolution.xy);
//vec4 color = vec4(pixelMandlA.r+uv.y-0.2, 0.1, pixelMandlA.b+uv.y-0.4, 1.0);
//gl_FragColor = vec4(color);
}
`;

export const vsRamka = `  
    uniform float iTime;
    varying vec3 vColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

      void main() {
      vNormal = normal;
      vPosition = position;
        vUv = uv;
        vec3 newpos = position;
      float newTime = sin(iTime*3.);  
        float sinnX;
        float sinnY;
        float sinnZ;
        float aaa = 3.0;
        sinnX = cos(newTime + position.y * aaa);
        sinnY = cos(newTime + position.z * aaa);
        sinnZ = sin(newTime + position.y * aaa);
        newpos.x += sinnX;
        newpos.y += sinnY;
        newpos.z += sinnZ;
        
        float sinxyz = sin(iTime) *1.1;
        //newpos = vec3(newpos.x, newpos.y, newpos.z);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      
    }
    `;
