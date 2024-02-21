import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { fsWall, vsWall } from '.././shaders/wall.js'
import { fsPolice, vsPolice } from '.././shaders/police.js'
import { cnfgColor, configL01 } from './constants.js'

export class Wall {
  constructor() {
  
  const texture = new THREE.TextureLoader().load('./textures/photo01.jpg')
  this.uniformsB = {
   'map': { value: texture },
   'time': { value: 0.0 },
   iTime: { value: 1.0 },
  }
  
    this.uniforms = {
  iTime: { value: 1.0 },
  iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
  iOpacity: { value: 1.0 },
  iMixcolB: { value: cnfgColor.wallA },
  iMixcolA: { value: cnfgColor.wallA },
   }    
   this.point
   this.PARTICLE_SIZE = configL01.masonSize * 5
  }

createWall(){
  
}

createPoint () {
  const circle = new THREE.CircleBufferGeometry( 5, 32 )

  const length = 40//circle.attributes.position.array.length
  const posArr = circle.attributes.position.array
  
  const position = []
  const geometry = new THREE.BufferGeometry()
  const sizes = []
  const colors = []
  let offset = 0.5
  const posOffset = 10
  let horisontOffset = 0
  
  for(let i = 0; i<length; i++){
    for(let j = 0; j<length; j++){
    if(i%2==0){
      horisontOffset = 0.25
    } else {
      horisontOffset = 0
    }
    position.push(
      i * offset - posOffset,
      j * offset - posOffset+horisontOffset,
      0
    )
    }
  }

  for(let i = 0; i<position.length; i++){
    sizes.push(
      this.PARTICLE_SIZE
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
    vertexShader: vsWall,
    fragmentShader: fsWall,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    transparent: true,
    vertexColors: true
  })

  
  this.point = new THREE.Points(geometry, mat)
  
  scene.add(this.point)
  
}

addWall (){
  const group = new THREE.Group()
  const points = this.createPoint()
  return points
  }
  
display() {

 const circleGeometry = new THREE.CircleGeometry(.6, 30);
 const planeGeometry = new THREE.PlaneGeometry(.6, .6);
 circleGeometry.rotateZ(Math.PI / 2)
 const geometry = new THREE.InstancedBufferGeometry();
 geometry.index = planeGeometry.index;
 geometry.attributes = planeGeometry.attributes
 geometry.data = []

 const translateArray = new Float32Array(this.count * 3);
 const colorArray = new Float32Array(this.count * 3);
 const healthArray = new Float32Array(this.count * 1);
 const countV = .01
 const halfV = countV / 2
 const countT = 7.5
 const halfT = countT / 2

 for (let i = 0; i < this.count; i++) {

  const x = Math.random() * countT - halfT
  const y = Math.random() * countT - halfT
  const z = 0

  const r = 0
  const g = 1
  const b = 0

  translateArray[i * 3 + 0] = x;
  translateArray[i * 3 + 1] = y;
  translateArray[i * 3 + 2] = z;

  colorArray[i * 3 + 0] = r;
  colorArray[i * 3 + 1] = g;
  colorArray[i * 3 + 2] = b;

  healthArray[i * 1 + 0] = 1.0

  geometry.data.push({
   velocity: new THREE.Vector3(
    Math.random() * countV - halfV,
    Math.random() * countV - halfV,
    0),
   numConnections: 0,
   position: new THREE.Vector3(x, y, z),
   random: Math.random(),
   lifespan: 1.0,
   collidingToogle: true,
  });

 }

 geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3))
 geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3))
 geometry.setAttribute('health', new THREE.InstancedBufferAttribute(healthArray, 1))

 //const texture = new THREE.TextureLoader().load( './textures/alpha.jpg' )

 const material = new THREE.RawShaderMaterial({
  uniforms: this.uniformsB,
  vertexShader: vsPolice,
  fragmentShader: fsPolice,
  depthTest: true,
  depthWrite: true,
  transparent: true,
  vertexColors: true,
 });

 this.dancer = new THREE.Mesh(geometry, material);
 /*
 const sphere = new THREE.SphereGeometry(4);
 const object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
 const box = new THREE.BoxHelper(object, 0xffff00);
 scene.add(box);
 */
 scene.add(this.dancer);
 return this.dancer
}
  
}
