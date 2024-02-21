// @ts-check
import * as THREE from '../lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls, container, onWindowResize } from './render.js'

class ArrangeArray {
  constructor() {
    
  }
  
  arrange(attribute) {
  
    let arrayPos = attribute.position.array
    const numberOfPasses = 7
    const temporaryArray = []
    let arrangeArr = []
    let yCoordinateArray = []
    let minimumY

    for (let i = 0; i < numberOfPasses; i++) {
      // отбираю координаты по Y
      if (yCoordinateArray.length == 0) {
        for (let i = 0; i < arrayPos.length; i += 3) {
          yCoordinateArray.push(arrayPos[i + 1])
        }
      }
      
      // вычисляю минимальное значение по Y в одном ряду
      minimumY = Math.min(...yCoordinateArray)
      // console.log(minimumY)
      // добавляю отобранные минимальные значения ряда в отборный массив

      for (let i = 0; i < arrayPos.length; i += 3) {
        if (arrayPos[i + 1] == minimumY) {
          arrangeArr.push(
            arrayPos[i + 0],
            arrayPos[i + 1],
            arrayPos[i + 2]
          )
        }
      }
      // удаляю отобранные координаты из временного массива
      let clearedMinArr = yCoordinateArray.filter(function(number) {
        return number != minimumY
      })
      yCoordinateArray = []
      for (let i = 0; i < clearedMinArr.length; i++) {
        yCoordinateArray.push(clearedMinArr[i])
      }
    }

 this.addTestPpoints(arrangeArr, attribute)
  }  
  
  addTestPpoints(arrangeArr, attribute){
    
  let color = []
  const length = attribute.position.array.length
  let newccc = this.lineralColor(color, length, arrangeArr)
 
  let masonColorArr = attribute.color.array
  let masonPositionArr = attribute.position.array
  
  for(let i=0; i < length; i+=3){
    masonPositionArr[i + 0] = arrangeArr[i + 0]
    masonPositionArr[i + 1] = arrangeArr[i + 1]
    masonPositionArr[i + 2] = arrangeArr[i + 2]
    
    masonColorArr[i + 0] = newccc[i + 0]
    masonColorArr[i + 1] = newccc[i + 1]
    masonColorArr[i + 2] = newccc[i + 2]
   }
   
  }

lineralColor(color, length, arrayposition) {
let coolY = new THREE.Vector3( )
 for (let i = 0; i < length; i++) {
    color.push(.0, 0.0, 0.0)
  } 

for(let i=0; i < length; i+=3){
 const prevY = arrayposition[i - 2]
 const currY = arrayposition[i + 1]
 const nextY = arrayposition[i + 4]
 
 if(prevY == currY ) {
 // console.log('coincidence')
 color[i + 0] = coolY.x
 color[i + 1] = coolY.y
 color[i + 2] = coolY.z
 color[i - 1] = coolY.z
 color[i - 2] = coolY.y
 color[i - 3] = coolY.x
 } 
 else {
   coolY = new THREE.Vector3(
     Math.random(), 
     Math.random(), 
     Math.random() 
  )}
}

 return color
}

}