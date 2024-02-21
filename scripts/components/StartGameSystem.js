//console.log('chek')import Police from './Police.js'
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'

export default class StartGameSystem {
  
  constructor({policeCount, dancerCount}){
    this.policeCount = policeCount
    this.dancerCount = dancerCount
    this.countVelocity = .1
    this.halfVelocity = this.countVelocity / 2
    this.countTranslate = 5
    this.halfTranslate = this.countTranslate / 2
    this.emitterOffset = 5
    this.guardFirstChek = true
  }
  
  update({startGame}, gameOverClass, police, dancer){
    //  console.log(
    //    'police.guard.inTheClub', police.guard.inTheClub, 
    //    )
      
    //console.log(police.guard.inTheClubArray.length)
    const posPolice = police.geometry.attributes.translate.array
    const dataPolice = police.geometry.data
    const helPolice = police.geometry.attributes.health.array
    const posDancer = dancer.geometry.attributes.translate.array
    const dataDancer = dancer.geometry.data
    const helDancer = dancer.geometry.attributes.health.array
    
    if(startGame==false){
      gameOverClass.classList.remove('game-over_opened')
      if(this.guardFirstChek == true){
        police.guard.inTheClub = false
        this.guardFirstChek = false
      }
      police.guard.inTheClubArray = []
      for (let i = 0; i < this.policeCount; i++) {

      }

    } else if(startGame==true){
      gameOverClass.classList.add('game-over_opened')
 
      for (let i = 0; i < this.policeCount; i++) {
       
       const x = i * this.countTranslate + (this.countTranslate + this.emitterOffset)
       const y = 0
       const z = 0

       posPolice[i * 3 + 0] = x
       posPolice[i * 3 + 1] = y
       helPolice[i * 1 + 0] = 1

      //police.guard.inTheClub = false
      //dataPolice[i].policeInTheClubFlag = false
        
      }

      for (let i = 0; i < this.dancerCount; i++) {
        posDancer[i * 3 + 0] = 0
        posDancer[i * 3 + 1] = 0
        helDancer[i * 1 + 0] = 1
      }
      
    }
  }
  
  generatePolice(police, {guardSize}){
    this.guardFirstChek = true
    const posPolice = police.geometry.attributes.translate.array
    const dataPolice = police.geometry.data
    police.guard.inTheClubArray = []
    police.guard.inTheClubCount = 0
    police.guard.size = guardSize
    //console.log(police.guard.size)
    for (let i = 0; i < this.policeCount; i++) {
      dataPolice[i].policeInTheClubFlag = false
      dataPolice[i].velocity.x = Math.random() * this.countVelocity - this.halfVelocity
      dataPolice[i].velocity.y = Math.random() * this.countVelocity - this.halfVelocity
    }
  }
}
