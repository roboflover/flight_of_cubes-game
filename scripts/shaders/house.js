export const fsHouse  = `

   uniform vec2 iResolution;
   uniform float iTime;
   uniform float iOpacity;
   uniform vec3 iColor;
   uniform float iRandMandalaChange;
   uniform float iRandomA;
   uniform float iRandomB;
   uniform float iRandomC;
   uniform float iRandomD;
   varying vec2 vUv;
   
#define PI          3.141592654
#define PI_2        (0.5*PI)
#define TAU         (2.0*PI)
#define ROT(a)      mat2(cos(a), sin(a), -sin(a), cos(a))

   
float atanapp(float y, float x) {
 float cosatan2 = x / (abs(x) + abs(y));
 float t = PI_2 - cosatan2 * PI_2;
 return y < 0.0 ? -t : t;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord, float alpha)
{
 //туннель
 
 vec2 st = fragCoord.xy / iResolution.xy;
 vec2 position = (fragCoord.xy / iResolution.xy) * 2.0 - 1.0;
 position.y *= iResolution.y / iResolution.x;
 float speed = 10.1;
 float t = iTime * speed;
 float amplitudeT = 0.5;
 float frequencyT = 3.0;
 float intensity = 0.8;
 float radius = 0.3;
 position.x += amplitudeT * sin(t + position.y * frequencyT);
 position.y += amplitudeT * cos(t + position.x * frequencyT);
 vec2 center = vec2(0.0, 0.0);
 float distance = length(position - center);
 float tunnel = 0.8 - smoothstep(radius, radius + intensity, distance);
 vec3 color1 = mix(vec3(iColor), vec3(iColor), distance);
 vec3 color2 = mix(vec3(iColor), vec3(iColor), distance);
 vec3 colorT = mix(color1, color2, tunnel);
 vec4 colorTunnel = vec4(vec3(colorT), 1.0);
 // завершение туннеля
 
 
  vec2 uvv;
  uvv = fragCoord.xy/iResolution.xy*2.;

  uvv.x += .1;
  uvv.y += .1;
  //
  float numX = -1.;
  float numY = 200.+1000.;
  
  vec2 uvNoise;
  uvNoise.x = atanapp(numX,  numY);
  uvNoise.y = atanapp(-numX,  numY);
  uvNoise /= uvv;
  float rounLenA = length(sin(uvNoise*(fragCoord*iResolution.xy*iRandomD))+sin(iTime));
  rounLenA *= 10.;
  vec3 colorNoiseA = vec3(sin(rounLenA)*5.1);
  vec4 noisePurple = vec4(colorNoiseA*iColor, 1.);
  
  

  
fragColor = noisePurple;
}
     
void main() {
     
     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
     vec2 uv = vUv;
     mainImage(gl_FragColor, vUv * iResolution.xy, 1.);
     //mainImage(gl_FragColor, gl_FragCoord.xy/vUv, 1.);
      
}
`;

export const vsHouse = `  
  uniform float iTime;
  varying vec3 vColor;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

      void main() {
      vNormal = normal;
      vPosition = position;
        vUv = uv;
   
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
       
    }
    `;
