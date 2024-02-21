export const fsArr = [`

// 00 kaleidoscope 
precision highp float; 
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
  a += sin(iTime*5.)*.42+0.5;
  st = r * vec2(cos(a), sin(a));

  st.x *= color.r;
  
  vec4 mapColor = texture2D(map, st*0.5);
  
  vec3 bwPhoto = vec3(mapColor.r+mapColor.g+mapColor.b);
  
  //квадрат
  vec4 square = vec4(0.);
  vec2 uv = fragCoord.xy / iResolution.xy;
    if (uv.x > 0.10 && uv.x < 0.90 && uv.y > 0.10 && uv.y < 0.90) {
        square = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        square = vec4(0.2, 0.2, 0.2, 1.0);
    }
  //квадрат
  
  //круг
  
  vec2 cent = vec2(1.5, 1.5);
  float rad = 1.0;
  vec4 col1 = vec4(1.0, .0, .0, 1.0);
  vec4 col2 = vec4(.5, .5, .5, 1.0);

  vec2 pos = fragCoord.xy / iResolution.xy *3.;
  float dist = length(pos - cent);
  float grad = smoothstep(rad - 0.5, rad + 0.5, dist);
  vec4 circle = mix(col1, col2, grad);
    


  //круг
  
  
  fragColor = vec4(vec3(bwPhoto*square.rgb*circle.rgb), 1.0);
  //fragColor = circle;
}

void main() {

   /* 
   // gl_FragColor = texture2D(map, uv);
   */
   
   
   vec2 uv = vUv;
  mainImage(gl_FragColor, vUv*iResolution.xy);
  
}
`,

// 01 hieroglyph
`
precision highp float; 
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float center;
varying vec3 vNormal;
varying vec3 vPosition;

#define EPSILON 0.04
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{  
  float sinTime;
  vec2 st = fragCoord.xy / iResolution.xy *1.;
  st.x -= 0.2;
  st.x *= iResolution.x / iResolution.y;
  
  float d = 0.0;
  
  float stmult;
  if(center == 0.0){
   sinTime = sin(iTime*1.5) *2.1;
   stmult = 2.;
  }else {
   stmult = .1;
   sinTime = sin(iTime*100.5) *2.1;
  }
  
  st = st * stmult - 1.;
  
  if (center == 0.0) {
   d = length(abs(sin(abs(st * .5) + sinTime)) * (sin(abs(cos(st.x) * sin(st * 1.5)) * .8)/2.));
   
  } else {
   d = length(abs(sin(abs(st * .5) + sinTime)) * (sin(abs(cos(st.x) * sin(st * 1.5)) * .8)/2.));
   
  }
  float mask = sin(d * 100.0);
  vec4 ornament = vec4(iColor*mask, 1.5);
  vec4 colA = vec4(iColor, 1.0);
  vec4 mixColor = mix(ornament, colA, 0.5);
  if(center == 0.0){
  fragColor = vec4(mixColor.r*.05, 0., 0., 1.);
  } else {
  fragColor = vec4(mixColor.r*1.03, 0., 0., 1.0);
  }
}


void main() {

vec2 uv = vUv;
mainImage(gl_FragColor, vUv*iResolution.xy);

}
`,

// 02 
`
precision highp float; 
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
uniform sampler2D map;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04
#define REFLECTION_NUMBER 20

float random(vec2 uv)
{
 return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

mat3 rotation(float angle)
{
 float c = cos(angle);
 float s = sin(angle);
 return mat3(c, -s, 0., s, c, 0., 0., 0., 1.);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
 vec2 uv = (fragCoord / iResolution.y - iResolution.xy / iResolution.y * .5) * 2.;
 uv *= 1.5;
 vec3 huv = vec3(uv, 0.);
 huv *= rotation(iTime * .2);

 vec3 axisOrigin = vec3(0., 1., 0.);
 vec3 axisDirection = vec3(normalize(vec2(1., 1.)), 0.);

 for (int i = 0; i < REFLECTION_NUMBER; i++)
 {
  float offset = (3.1415 * 2. / float(REFLECTION_NUMBER)) * float(i);
  float axisRotation = offset;
  vec3 tuv = (huv - axisOrigin) * rotation(-axisRotation);
  if (tuv.y < 0.)
  {
   vec3 invuv = tuv;
   invuv.y = -invuv.y;
   invuv = (invuv * rotation(axisRotation)) + axisOrigin;
   huv = invuv;
  }
 }
 vec3 col;
 //vec4 mapColor = texture2D(map, st);
 col = vec3(texture2D(map, huv.xy - vec2(iTime * .2, 0.)));
 
// col = vec3(1.0);
 fragColor = vec4(col*iColor*3., 1.0);
}

void main() {
vec2 uv = vUv;
mainImage(gl_FragColor, vUv*iResolution.xy);
}
`,

// 03 spiral
`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{ 
    // Normalize coordinates to [-1, 1]
    vec2 uv = fragCoord/iResolution.xy*2.0-1.0;

    // Compute distance from center
    float r = length(uv);

    // Compute angle around circle
    float a = atan(uv.y, uv.x);

    // Compute sine wave
    float y = sin(a*2.0 + r*10.0 + iTime*5.0); // ChatGPT3 used iGlobalTime here.

    // Compute color from sine wave
    vec3 col = vec3(y*iColor);

    // Output color
    fragColor = vec4(col, 1.0);
}

void main() {
 
 vec2 uv = vUv;
 mainImage(gl_FragColor, vUv * iResolution.xy);
}
`
,

// 04 kaleidaMason
`
precision highp float; 
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
  a += sin(iTime*5.)*.42+0.5;
  st = r * vec2(cos(a), sin(a));

  st.x *= color.r;
  
  vec4 mapColor = texture2D(map, st*0.5);
  
  vec3 bwPhoto = vec3(mapColor.r+mapColor.g+mapColor.b);
  
  //квадрат
  vec4 square = vec4(0.);
  vec2 uv = fragCoord.xy / iResolution.xy;
    if (uv.x > 0.10 && uv.x < 0.90 && uv.y > 0.10 && uv.y < 0.90) {
        square = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        square = vec4(0.2, 0.2, 0.2, 1.0);
    }
  //квадрат
  
  //круг
  
  vec2 cent = vec2(1.5, 1.5);
  float rad = 1.0;
  vec4 col1 = vec4(1.0, .0, .0, 1.0);
  vec4 col2 = vec4(.5, .5, .5, 1.0);

  vec2 pos = fragCoord.xy / iResolution.xy *3.;
  float dist = length(pos - cent);
  float grad = smoothstep(rad - 0.5, rad + 0.5, dist);
  vec4 circle = mix(col1, col2, grad);
    


  //круг
  
  bwPhoto*= 0.6;
  fragColor = vec4(vec3(bwPhoto*square.rgb), 1.0);
  //fragColor = circle;
}

void main() {

   /* 
   // gl_FragColor = texture2D(map, uv);
   */
   
   
   vec2 uv = vUv;
  mainImage(gl_FragColor, vUv*iResolution.xy);
  
}
`,

// 05 spiralRedMason
`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float center;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{ 
    // Normalize coordinates to [-1, 1]
    vec2 uv = fragCoord/iResolution.xy*1.0-1.0;

    // Compute distance from center
    float r = length(uv);

    // Compute angle around circle
    float a = atan(uv.y, uv.x);
    
    vec3 red;
    float adam;
    float radam;
    if (center == 0.0) {
     red = vec3(1.0, 0.0, 0.0);
     adam = 20.0;
     radam = 10.0;
    } else if (center == 1.0) {
     red = vec3(0.0, 1.0, 0.0);
     adam = 1.0;
     radam = 1.0;
    }
    
    
    
    // Compute sine wave
    float y = sin(a*adam + r*radam + iTime*5.0); // ChatGPT3 used iGlobalTime here.
    vec3 col = vec3(y * red);
    // Output color
    fragColor = vec4(col, 1.0);
}

void main() {
 vec2 uv = vUv;
 mainImage(gl_FragColor, vUv * iResolution.xy);
}
`
,
// 06 spiralMason
`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{ 
    // Normalize coordinates to [-1, 1]
    vec2 uv = fragCoord/iResolution.xy*2.0-1.0;

    // Compute distance from center
    float r = length(uv);

    // Compute angle around circle
    float a = atan(uv.y, uv.x);

    // Compute sine wave
    float y = sin(a*2.0 + r*1.0 + iTime*5.0); // ChatGPT3 used iGlobalTime here.

    // Compute color from sine wave
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 col = vec3(y*white);

    // Output color
    fragColor = vec4(col, 1.0);
}

void main() {
 
 vec2 uv = vUv;
 mainImage(gl_FragColor, vUv * iResolution.xy);
}
`
,
// 07 strobe
`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{ 
    // Normalize coordinates to [-1, 1]
    vec2 uv = fragCoord/iResolution.xy*2.0-1.0;

    // Compute distance from center
    float r = length(uv);

    // Compute angle around circle
    float a = atan(uv.y, uv.x);

    // Compute sine wave
    float y = sin(a*2.0 + r*1.0 + iTime*5.0); // ChatGPT3 used iGlobalTime here.

    // Compute color from sine wave
    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 col = vec3(y*white);

    // Output color
    fragColor = vec4(col, 1.0);
}

void main() {
 
 vec2 uv = vUv;
 mainImage(gl_FragColor, vUv * iResolution.xy);
}
`
,
// 08 spiralRedKapshon
`
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iColor;
uniform float iRandRamkaStrun;
uniform float iRandRamkaChange;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
#define EPSILON 0.04

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{ 
    // Normalize coordinates to [-1, 1]
    vec2 uv = fragCoord/iResolution.xy*1.0-1.0;

    // Compute distance from center
    float r = length(uv);

    // Compute angle around circle
    float a = atan(uv.y, uv.x);

    // Compute sine wave
    float y = sin(a*1.0 + r*2.0 + iTime*5.0); // ChatGPT3 used iGlobalTime here.

    // Compute color from sine wave
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 col = vec3(y*red);

    // Output color
    fragColor = vec4(col, 1.0);
}

void main() {
 vec2 uv = vUv;
 mainImage(gl_FragColor, vUv * iResolution.xy);
}
`
]


