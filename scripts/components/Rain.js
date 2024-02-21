import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'
import { fsRain, vsRain } from '.././shaders/rain.js'

export class Rain {
  constructor(tunnelMeshes, tunnelData) {
    this.points
    this.tunnelData = tunnelData
    this.tunnelMeshes = tunnelMeshes
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolA: { value: cnfgColor.rainA },
      iMixcolB: { value: cnfgColor.rainB },
    }
    this.position = []
    const count = 11
    const offset = .75
    const posOffset = offset*count/2-(offset/2)
    for (let i = 0; i < count; i++) {
      this.position.push(
        i * offset - posOffset,
        Math.random() * 10 - 5,
        0
      )
    }
  }

  randTime() { 
    return 1.0
  }

  setParam() {
    const data = {
      velocity: new THREE.Vector3(.0, .0, .0),
      time: 1,
      dead: false
    }
    return data
  }

  createRain(){
    //this.setVelocity(this.data)
    const PARTICLE_SIZE = configL01.masonSize * 5
    const geometry = new THREE.BufferGeometry()
    const sizes = []
    const colors = []
    
    const offset = .75
    
    const velocity = []
  // PARTICLE_SIZE
    
    const length = this.position.length
    const velOffset = 0.05
    for (let i = 0; i < this.position.length; i++) {
      sizes.push(
        PARTICLE_SIZE
      )
      colors.push(1, 1, 1)
      velocity.push(
        Math.random()*0.05+velOffset,
        Math.random()*0.05+velOffset,
        Math.random()*0.0+velOffset
        )
    }

    geometry.attributes.color = new THREE.Float32BufferAttribute(colors, 3)
    geometry.attributes.position = new THREE.Float32BufferAttribute(this.position, 3)
    geometry.attributes.size = new THREE.Float32BufferAttribute(sizes, 1)
    geometry.attributes.velocity = new THREE.Float32BufferAttribute(velocity, 3)
    
    //console.log(geometry.attributes)
    const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsRain,
    fragmentShader: fsRain,
    depthTest: false,
    //depthMode: THREE.AlwaysDepth,
    transparent: true,
    vertexColors: true,
    
  })
  /*
   const ptexture = new THREE.TextureLoader().load('./textures/romb.png')
        const pMaterial = new THREE.PointsMaterial({
          //color: 0x303131,
          size: PARTICLE_SIZE*.5,
          //blending: THREE.AdditiveBlending,
          depthTest: true,
          depthWrite: true,
          transparent: true,
          sizeAttenuation: false,
          vertexColors: true,
          alphaMap: ptexture,
        });
  */
  
    const points = new THREE.Points(geometry, mat)
    points.position.x -=.20
    points.renderOrder = 1
    return points
  }
  
  addRain(){
    const rain = this.createRain()
    return rain
  }
  
}
