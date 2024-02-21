import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsMandala, vsMandala } from '.././shaders/mandala.js'
import { fsFractal, vsFractal } from '.././shaders/fractal.js'
import { fsArr } from '.././shaders/fsShaders.js'
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';

export class Mandapix {
  constructor(){
   const randPh = Math.floor(Math.random() * configL01.arrPh.length)
   const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iColor: { value: cnfgColor.colorA},
      iRandMandalaChange: { value: configL01.randMandalaChange },
      iRandomA: { value: configL01.randomMandA },
      iRandomB: { value: configL01.randomMandB },
      iRandomC: { value: configL01.randomMandC },
      iRandomD: { value: configL01.randomMandNoiseD },
      map: { value: texture }
    }
  }
  display(){
    const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsMandala,
    //fragmentShader: fsArr[3],
    fragmentShader: fsMandala,
    depthTest: true,
    transparent: true,
    vertexColors: true,
    side: THREE.DoubleSide
  })
    const s = 6.2
    const sd = s/2
    const m = 100
    const geometryR = new THREE.PlaneGeometry(s*m, s);
    const geometryU = new THREE.PlaneGeometry(s, s*m);
    geometryU.rotateX(Math.PI / 2)
    const geometryD = geometryU.clone()
    geometryR.rotateY(Math.PI / 2)
    const geometryL = geometryR.clone()
    geometryR.translate(sd, 0, -2.0)
    geometryL.translate(-sd, 0, -2.0)
    geometryU.translate(0, sd, -2.0)
    geometryD.translate(0, -sd, -2.0)
    const geometry = mergeGeometries(
         [geometryR, geometryL]
    )
    geometry.translate(0, 0, -s*m/2)
    const meshA = new THREE.Mesh(geometry, mat)
    meshA.position.z -=0.1
    const meshB = meshA.clone()
    meshB.rotation.z = Math.PI/ 2
    //scene.add(meshA)
    //scene.add(meshB)
    
    
  }
}
