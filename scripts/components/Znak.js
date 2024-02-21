import * as THREE from '.././lib/three.module.js'
import { cnfgColor, configL01 } from './constants.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';

export class Znak {
  
  constructor(tunnelMeshes, tunnelData) {
    

    this.points
    
    this.tunnelData = tunnelData
    this.tunnelMeshes = tunnelMeshes
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolA: { value: cnfgColor.mandalaA },
      iMixcolB: { value: cnfgColor.mandalaB },
//      iChannel0: { value: texture },
        }
  }

  addZnak() {
    
const loader = new THREE.TextureLoader();
const texture = loader.load('../textures/mandala.jpg');
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;  

    //this.setVelocity(this.data)
    const PARTICLE_SIZE = 8
    const position = [0, 0, 10]
    const geometry = new THREE.BufferGeometry()
    const sizes = [20]
    const colors = [1., 1., 1.]

    geometry.attributes.color = new THREE.Float32BufferAttribute(colors, 3)
    geometry.attributes.position = new THREE.Float32BufferAttribute(position, 3)
    geometry.attributes.size = new THREE.Float32BufferAttribute(sizes, 1)
    //console.log(geometry.attributes)
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      //vertexShader: vsMandala,
      //fragmentShader: fsMandala,
      //blending: THREE.MaxEquation,
      depthTest: false,
      transparent: true,
      vertexColors: true
    })

    const pMaterial = new THREE.PointsMaterial({
      color: "green",
      size: PARTICLE_SIZE,
      //blending: THREE.MaxEquation,
      depthTest: false,
      transparent: true,
      //sizeAttenuation: false,
      //vertexColors: true,
      alphaMap: texture,
    })
    this.points = new THREE.Points(geometry, pMaterial)
    //point.position.z = -1
    //console.log(point)
    //scene.add(this.points)
    return this.points
    
  }
  

}
