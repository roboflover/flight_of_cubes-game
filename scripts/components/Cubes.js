// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'
import { fsAngleBox, vsAngleBox } from '../shaders/angleBox.js'
import { fsCubes, vsCubes } from '../shaders/cubes.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { cnfgColor, configL01 } from './constants.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';

export class Cubes {

  constructor({distance, numObjects}){
   this.distance = distance
   this.numObjects = numObjects
    const randPh = Math.floor(Math.random() * configL01.arrPh.length)
    const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.boundsExtent
    this.location = new THREE.Vector3(1.0, 1.0, 0.0)
    this.count = 10;
    this.acceleration = new THREE.Vector3(0.0, -0.0005)
    //this.cubess = dancers
    this.lifetime = 0
    //this.geometry
    this.uniforms = {
     iTime: { value: 1.0 },
     iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
     iOpacity: { value: 1.0 },
     iMixcolA: { value: cnfgColor.dancerA },
     iMixcolB: { value: cnfgColor.dancerB },
     toggle: { value: configL01.toggle },
     'time': { value: 1.0 },
     sineTime: { value: 1.0 },
     iColor: { value: cnfgColor.colorD },
     iRandomA: { value: configL01.randomMandA },
     iRandomB: { value: configL01.randomMandB },
     iRandomC: { value: configL01.randomMandC },
     iRandomD: { value: configL01.randomMandNoiseD },
     map: { value: texture }
    }
    
    const amplitude = 0.5
    const speed = 4
   }

  update(){

      const pos = this.cubes.geometry.attributes.translate
      
      for (let i = 0; i < this.numObjects; i++) {
  
       const data = this.cubes.geometry.data[i]
       pos.array[i * 3 + 2] += data.velocity.z
       
       if(pos.array[i * 3 + 2] > 100){
         const p = this.createNumber()
         console.log(p)
         pos.array[i * 3 + 0] = p.x
         pos.array[i * 3 + 1] = p.y
         pos.array[i * 3 + 2] = 0
       } 
  
      pos.needsUpdate = true 
      
  }
}

chekNull(num){
  if(num.x === 0 && num.y === 0){
   return false
  } else {
   return true
  }
  
}

chekNumber(num){
 if (Math.floor(num.x / 1) * 1 === num.x &&
 Math.floor(num.y / 1) * 1 === num.y &&
 this.chekNull(num)
 ) {
   return true
 } else {
   return false
 }
}

generateNumber() {
 const num = Math.floor(Math.random()*3-1)
 console.log(num)
 return num
}

createNumber(){
 let num = new THREE.Vector3(this.generateNumber(), this.generateNumber(), 0)
 let chek = false
 while(chek != true){
  
  num.set(this.generateNumber(), this.generateNumber(), 0)
  chek = this.chekNumber(num)
 }
 
 return num
 

}
  
display(){
 
const distance = this.distance
const numObjects = this.numObjects
const radiusObj = 3
let changeDirection = false
let arrBoxes = []
const numBoxes = 0
let l = 0
let r = 0
const ratio = 0.1
let scale = 0.9
let scaleR = scale
let scaleL = scale
const geo = new THREE.BoxBufferGeometry(scale, scale, scale)

const geometry = new THREE.InstancedBufferGeometry();
geometry.index = geo.index;
geometry.attributes = geo.attributes
//geometry.data = geo
geometry.data = []

const translateArray = new Float32Array(numObjects * 3);
const colorArray = new Float32Array(numObjects * 3);
const rotateArray = new Float32Array(numObjects * 1);
const healthArray = new Float32Array(numObjects * 1);
const randomArray = new Float32Array(numObjects * 1);

const radius = 4.6
const center = new THREE.Vector3(0, 0, 0)

for (let i = 0; i < numObjects; i++) {
 
 const angle = (i / numObjects) * Math.PI * 2;
 const pos = this.createNumber()
 
 const x = pos.x
 const y = pos.y
 const z = Math.random()*20-20
 
 translateArray[i * 3 + 0] = x
 translateArray[i * 3 + 1] = y
 translateArray[i * 3 + 2] = z
 colorArray[i * 3 + 0] = 1
 colorArray[i * 3 + 1] = 1;
 colorArray[i * 3 + 2] = 1;
 // конвертируем координаты в вектор  
 const meshPos = new THREE.Vector3(x, y, -10);
 const direction = new THREE.Vector3().subVectors(center, meshPos).normalize();
rotateArray[i] = Math.atan2(direction.x, direction.y);
rotateArray[i] = Math.atan2(0, 0);
randomArray[i] = Math.random()+0.2
 geometry.data.push({
  velocity: new THREE.Vector3(
   0.1,
   0.1,
   0.5 ),
  velEmitter: new THREE.Vector3(
   0,
   0,
   0),
  policeInTheClubFlag: false,
  policeInTheClubCount: 0,
  collidingToogle: true,
  index: i,
 });
 
}

//console.log(rotateArray)
geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3))
geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
geometry.setAttribute('health', new THREE.InstancedBufferAttribute(healthArray, 1))
geometry.setAttribute('rotation', new THREE.InstancedBufferAttribute(rotateArray, 1))
geometry.setAttribute('randomized', new THREE.InstancedBufferAttribute(randomArray, 1))

const material = new THREE.RawShaderMaterial({
  uniforms: this.uniforms,
  vertexShader: vsCubes,
  fragmentShader: fsArr[0],
  depthTest: true,
  depthWrite: true,
  transparent: false,
  vertexColors: true,
  wireframe: false,
  side: THREE.DoubleSide 
});

this.cubes = new THREE.Mesh(geometry, material);
scene.add(this.cubes)
return this.cubes
  }
}