import * as THREE from './lib/three.module.js'
import { THREEx } from './lib/threex.domevents.js'
import { OrbitControls } from './lib/OrbitControls.js'
import { mergeGeometries } from './lib/BufferGeometryUtils.js';
import { setupScene, onWindowResize, scene, camera, renderer, light, directionalLight, controls, container } from './components/render.js'
import { Animated } from './components/Animated.js'
import { Wall } from './components/Wall.js'
import { Fractal } from './components/Fractal.js'
import { Dancer } from './components/Dancer.js'
import { Mandapix } from './components/Mandapix.js'
import { Mandacenter } from './components/Mandacenter.js'
import { House } from './components/House.js'
import { Ramka } from './components/Ramka.js'
import { AngleBox } from './components/AngleBox.js'
import { FractBox } from './components/FractBox.js'
import { Cubes } from './components/Cubes.js'
import { Controller } from './components/Controller.js'
import { CollisionSystem } from './components/CollisionSystem.js'

import { configL01, cnfgColor, BPM, globalAudioContext } from './components/constants.js'
import { fsBody, vsBody } from './shaders/body.js'
import { fsArr } from './shaders/fsShaders.js'


// const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
// const cube = new THREE.Mesh( geometry, material ); 
// scene.add( cube );
// cube.position.x = 1

const barBotton = document.querySelector('.bar-bottom')
const navigator = {
 up: barBotton.querySelector('.up'),
 left: barBotton.querySelector('.left'),
 right: barBotton.querySelector('.right'),
 down: barBotton.querySelector('.down'),
}

const score = document.querySelector('.score')
const quanity = score.querySelector('.quanity')

const randPh = Math.floor(Math.random() * configL01.arrPh.length)
const texture = new THREE.TextureLoader().load(configL01.arrPh[randPh])

const gameOver = document.querySelector('.game-over')
const gameOverResume = document.querySelector('.game-over__resume')
const gameOverTitle = document.querySelector('.game-over__title')

gameOverResume.addEventListener(
  "click",
  function() {
    gameConfig.score = 0
    quanity.textContent = gameConfig.score
    gameConfig.health = 1
    gameConfig.pause = false
    gameOver.classList.remove('game-over_opened')
  } 
 )

window.addEventListener('resize', () => {
  onWindowResize();
  });
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

let animated
let globalClock, scoreClock, bassClock, kickClock, reverbClock
let globalTime, scoreTime, segmentTime, bassTime, kickTime, reverbTime
let fractal, fractalMesh
let saturation = 0

const uniforms = {
 iTime: { value: 1.0 },
 iResolution: { value: new THREE.Vector3(1., 1., 1.) },
 iColor: { value: cnfgColor.colorA },
 iRandMandalaChange: { value: configL01.randMandalaChange },
 iRandomA: { value: configL01.randomMandA },
 iRandomB: { value: configL01.randomMandB },
 iRandomC: { value: configL01.randomMandC },
 iRandomD: { value: configL01.randomMandNoiseD },
  map: { value: texture },
 iRandRamkaStrun: { value: configL01.randRamkaStrun },
 iRandRamkaChange: { value: configL01.randRamkaChange },
}

const uniformsBody = {
 iTime: { value: 1.0 },
 iResolution: { value: new THREE.Vector3(1., 1., 1.) },
 iColor: { value: cnfgColor.colorA },
 map: { value: texture },
 center: { value: null },
}
//
const rabbitGroup = new THREE.Group()
const rGroup = new THREE.Group()

const ramkaURLs = [
  'asset/ramka01.json',
 ]

const bodyURLs = [
  'asset/body01.json',
 ]

const hairURLs = [
  'asset/hair/hair02.json',
  /*
  'asset/hair/hair02.json',
  'asset/hair/hair03.json',
  'asset/hair/hair04.json',
  'asset/hair/hair05.json',
  'asset/hair/hair06.json',
  'asset/hair/hat01.json',
  'asset/hair/corona01.json',
  'asset/hair/cap01.json',
  */
 ]
 
