// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'
import { fsAngleBox, vsAngleBox } from '../shaders/angleBox.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { cnfgColor, configL01 } from './constants.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';
import { fsFractBox, vsFractBox } from '../shaders/fractBox.js'

export class AngleBox {

  constructor({distance, numObjects}){
   this.distance = distance
   this.numObjects = numObjects
    const randPh = Math.floor(Math.random() * configL01.arrPh.length)
    const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.boundsExtent
    this.location = new THREE.Vector3(1.0, 1.0, 0.0)
    this.count = 10;
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

arrBoxes.push(geo)

for (let i = 0; i < numBoxes; i++) {
 
 
 if(changeDirection){
  l++
  scaleR -= 0.01
  const boxR = new THREE.BoxBufferGeometry(
   scale, 
   scale, 
   scale);
  boxR.rotateX(Math.PI*ratio*l)
  boxR.translate((scale)*l, 0, 0)
  changeDirection = false
  arrBoxes.push(boxR)
 } else {
  r++
  scaleL -= 0.01
  const boxL = new THREE.BoxBufferGeometry(
   scale, 
   scale, 
   scale 
   );
  boxL.rotateX(Math.PI*ratio*r)
  boxL.translate(-(scale)*r, 0, 0)
  arrBoxes.push(boxL)
  changeDirection = true

 }
}

const merged = mergeGeometries(arrBoxes)


const geometry = new THREE.InstancedBufferGeometry();
geometry.index = merged.index;
geometry.attributes = merged.attributes
geometry.data = merged


const translateArray = new Float32Array(numObjects * 3);
const colorArray = new Float32Array(numObjects * 3);
const rotateArray = new Float32Array(numObjects * 1);
const healthArray = new Float32Array(numObjects * 1);
const radius = 4.6
const center = new THREE.Vector3(0, 0, 0)

for (let i = 0; i < numObjects; i++) {

 const angle = (i / numObjects) * Math.PI * 2;
 const x = 0
 const y = 0
 const z = i*(distance*4)
 
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
 
}

//console.log(rotateArray)
geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3))
geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
geometry.setAttribute('health', new THREE.InstancedBufferAttribute(healthArray, 1))
geometry.setAttribute('rotation', new THREE.InstancedBufferAttribute(rotateArray, 1))

const material = new THREE.RawShaderMaterial({
  uniforms: this.uniforms,
  vertexShader: vsAngleBox,
  fragmentShader: fsAngleBox,
  depthTest: true,
  depthWrite: true,
  transparent: false,
  vertexColors: true,
  wireframe: false,
  side: THREE.DoubleSide 
});
//geometry.attributes.translate.array[2] -= 18
//console.log(geometry.attributes)
this.dancer = new THREE.Mesh(geometry, material);
this.dancer.frustumCulled = false
const meshDown = this.dancer.clone()
const meshUp = this.dancer.clone()
const meshLeft = this.dancer.clone()
const meshRight = this.dancer.clone()

meshDown.position.y = -distance
meshDown.position.x = -distance

meshUp.position.y = distance
meshUp.position.x = distance

meshRight.position.x = -distance
meshRight.position.y = distance

meshLeft.position.x = distance
meshLeft.position.y = -distance

//meshLeft.rotation.z = Math.PI/2
//meshRight.rotation.z = Math.PI/2
const group = new THREE.Group()
group.add(meshDown)
group.add(meshUp)
group.add(meshRight)
group.add(meshLeft)
return group
  }

}