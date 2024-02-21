// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'
import { fsPolice, vsPolice } from '../shaders/police.js'
import { cnfgColor, configL01 } from './constants.js'
import Pool from './Pool.js'

export default class Police {

  constructor({ boundsExtent, policeCount }) {

    this.boundsExtent = boundsExtent
    this.location = new THREE.Vector3(1.0, 1.0, 0.0)
    this.count = policeCount;
    this.acceleration = new THREE.Vector3(0.0, -0.0005)
    this.police
    this.lifespan = 1
    this.uniforms = {
      iTime: { value: 1.0 },
      iResolution: { value: new THREE.Vector3(1.0, 1., 1.) },
      iOpacity: { value: 1.0 },
      iMixcolA: { value: cnfgColor.policemanA },
      iMixcolB: { value: cnfgColor.policemanB },
      toggle: { value: configL01.toggle },
      'time': { value: 1.0 },
      sineTime: { value: 1.0 }
    }
const texture = new THREE.TextureLoader().load( './textures/musor.png' )
     this.uniformsB = {
       'map': { value: texture },
       'time': { value: 0.0 }
     }

  }

  update(dt) {

    const posPolice = this.police.geometry.attributes.translate

    for (let i = 0; i < this.count; i++) {

      const data = this.police.geometry.data[i]

      if (data.policeInTheClubFlag) {
        posPolice.array[i * 3 + 0] += data.velocity.x
        posPolice.array[i * 3 + 1] += data.velocity.y

        if (
          Math.abs(posPolice.array[i * 3 + 0]) > this.boundsExtent
        ) {
          data.velocity.x = -data.velocity.x
          data.velocity.y = data.velocity.y
        }
        if (
          Math.abs(posPolice.array[i * 3 + 1]) > this.boundsExtent
        ) {
          data.velocity.x = data.velocity.x
          data.velocity.y = -data.velocity.y
        }
      }
      /*
      if(!data.policeInTheClubFlag){
        posPolice.array[i * 3 + 0] += 0
        posPolice.array[i * 3 + 1] += 0
      }
      */
    }

    posPolice.needsUpdate = true

  }

  display() {

    const planeGeometry = new THREE.PlaneGeometry(.6, .6)
    const circleGeometry = new THREE.CircleGeometry(.6, 32)
    const geometry = new THREE.InstancedBufferGeometry()
    geometry.data = []
    geometry.index = planeGeometry.index;
    geometry.attributes = planeGeometry.attributes;

    const translateArray = new Float32Array(this.count * 3)
    const colorArray = new Float32Array(this.count * 3)
    const healthArray = new Float32Array(this.count * 1)
    /*
    const countVelocity = .1
    const halfVelocity = countVelocity / 2
    const countTranslate = 5
    const halfTranslate = countTranslate / 2
    const emitterOffset = 5
    */
    for (let i = 0; i < this.count; i++) {

      const x = 10//this.boundsExtent //i * countTranslate + (countTranslate + emitterOffset)
      const y = 0
      const z = 0

      const r = 1.
      const g = 0
      const b = 0

      translateArray[i * 3 + 0] = x
      translateArray[i * 3 + 1] = y
      translateArray[i * 3 + 2] = z

      colorArray[i * 3 + 0] = r;
      colorArray[i * 3 + 1] = g;
      colorArray[i * 3 + 2] = b;

      healthArray[i * 1 + 0] = 1.0

      geometry.data.push({
        velocity: new THREE.Vector3(
          0,
          0,
          0),
        velEmitter: new THREE.Vector3(
          0,
          0,
          0),
        policeInTheClubFlag: false,
        policeInTheClubCount: 0,
        collidingToogle: true,
        index: i,
      });

    }

    geometry.setAttribute('translate', new THREE.InstancedBufferAttribute(translateArray, 3));
    geometry.setAttribute('color', new THREE.InstancedBufferAttribute(colorArray, 3));
    geometry.setAttribute('health', new THREE.InstancedBufferAttribute(healthArray, 1))

    //const texture = new THREE.TextureLoader().load('./textures/alpha.jpg')
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniformsB,
      vertexShader: vsPolice,
      fragmentShader: fsPolice,
      depthTest: true,
      depthWrite: true,
      transparent: true,
      vertexColors: true,
    });

    this.police = new THREE.Mesh(geometry, material);
    this.police.guard = {
      inTheClub: false,
      size: 2,
      inTheClubArray: [],
      killFlag: null,
      //inTheClubCount: 0,
    }

    scene.add(this.police);

    this.pool = new Pool(this.count)
    for (let i = 0; i < this.count; i++) {
      this.pool.spawn()
    }

    return this.police
  }
  /*
  remove(police){
    //console.log(police)
    scene.remove(police)
  }
  */
}