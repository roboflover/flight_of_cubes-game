// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'
import { fsDancer, vsDancer } from '../shaders/dancer.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { cnfgColor, configL01 } from './constants.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';

export class Dancer {

  constructor({ boundsExtent, dancerCount }){
    const randPh = Math.floor(Math.random() * configL01.arrPh.length)
    const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.boundsExtent = boundsExtent
    this.location = new THREE.Vector3(1.0, 1.0, 0.0)
    this.count = dancerCount;
    this.acceleration = new THREE.Vector3(0.0, -0.0005)
    //this.dancers = dancers
    this.lifetime = 0
    
    this.uniforms = {
     iTime: { value: 1.0 },
     iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
     iOpacity: { value: 1.0 },
     iMixcolA: { value: cnfgColor.dancerA },
     iMixcolB: { value: cnfgColor.dancerB },
     toggle: { value: configL01.toggle },
     'time': { value: 1.0 },
     sineTime: { value: 1.0 },
     iColor: { value: cnfgColor.colorA },
     iRandomA: { value: configL01.randomMandA },
     iRandomB: { value: configL01.randomMandB },
     iRandomC: { value: configL01.randomMandC },
     iRandomD: { value: configL01.randomMandNoiseD },
     map: { value: texture }
    }
    
    const amplitude = 0.5
    const speed = 4
   

  }

  
display(){

// разместить обьекты ровно по кругу 

const numObjects = 9
const radiusObj = 3
const triangleA = new THREE.CircleBufferGeometry(.5, 3);
const triangleB = triangleA.clone()
const triangleC = triangleA.clone()
triangleB.translate(-1,0,0)
triangleC.translate(0,1,0)
triangleB.rotateZ(Math.PI*2)
triangleB.scale(-1,1,1)
const merged = mergeGeometries([triangleA, triangleA])
merged.scale(0.6,0.6,0.6)
merged.rotateZ(Math.PI/3)
// завершаем размещение по кругу 
const planeGeometry = new THREE.PlaneGeometry( 1.1, 1.1 );
const geometry = new THREE.InstancedBufferGeometry();
geometry.index = merged.index;
geometry.attributes = merged.attributes
geometry.data = []

const translateArray = new Float32Array(numObjects * 3);
const colorArray = new Float32Array(numObjects * 3);
const rotateArray = new Float32Array(numObjects * 1);
const healthArray = new Float32Array(numObjects * 1);
const radius = 4.6
const center = new THREE.Vector3(0, 0, 0)

for (let i = 0; i < numObjects; i++) {

 const angle = (i / numObjects) * Math.PI * 2;
 const x = Math.cos(angle) * radiusObj;
 const y = Math.sin(angle) * radiusObj;
 
 translateArray[i * 3 + 0] = x;
 translateArray[i * 3 + 1] = y;
 translateArray[i * 3 + 2] = -0;
 colorArray[i * 3 + 0] = 1;
 colorArray[i * 3 + 1] = 1;
 colorArray[i * 3 + 2] = 1;
 // конвертируем координаты в вектор  
 const meshPos = new THREE.Vector3(x, y, 0);
 const direction = new THREE.Vector3().subVectors(center, meshPos).normalize();
  rotateArray[i] = Math.atan2(direction.x, direction.y); 
 
}

geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3))
geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
geometry.setAttribute('health', new THREE.InstancedBufferAttribute(healthArray, 1))
geometry.setAttribute('rotation', new THREE.InstancedBufferAttribute(rotateArray, 1))

const material = new THREE.RawShaderMaterial({
  uniforms: this.uniforms,
  vertexShader: vsDancer,
  fragmentShader: fsDancer,
  depthTest: true,
  depthWrite: true,
  transparent: false,
  vertexColors: true,
  wireframe: false,
  side: THREE.DoubleSide 
});

this.dancer = new THREE.Mesh(geometry, material);
this.dancer.position.z = -.5

 }
}