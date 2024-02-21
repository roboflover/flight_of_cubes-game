export const fsFractal = `

uniform vec3 iMixcolA;
uniform vec3 iColor;
uniform vec3 iResolution;
uniform vec2 u_mouse;
uniform float iTime;
uniform float iRandomKale;
uniform sampler2D map;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

#define PI 3.141592
#define orbs 20.

vec2 kale(vec2 uv, vec2 offset, float sides) {
 float angle = atan(uv.y, uv.x);
 angle = ((angle / PI) + 1.0) * 0.5;
 angle = mod(angle, 1.0 / sides) * sides;
 angle = -abs(2.0 * angle - 1.0) + 1.0;
 angle = angle;
 float y = length(uv);
 angle = angle * (y);
 return vec2(angle, y) - offset;
}

vec4 orb(vec2 uv, float size, vec2 position, vec3 color, float contrast) {
 return pow(vec4(size / length(uv + position) * color, 1.), vec4(contrast));
}

vec2 rotate(vec2 st, float angle) {
    return vec2(st.x * cos(angle) - st.y * sin(angle), st.x * sin(angle) + st.y * cos(angle));
}
float noise(float p) {
 return fract(sin(p) * 43758.5453123);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{

  vec2 st = fragCoord.xy / iResolution.xy;
  
  // создаем туннель
  vec2 position = (fragCoord.xy / iResolution.xy) * 2.0 - 1.0;
  position.y *= iResolution.y / iResolution.x;
  float speed = 10.1;
  float t = iTime * speed;
  float amplitudeT = 0.5;
  float frequencyT = 3.0;
  float intensity = 0.8;
  float radius = 0.3;
  // Смещение координат
  position.x += amplitudeT * sin(t + position.y * frequencyT);
  position.y += amplitudeT * cos(t + position.x * frequencyT);
  // Центр
  vec2 center = vec2(0.0, 0.0);
  // Расстояние до центра
  float distance = length(position - center);
  // Создание туннеля
  float tunnel = 0.8 - smoothstep(radius, radius + intensity, distance);
  // Цвета - сменяющиеся градиенты, рассчитанные на основе расстояния до центра
  vec3 color1 = mix(vec3(iColor), vec3(iColor), distance);
  vec3 color2 = mix(vec3(iColor), vec3(iColor), distance);
  vec3 colorT = mix(color1, color2, tunnel);
  vec4 tunnelColor = vec4(vec3(colorT.y), 1.0);
  // завершение туннеля
  
  
  
  vec3 color = vec3(0.0);
  float frequency = 2.5;
  float amplitude = .1;
  
  for (float i = 0.; i < 3.; i++) {
  
   float noiseValue = noise(st.x * frequency + i * 1000.0);
   
   color = mix(vec3(0.1), vec3(1.0), noiseValue) * amplitude;
   frequency *= 3.0;
   amplitude /= 2.0;
   color += sin(iTime)*0.1+0.5;
  }

  st = st * 2.0 - 1.0;
  st.x *= iResolution.x / iResolution.y;
  
  // Поворот на случайный угол
  float angle = iRandomKale;
  st = rotate(st, angle);
  // Создание 6 зеркальных отражений
  float r = length(st);
  float a = atan(st.y, st.x);
  float segments = 5.;
  a = mod(a, 2.0 * 3.1416 / segments);
  a = abs(mod(a + 3.1416 / segments, 2.0 * 3.1416 / segments) - 3.1416 / segments);
 // a += sin(iTime*5.)*.42+0.5;
  st = r * vec2(cos(a), sin(a));

  st.x *= color.r;
  
  vec4 mapColor = texture2D(map, st);
  
  vec3 bwPhoto = vec3(mapColor.r+mapColor.g+mapColor.b);
  
  fragColor = vec4(vec3(colorT*bwPhoto), 1.0);
  
}

void main() {

   /* 
   // gl_FragColor = texture2D(map, uv);
   */
   
   
   vec2 uv = vUv;
  mainImage(gl_FragColor, vUv*iResolution.xy);
  
}



`;

export const vsFractal = `  
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
