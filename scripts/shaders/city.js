export const fsCity = `

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMixcolB;
uniform vec3 iMixcolA;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#define rot(x) mat2(cos(x), -sin(x), sin(x), cos(x))

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec4 color = vec4(vec3(0.5), 1.0);
  
  
  fragColor = vec4(color);
}

void main() {
  vec2 uv = vUv;
  mainImage(gl_FragColor, vUv*iResolution.xy);

}
`;

export const vsCity = `  
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
