import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsFractal, vsFractal } from '.././shaders/fractal.js'
//import { fsKale } from '.././shaders/fsShaders.js'

export class Fractal {
  constructor(){
   const randPh = Math.floor(Math.random()*configL01.arrPh.length)
   const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolB: { value: cnfgColor.borderA },
      iMixcolA: { value: new THREE.Vector3(1.0, 1., 1.)  },
      map: { value: texture },
      iColor: { value: cnfgColor.colorA },
      iRandomKale: { value: configL01.randomKale },
      iRandomA: { value: configL01.randomMandA },
      iRandomB: { value: configL01.randomMandB },
      iRandomC: { value: configL01.randomMandC },
      iRandomD: { value: configL01.randomMandNoiseD },
    }
  }
  addFractal(){
    const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsFractal,
    fragmentShader: fsFractal,
    depthTest: true,
    transparent: true,
    vertexColors: true,
  })
    const group = new THREE.Group()
    const geometry = new THREE.PlaneBufferGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, mat);
    plane.position.z = -0.1
    
  // scene.add(plane)
  }
}
