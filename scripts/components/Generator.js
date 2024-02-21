class Generator {
  constructor(countVH, limitL, offset){
    //////
this.v = createSymmetryRandArr()

//console.log(vertices2.length)
function createSymmetryRandArr(){
let newArray = []
let material2
let group = new THREE.Group()
let pointCloud
//создание алгоритма
let convertVectToFloat = []
//const offset = 0.9
const count = 2000
const offsetX = offset
const offsetY = offset
const objects = []

const objectsLeft = []
const objectsCenter = []
const arrayMerge = []
var H = countVH//5
var V = H*2+1
let arrCount = 0
///////////////
let clock = new THREE.Clock();
var offsets = []
let arrTest = []
let pos = []
let rot = []
let scl = []
let colors = []
let boxSize = []
let enemyIndex = [];
let mat4 = new THREE.Matrix4()
let dummy = new THREE.Object3D()
let counter = 0
let meshSize = 0.3

createRightObjects()
function createRightObjects() {
  const objectsRight = []
        for (let i = 0, l = H; i < l; i++) {
          for (let j = 0, l = V; j < l; j++) {
            const vectorChild = new THREE.Vector3()
            vectorChild.set(offsetX * i + offset, offsetY * j, 0.)
            objectsRight.push(vectorChild)
          }
        }
        randomizeObjects(objectsRight)
      }
      
function randomizeObjects(array) {  
  
  const length = array.length
  const limitLength = limitL
  let randArray = []
  for (let i = 0; i < length; i++){
    randArray.push(array[Math.ceil(Math.random()*length-1)])
  }
  // usage example:
  let colorsRight = []
  let count = 0
  let unique = randArray.filter(function onlyUnique(value, index, self) {
    let uniq = self.indexOf(value) === index
    count++
    return uniq
  })
  let splitCount = length - unique.length
  //console.log("length",unique.length/3)
  let newUnique = unique.slice(0, limitLength)
  //console.log(`newUnique ${newUnique.length}`)
  newUnique.forEach(function(item, index){
    colorsRight.push(
      Math.random() * 0,
      Math.random() * 1,
      Math.random() * 1
      )
  })
  mirrorObjects(newUnique, colorsRight)
}

function mergeArrays(arr){
        arr.forEach(function(val, index){
          arrayMerge.push(val)
        })
        arrCount++
        convertVectorToFloatArr(arrayMerge)
}    

function mirrorObjects(array, colors) {
 
   for (let i = 0; i < array.length; i++) {
    let groupRight = new THREE.Vector3(array[i].x, array[i].y, array[i].z)
    //let groupRight = array[i].clone()
    groupRight.x = -groupRight.x
    objectsLeft.push(groupRight)
  }
  newArray = array.concat(objectsLeft);
  //mergeArrays(newArray)
  let leftColors = []
  let newColors = []
  colors.forEach(function(val) {
   leftColors.push(val)
  })
  newColors = colors.concat(leftColors)
  //
  findMasson(newArray)
  convertVectorToFloatArr(newArray, newColors)
  //return newArray
}
//

function findMasson(arr, col){
  const elem = Math.ceil(Math.random()*arr.length-1)
  enemyIndex = elem
}

function convertVectorToFloatArr(arr, col, enemy){
  arr.forEach(function(val) {
   pos.push(val.x, val.y, val.z)
  })
  
  for (let i = 0; i < col.length; i++) {
    colors.push(col[i])
  }
 }
 
 return {pos, enemyIndex}
}

const PARTICLE_SIZE = 0.7
//let particles, raycaster, INTERSECTED, pointer

let vertices = []
let names = []
let sizes = []
this.s = []

for (let i = 0; i < this.v.length / 3; i++) {
  this.s.push(PARTICLE_SIZE)
}
//this.siz = size2
  }
}