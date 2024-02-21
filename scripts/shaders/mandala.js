export const fsMandala  = `

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
   

float spacingLow = 1.76;
float spacingHigh = 2.;

// GRADIENT 

float gradient(float dir, float time, float spacing) {
 float g = fract((dir + time * 0.1) * 3.);
 float left = step(0.5, g);
 g = left * ((g - 0.5) * spacing) + (1. - left) * ((1. - g) - 0.5) * spacing;
 return g;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
 // Normalized pixel coordinates (from 0 to 1)
 vec2 uv = fragCoord.xy / iResolution.xy;
 float gradient = gradient(uv.x*5.0, iTime*25., spacingHigh);

 // Output to screen
 fragColor = vec4(gradient*iColor, 1.0);
}
     
void main() {
     
     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
     vec2 uv = vUv;
     mainImage(gl_FragColor, vUv * iResolution.xy);
}
`;

export const vsMandala = `  
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
