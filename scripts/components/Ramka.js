import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsRamka, vsRamka } from '.././shaders/ramka.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';

export class Ramka {
  constructor(){
   const randPh = Math.floor(Math.random() * configL01.arrPh.length)
   const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iColor: { value: cnfgColor.colorB},
      iRandMandalaChange: { value: configL01.randMandalaChange },
      iRandomA: { value: configL01.randomMandA },
      iRandomB: { value: configL01.randomMandB },
      iRandomC: { value: configL01.randomMandC },
      iRandomD: { value: configL01.randomMandNoiseD },
      map: { value: texture }
    }
  }
  
  star(){
   const radius = .2
   const cloneA = new THREE.CircleBufferGeometry(radius, 3);
   cloneA.translate(0,0,.2)
   const array = cloneA.attributes.position.array
   array[3] = 0
   array[7] = 0
   const cloneB = cloneA.clone()
   cloneB.rotateX(Math.PI * 3)
   const triangle = mergeGeometries([cloneA, cloneB])
   triangle.translate(radius/2, 0, 0)
   const cloneC = triangle.clone()
   cloneC.rotateZ(Math.PI)
   const romb = mergeGeometries([cloneC, triangle])
   const cloneD = romb.clone()
   romb.translate(radius*2-.1,0,0)
   cloneD.translate(-radius*2+.1,0,0)
   const doubleA = mergeGeometries([cloneD, romb])
   const doubleB = doubleA.clone()
   doubleB.rotateZ((Math.PI*2)/6)
   const doubleC = doubleB.clone()
   const doubleD = doubleC.clone()
   doubleD.rotateZ((Math.PI*2)/6)
   const mandala = mergeGeometries([doubleA, doubleB, doubleC, doubleD ])
   return mandala
  }
  
  
  display(){
    const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsRamka,
    fragmentShader: fsArr[3],
    //fragmentShader: fsRamka,
    depthTest: true,
    transparent: true,
    vertexColors: true,
    side: THREE.DoubleSide
  })
    const s = .5;
    const a = new THREE.PlaneGeometry(s, s/2);
    const b = a.clone()
    b.translate(s, 0, 0)
    b.rotateY(Math.PI)
    const m = mergeGeometries([a, b])
    const arr = []
    const l = 5
     for(let i=0; i < l; i++){
      const c = m.clone()
      c.translate(s*i*2,0,0)
      arr.push(c)
     }
    const lU = mergeGeometries(arr)
    const centr = -((s*l)/2+s)
    lU.translate(centr, s/4, 0)
    const lD = lU.clone()
    lD.rotateZ(Math.PI )
    lD.translate(0,-0,0)
    
    const tr = 3
    const mU = mergeGeometries([lU, lD])
    const mD = mU.clone()
    mD.translate(0,-tr,0)
    mU.translate(0,tr,0)
    
    const merge = mergeGeometries([mU, mD])
    const meshA = new THREE.Mesh(merge, mat)
    meshA.scale.x = 1.2
    const meshB = meshA.clone()
    meshB.rotation.z = Math.PI/2
    const group = new THREE.Group()
    
    group.add(meshA, meshB)
    group.position.z = 1
   // scene.add(group)
    
    const geoStar = this.star()
    const mandala = new THREE.Mesh(geoStar, mat)
    mandala.scale.x = .61
    mandala.scale.y = .61
    mandala.scale.z = .61
    const sZ = .9
    const z = new THREE.CircleGeometry(sZ/2, 28);
    const mZ = new THREE.MeshBasicMaterial({
     color: 0x000000,
     roughness: 0.5,
     metalness: 0.5,
     side: THREE.DoubleSide,
    });

    const meshZ = new THREE.Mesh(z, mZ)
   
    meshZ.position.x = 2.95
    meshZ.position.y = 2.95
    meshZ.position.z = 1.1
    const meshY = meshZ.clone()
    meshY.position.x = -2.95
    meshY.position.y = 2.95
    meshY.position.z = 1.1
    const meshX = meshZ.clone()
    meshX.position.x = -2.95
    meshX.position.y = -2.95
    meshX.position.z = 1.1
    const meshM = meshZ.clone()
    meshM.position.x = 2.95
    meshM.position.y = -2.95
    meshX.position.z = 1.1
    
    const box = new THREE.Group()
    box.add(meshZ, meshY, meshX, meshM)
    
   // scene.add(box)
    
    return mandala
  }
}
