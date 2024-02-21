import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { fsBorderPoint, vsBorderPoint } from '.././shaders/borderPoint.js'
import { cnfgColor, configL01 } from './constants.js'

export class Border {
  constructor() {
    this.uniforms = {
  iTime: { value: 1.0 },
  iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
  iOpacity: { value: 1.0 },
  iMixcolB: { value: cnfgColor.borderA },
  iMixcolA: { value: cnfgColor.borderB },
   }    
   this.point
  }

createPoint () {
  const circle = new THREE.CircleBufferGeometry( 5, 32 )

  const length = circle.attributes.position.array.length
  const posArr = circle.attributes.position.array
  const PARTICLE_SIZE = configL01.masonSize * 3.7
  const position = []
  const geometry = new THREE.BufferGeometry()
  const sizes = []
  const colors = []
  
  for(let i = 0; i<length-4.0; i+=2){
    if (i>=2){
    position[i+0] = posArr[i+0],
    position[i+1] = posArr[i+1],
    position[i+2] = posArr[i+2]
    } else {
    //position[0] = posArr[3],
    //position[1] = posArr[4],
    //position[2] = posArr[5]  
    }
  }
  position.splice(0,3)
  //console.log(position)
  for(let i = 0; i<length-3; i++){
    sizes.push(
      PARTICLE_SIZE
      )
    colors.push(Math.random(), Math.random(), Math.random() )
  }
  geometry.attributes.color = new THREE.Float32BufferAttribute(colors, 3)
  geometry.attributes.position = new THREE.Float32BufferAttribute(position, 3)
  //geometry.attributes.position.normalized = true
  geometry.attributes.size = new THREE.Float32BufferAttribute(sizes, 1)
   //console.log(geometry.attributes)
  const mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: vsBorderPoint,
    fragmentShader: fsBorderPoint,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true
  })

  const pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: configL01.tubePoint,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    transparent: true,
    //sizeAttenuation: false,
    //vertexColors: true,
    //alphaMap: ptexture,
  })
  this.point = new THREE.Points(geometry, mat)
  //point.position.z = -1
  //console.log(point)
  return this.point
}

addBorder(){
  const group = new THREE.Group()
  const points = this.createPoint()
  return points
  }
  
}
