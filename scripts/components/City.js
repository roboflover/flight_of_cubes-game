import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsCity, vsCity } from '.././shaders/city.js'
import { fsRoad, vsRoad } from '.././shaders/road.js'

export class City {
  constructor(){
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolB: { value: cnfgColor.roadA },
      iMixcolA: { value: cnfgColor.roadB },
    }
  }
  
addCity(){
 
const circleCount = 20;
let baseG = new THREE.BoxGeometry(30.3, 10.5, 3.5);
baseG.translate(0, .5, 0);
baseG.rotateX(Math.PI * 0.5);
let g = new THREE.InstancedBufferGeometry().copy(baseG);
g.instanceCount = circleCount
console.log(g.instanceCount);

const translateArray = new Float32Array(circleCount * 3);
const offset = 12.75

for (let i = 0; i < circleCount*3; i += 3) {
  translateArray[i + 0] = i * offset;
  translateArray[i + 1] = 0;
  translateArray[i + 2] = 0;
}

g.setAttribute("instPos", new THREE.InstancedBufferAttribute(translateArray, 3));
let moveData = []; //phase, speed
for (let i = 0; i < circleCount; i++) {
  moveData.push(
    Math.PI * 2 * Math.random(),
    Math.random() * 0.5 + 0.5
  );
}

g.setAttribute("moveData", new THREE.InstancedBufferAttribute(new Float32Array(moveData), 2));
let uniforms = {
  iTime: { value: 0 },
  iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
}
const matRoad2 = new THREE.MeshBasicMaterial({ 
   color: "gray", side: THREE.DoubleSide });
const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
let m = new THREE.MeshStandardMaterial({
  color: "white",
  roughness: 0.6,
  metalness: 0.8,
  side: THREE.DoubleSide,
  onBeforeCompile: shader => {
    shader.uniforms.iTime = uniforms.iTime;
    shader.uniforms.iResolution = uniforms.iResolution;
    shader.vertexShader = `
      uniform float iTime;
      attribute vec3 instPos;
      attribute vec2 moveData;
      varying vec2 vPosition;
      varying vec2 vUv2;
      varying vec3 vTangent;
      ${shader.vertexShader}
    `.replace(

      `#include <begin_vertex>`,
      `#include <begin_vertex>
        vPosition = moveData;
        float newTime = iTime*4.;
        transformed += instPos;
        //transformed.z += sin(newTime * moveData.y + moveData.x) * 2.5;
        transformed.x -= mod(  moveData.x + iTime * 5. + 100., 500.);
        //transformed.x -= iTime*50.;

        
      `
    );
    shader.fragmentShader = `
    uniform float iTime;
    uniform vec3 iResolution;
    varying vec2 vUv2;
    varying vec3 vTangent;
    varying vec2 vPosition;
    ${shader.fragmentShader}
    
    `.replace(
   `#include <clipping_planes_pars_fragment>`,
   `#include <clipping_planes_pars_fragment>

    float edgeFactor(vec2 p){
      vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p) / 2.0;
      return min(grid.x, grid.y);
    }
    

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
  float a = edgeFactor(vUv);
  vec3 c = mix(diffuse, vec3(0), a);
  bool dentro = false;
  for (float x = 0.0; x < 2000.0; x = x + 100.0  )
  {
    for (float y = 0.0; y < 2000.0; y = y + 100.0)
    {
      dentro = dentro || abs(fragCoord.x - x*.75) < 25. / 2.0 && abs(fragCoord.y - y*0.5) < 50. / 4.0;
  
    }
    if (dentro) {
      fragColor = vec4(vec3(1.), opacity);
    }
    else
      fragColor = vec4(c, opacity);
  }
}


` 
)
.replace(
  `vec4 diffuseColor = vec4( diffuse, opacity );`,
  `float a = edgeFactor(vUv);
   vec3 c = mix(diffuse, vec3(0), a);
   
   //vec2 dd = dentroCuadrado(vec2(x, y), 50., gl_FragCoord);
   vec4 diffuseColor;
   
   vec2 newUv = vUv.xy;
   newUv.x *= .5 +1.;
   mainImage( diffuseColor, gl_FragCoord.xy * newUv );
   //diffuseColor = vec4(c, opacity);
`
);
    //console.log(shader.fragmentShader);
  }
});
  m.defines = { "USE_UV": "" };
  let meshR = new THREE.Mesh(g, m);
  //meshR.renderOrder = 3
  const streetWidth = 6
  meshR.rotation.x = Math.PI /2
  meshR.rotation.z = (Math.PI /2) *3
  meshR.position.x = streetWidth
  meshR.position.z = 10
  meshR.material.uniforms = uniforms
  
  let meshL = new THREE.Mesh(g, m);
  meshL.rotation.x = Math.PI / 2
  meshL.rotation.z = (Math.PI / 2) * 3
  meshL.position.x = -streetWidth
  meshL.position.z = -0
  meshL.material.uniforms = uniforms
  
  const roadLength = 1000
  
  const matRoadS = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsRoad,
    fragmentShader: fsRoad,
    //blending: THREE.AdditiveBlending,
    depthTest: false,
    side: THREE.DoubleSide
  })
  const geoRoad = new THREE.PlaneBufferGeometry(20, roadLength);
  /*
  
   */
  //console.log(matRoadS)
  const road = new THREE.Mesh(geoRoad, matRoadS);
  
  road.rotation.x = Math.PI/2
  road.position.y = -3
  road.position.z = -roadLength/2+ 40
  const group = new THREE.Group()
  group.add(road)
  group.add(meshL)
  group.add(meshR)
  return group
  }
}