const eyesURLs = [
  'asset/eyes/eyes02.json',
  /*
  'asset/eyes/eyes02.json',
  'asset/eyes/eyes03.json',
  'asset/eyes/eyes04.json',
  'asset/eyes/eyes05.json',
  'asset/eyes/eyes06.json',
  'asset/eyes/eyes07.json',
  */
 ]

const lipsURLs = [
  'asset/lips/lips02.json',
  /*
  'asset/lips/lips02.json',
  'asset/lips/lips03.json',
  'asset/lips/lips04.json',
  'asset/lips/lips05.json',
  'asset/lips/lips06.json',
  'asset/lips/lips07.json',
  'asset/lips/lips08.json',
  */
 ]
 
const rObj = {
 ramka: null,
 body: null,
 hair: null,
 eyes: null,
 lips: null,
}

const masonObj = {
 kapshon: null,
 telo: null,
 veki: null,
 glaza: null,
}

const mason = new THREE.Group()

async function add3dObjects(){
 const mng = new THREE.LoadingManager();
 const loader = new THREE.ObjectLoader(mng)
 
const shaderBackground = new THREE.ShaderMaterial({
  uniforms: uniformsBody,
  vertexShader: vsBody,
   fragmentShader: fsArr[1],
  //blending: THREE.AdditiveBlending,
  depthTest: true,
  transparent: false,
  side: THREE.DoubleSide,
})

const shaderKapshon = new THREE.ShaderMaterial({
  uniforms: uniformsBody,
  vertexShader: vsBody,
  fragmentShader: fsArr[8],
  depthTest: true,
  side: THREE.DoubleSide,
})

const shaderVeki = new THREE.ShaderMaterial({
 uniforms: uniformsBody,
 vertexShader: vsBody,
 fragmentShader: fsArr[6],
 depthTest: true,
 side: THREE.DoubleSide,
})

const shaderTelo = new THREE.ShaderMaterial({
 uniforms: uniformsBody,
 vertexShader: vsBody,
 fragmentShader: fsArr[7],
 depthTest: true,
 side: THREE.DoubleSide,
})

const shaderRot = new THREE.ShaderMaterial({
 uniforms: uniformsBody,
 vertexShader: vsBody,
 fragmentShader: fsArr[5],
 depthTest: true,
 side: THREE.DoubleSide,
})

const shaderLob = new THREE.ShaderMaterial({
 uniforms: uniformsBody,
 vertexShader: vsBody,
 fragmentShader: fsArr[4],
 depthTest: true,
 side: THREE.DoubleSide,
})

masonObj.kapshon = await loader.loadAsync('models/mason/kapshon.json')
masonObj.kapshon.material = shaderKapshon

masonObj.veki = await loader.loadAsync('models/mason/veki.json')
masonObj.veki.material = shaderTelo

masonObj.lob = await loader.loadAsync('models/mason/lob.json')
masonObj.lob.material = shaderTelo

masonObj.rot = await loader.loadAsync('models/mason/rot.json')
masonObj.rot.material = shaderTelo

masonObj.telo = await loader.loadAsync('models/mason/telo.json')
masonObj.telo.material = shaderRot

masonObj.rot = await loader.loadAsync('models/mason/rot.json')
masonObj.rot.material = shaderRot

mason.add(masonObj.rot)
mason.add(masonObj.telo)
mason.add(masonObj.lob)
mason.add(masonObj.veki)
mason.add(masonObj.kapshon)
mason.rotation.y = Math.PI/2+Math.PI 
mason.position.z = 40
mason.scale.set(0.3,0.3,0.3)

scene.add(mason)

//BACKGROUND 
const bgScale = 50
const geometry = new THREE.PlaneGeometry(bgScale, bgScale);
const geo2 = geometry.clone()
geometry.translate(-bgScale/2, 0, 0)
geo2.rotateY(Math.PI)
geo2.translate(bgScale/2, 0, 0)
const merge = mergeGeometries([geometry, geo2])
merge.translate(0,0,-3)
const plane = new THREE.Mesh(merge, shaderBackground);
scene.add(plane);

//BACKGROUND 
}
add3dObjects()

