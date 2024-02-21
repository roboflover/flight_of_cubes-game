export const fsPolice = `

precision highp float;

uniform sampler2D map;

varying vec2 vUv;
varying float vScale;
varying vec3 vColor;
varying float vHealth;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
  vec2 iResolution = vec2(1.0);

  vec3 borderColor = vec3(.2, 0.95, 0.2);
  float thickness = 0.1;
  float fade = 0.005;

  vec2 uv = fragCoord / iResolution.xy * 2.0 - 1.0;
  float aspect = iResolution.x / iResolution.y;
  uv.x *= aspect;

  float distBorder = 0.8 - length(uv);
  vec3 border = vec3(smoothstep(0.0, fade, distBorder));
  border *= vec3(smoothstep(thickness + fade, thickness, distBorder));

  // Calculate the distance from the center of the screen to the current pixel
  float dist = distance(fragCoord, vec2(0.5 * iResolution.x, 0.5 * iResolution.y));
  // Set the color of the circle based on its distance from the center
  border *= borderColor;
  vec4 pers = vec4(0.);
  float alpha;
  if (dist < 0.16 * iResolution.x)
  {
    alpha = 1.0;
    pers = vec4(vColor.r, vColor.g, vColor.b, 1.0); // red
  }
  else
  {
    alpha = 0.0;
    pers = vec4(0.0, 0.0, 0.0, 1.0); // black
  }

  // rectangle health
  float alphaHealth = 0.0;
  vec2 xy = fragCoord.xy;
  xy.x = xy.x / iResolution.x;
  xy.y = xy.y / iResolution.y;
  vec4 solidRed = vec4(0.0, 0.0, 0.0, 1.0);
  if (xy.x < vHealth && xy.y < 0.1) {
    alphaHealth = 1.0;
    solidRed = vec4(vec3(vColor), 1.0);
  } else {
    alphaHealth = 0.0;
    solidRed = vec4(0.0, 0.0, 0.0, 1.0);
  }

  //fragColor = vec4(border + solidRed.rgb + pers.rgb, 1. );
  fragColor = vec4(border + solidRed.rgb + pers.rgb, border.r + alpha + alphaHealth);
  //fragColor = solidRed;
vec4 rabbit = texture2D(map, vUv);
fragColor = rabbit;

fragColor = vec4(solidRed.rgb, border.r + alpha + alphaHealth);
fragColor = vec4(rabbit.rgb - solidRed.rgb, rabbit.a + alphaHealth);
}

void main() {
  vec4 diffuseColor = texture2D(map, vUv);
  diffuseColor = vec4(1.0);
  gl_FragColor = vec4(diffuseColor.xyz, 0.5);
 // mainImage(gl_FragColor, vUv);
  gl_FragColor = vec4(1.0);

}
`;

export const vsPolice = `  
  precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float iTime;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 translate;
attribute vec3 color;
attribute float health;

varying vec2 vUv;
varying float vScale;
varying vec3 vColor;
varying float vHealth;

void main() {
  
  vColor = color;
  vHealth = health;
  vec4 mvPosition = modelViewMatrix * vec4(translate, 1.0);
  vec3 trTime = vec3(translate.x + iTime, translate.y + iTime, translate.z + iTime);
  float scale = sin(trTime.x * 2.1) + sin(trTime.y * 3.2) + sin(trTime.z * 4.3);
  vScale = scale;
  //scale = scale * 1.0 + 3.5;
  mvPosition.xyz += position;
  vUv = uv;
  gl_Position = projectionMatrix * mvPosition;

}
    `;
