import * as THREE from '.././lib/three.module.js'

export const BPM = 0.45;
export const globalAudioContext = new AudioContext()
const soundTon = Math.floor(1*200+350)

const iDMason = 1 * 1.+1.2
const iLength = 1 * 0.3
const iAsc = 1 * 0.5+0.2

const sat = 160
const add = 80
export const cnfgColor = {
  colorA: new THREE.Color(`hsl(${sat+add*1}, 100%, 100%)`),
  colorB: new THREE.Color(`hsl(${sat+add*2}, 100%, 50%)`),
  colorC: new THREE.Color(`hsl(${sat+add*3}, 100%, 50%)`),
  colorD: new THREE.Color(`hsl(${sat+add*2}, 100%, 50%)`),
  colorE: new THREE.Color(`hsl(${sat+add*5}, 100%, 50%)`),
  colorF: new THREE.Color(`hsl(${sat+add*7}, 100%, 50%)`),
  bodyHorrorA: new THREE.Color("hsl(170, 100%, 50%)"),
  bodyHorrorB: new THREE.Color("hsl(20, 100%, 50%)"),
  bodySmileA: new THREE.Color("hsl(160, 100%, 50%)"),
  bodySmileB: new THREE.Color("hsl(200, 100%, 50%)"),
  tunnSSmile: new THREE.Color("hsl(280, 100%, 50%)"),
  tunnSHorror: new THREE.Color("hsl(0, 100%, 100%)"),
}

const sprndm = Math.floor(1)
//const sprndm = Math.floor(7)


const arrNum = Math.floor(1)
const min = 24
const max = 172
const num = 12
export const configL01 = {
  camX: 0,
  camY: 0,
  camZ: 10,
  linewidth: 1/*window.innerHeight / 160*/,
  brainHealthWidth: window.innerHeight / 220,
  tubePoint: window.innerHeight / 40,
  maxPointsCount: 1,
  masonSize: window.innerHeight * 0.01,
  masonModuleSize: window.innerHeight / 11.1,
  randMandalaChange: Math.floor(Math.random()*2),
  randomMandA: Math.floor(Math.random()*2),
  randomMandB: Math.random()*20,
  randomMandC: Math.random()*20+2,
  randomMandNoiseD: Math.random()*50000+2000,
  randomKale: Math.floor(Math.random()*20+3),
  randRamkaStrun: Math.random()*5+.2,
  randRamkaChange: Math.floor(Math.random()*2),
  arrPh: [
   
      './textures/photo07.jpg',
      /*
      './textures/photo02.jpg',
      './textures/photo03.jpg',
      './textures/photo04.jpg',
      './textures/photo05.jpg',
      './textures/photo06.jpg',
      './textures/photo07.jpg',
      */
      ]
}