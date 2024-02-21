// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'
import { fsMandalacenter, vsMandalacenter} from '../shaders/mandalacenter.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { cnfgColor, configL01 } from './constants.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';
import { fsRamka, vsRamka } from '.././shaders/ramka.js'

export class Mandacenter {

  constructor(){
   const randPh = Math.floor(Math.random() * configL01.arrPh.length)
   const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
   
   
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcol: { value: cnfgColor.dancerA },
      toggle: { value: configL01.toggle },
      'time': { value: 1.0 },
      sineTime: { value: 1.0 },
      iColor: { value: cnfgColor.colorA },
      map: { value: texture },
      iRandomA: { value: configL01.randomMandA },
      iRandomB: { value: configL01.randomMandB },
      iRandomC: { value: configL01.randomMandC },
      iRandomD: { value: configL01.randomMandNoiseD },
    }
    
    this.uniformsB = {
      'map': { value: texture },
      'iTime': { value: 0.0 },
      iColor: { value: cnfgColor.colorA },
      iRandomA: { value: configL01.randomMandA },
       iRandomB: { value: configL01.randomMandB },
       iRandomC: { value: configL01.randomMandC },
       iRandomD: { value: configL01.randomMandNoiseD },
    }
    const amplitude = 0.5
    const speed = 4
   

  }

  
display(){

// разместить обьекты ровно по кругу 

const numObjects = 8
const radiusObj = 3
const faceA = new THREE.CircleBufferGeometry(.40, 3);
const faceB = faceA.clone()
const faceC = faceA.clone()
const faceD = faceA.clone()
faceA.translate(.2, 0.0, 0)
faceA.rotateZ(Math.PI / 1)
faceC.translate(0.2, -0., 0)
const triangleA = mergeGeometries([faceA, faceC ])

const triangleB = triangleA.clone()
triangleA.translate(-.6,0,0)
triangleB.translate(-.6,0,0)
triangleB.rotateZ(Math.PI*2)
triangleB.scale(-1,1,1)
const mergedA = mergeGeometries([triangleA, triangleB])


const material = new THREE.ShaderMaterial({
  uniforms: this.uniforms,
  vertexShader: vsRamka,
  //fragmentShader: fsArr[1],
  fragmentShader: fsArr[5],
  depthTest: true,
  depthWrite: true,
  transparent: false,
  vertexColors: true,
  wireframe: false,
  side: THREE.DoubleSide 
});
const materialB = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
this.mandal = new THREE.Mesh(mergedA, material)
this.mandal.position.z = 39.9
this.mandal.scale.y = .2
this.mandal.scale.x = .8

const mA = this.mandal.clone()
mA.rotation.z = Math.PI/2
const mB = this.mandal.clone()
mB.rotation.z = Math.PI / 4
const mC = this.mandal.clone()
mC.rotation.z = -Math.PI / 4

const group = new THREE.Group()
group.add(this.mandal)
group.add(mA)
group.add(mB)
group.add(mC)

return group
  }

}