import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsHouse, vsHouse } from '.././shaders/house.js'
import { fsRamka, vsRamka } from '.././shaders/ramka.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';

export class House {
  constructor(){
   const randPh = Math.floor(Math.random() * configL01.arrPh.length)
   const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iColor: { value: cnfgColor.colorA },
      iRandMandalaChange: { value: configL01.randMandalaChange },
      iRandomA: { value: configL01.randomMandA },
      iRandomB: { value: configL01.randomMandB },
      iRandomC: { value: configL01.randomMandC },
      iRandomD: { value: configL01.randomMandNoiseD },
      map: { value: texture }
    }
  }
  
  wall(){
   
   
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
  const s = .4;
   
  const a = new THREE.PlaneGeometry(s, s*4);
  const b = a.clone()
  b.translate(s, 0, 0)
  b.rotateY(Math.PI)
  const m = mergeGeometries([a, b])
  const arr = []
  const l = 7
  for (let i = 0; i < l; i++) {
   const c = m.clone()
   c.translate(s * i * 2, 0, 0)
   arr.push(c)
  }
  const wU = mergeGeometries(arr)
  
  const wD = wU.clone()
  wD.rotateX(Math.PI)
  wD.translate(0, -s*2, 0.)
  wU.translate(0, s*2, 0.)
  const wallLeft = mergeGeometries([wD, wU])

  wallLeft.rotateZ(Math.PI /2)
  wallLeft.rotateY(Math.PI /2)
  wallLeft.translate(-2.8, -2.2, -3)
  
  
  const cloneA = wallLeft.clone()
  cloneA.translate(2.8*2, 0, 0)
  const cloneC = mergeGeometries([cloneA, wallLeft])
  const cloneD = cloneC.clone()
  cloneD.rotateZ(Math.PI/2)
  const ramka = mergeGeometries([cloneC, cloneD])
  
  const geosArr = []
  const count = 50
  for (let i = 0; i < count; i++) {
   const clone = ramka.clone()
   clone.translate(0, 0, -10 * i)
   geosArr.push(clone)
  }
  const merge = mergeGeometries(geosArr)
  const mesh = new THREE.Mesh(merge, mat)

//  scene.add(mesh)
    /*
    const geoA = new THREE.PlaneGeometry(6, 3);
    const geoB = new THREE.PlaneGeometry(6, 3);
    geoA.scale(1,-1,1)
    geoA.translate(0, 1.5, 0)
    geoB.translate(0, -1.5, 0)
    const geometryR = mergeGeometries([geoA, geoB])
    geometryR.rotateY(Math.PI / 2)
    
    const geometryL = geometryR.clone()
    geometryR.translate(3,0,-2.0)
    geometryL.translate(-3,0,-2.0)
    const geometryH = mergeGeometries(
     [geometryR, geometryL]
     )
    const geometryV = geometryH.clone()
    geometryV.rotateZ(Math.PI / 2) 
    const geometry = mergeGeometries(
         [geometryH, geometryV]
    )
    
    
    const meshTest = new THREE.Mesh(merge, mat)
    scene.add(meshTest)
    */
  }
}