const loaderClass = document.querySelector('.loading')
loaderClass.classList.remove('loading_opened');

function init() {
  setupScene()
}

const gameConfig = {
  health: 1,
  score: null,
  startGame: true,
  center: 0,
  pause: false,
}

const animateConfig = {
 velocity: new THREE.Vector3(0.1, 0.1, 0.1),
 rotate: 0.1,
}

const tunnelConfig={
 distance: 2,
 numObjects: 10,
 get range() { return this.distance * this.numObjects - this.distance },
}

const cubesConfig = {
 distance: 3,
 numObjects: 1,
}

const countCubes = cubesConfig.numObjects
const startGame = gameConfig.startGame
const collisionSystem = new CollisionSystem(countCubes, startGame)

const cubes = new Cubes(cubesConfig)
const cubesMesh = cubes.display()
const angleBox= new AngleBox(tunnelConfig)
const angleBoxMesh = angleBox.display()
const fractBox = new FractBox(tunnelConfig)
const fractBoxMesh = fractBox.display()

const tunnelFirst = new THREE.Group()
tunnelFirst.add(fractBoxMesh, angleBoxMesh)
tunnelFirst.position.z = 15
const tunnelSecond = tunnelFirst.clone()
const tunnelThird = tunnelFirst.clone()
const tunnelFourth = tunnelFirst.clone()

scene.add(tunnelFirst)
 
const dancer = new Dancer(gameConfig)
const dancMesh = dancer.display()

const mandapix = new Mandapix()
mandapix.display()

const mandacenter = new Mandacenter()
const mandaCenMesh = mandacenter.display()
mason.add(mandaCenMesh)

const controller = new Controller(navigator)
controller.display(mason)

scene.add(mandaCenMesh)

const house = new House()
house.display()

const addAnimationClass = () => {
  animated = new Animated(animateConfig)
  globalClock = animated.addClock()
  scoreClock = animated.addClock()
  bassClock = animated.addClock()
  kickClock = animated.addClock()
  reverbClock = animated.addClock()
}
let startPlayer = true
let chekpoint = false

function animate() {
 
  globalTime = animated.getElapsedTime(globalClock)
  scoreTime = animated.getElapsedTime(scoreClock)
  
  if(scoreTime > 1 && !gameConfig.pause){
   scoreClock = animated.resetClock(scoreClock)
   quanity.textContent++
   gameConfig.score = quanity.textContent
  }
  
  collisionSystem.update(cubesMesh, mason, gameConfig, gameOverTitle)
  cubes.update()
  controller.update(mason, gameConfig)
  
 // console.log(gameConfig.health)
  
  if(gameConfig.health <= 0)
    gameOver.classList.add('game-over_opened')
    
  mandaCenMesh.rotation.z = globalTime 
  mandaCenMesh.position.x = mason.position.x
  mandaCenMesh.position.y = mason.position.y

  dancer.uniforms.iTime.value = globalTime*1.3
  mandapix.uniforms.iTime.value = globalTime*0.3

  mandacenter.uniforms.iTime.value = globalTime*1.3
  uniforms.iTime.value = globalTime*1.3
  uniformsBody.iTime.value = globalTime*1.3
  uniformsBody.center.value = gameConfig.center
  fractBox.uniforms.iTime.value = globalTime*1.3
  angleBox.uniforms.iTime.value = globalTime*1.3
  cubes.uniforms.iTime.value = globalTime*.2
  controls.update()
  
 	requestAnimationFrame(animate)
 	render()
	
}

function render() {
	
	renderer.render( scene, camera );

}

init()
addAnimationClass()
animate()
