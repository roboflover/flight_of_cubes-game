export class CollisionSystem {
  constructor(numObjects, startGame){
    this.count = numObjects
    this.startGame = startGame
    this.kill = false
  }
/*
  updateScore(scoreQuanity, gameOverClass, gameConfig){
    
   scoreQuanity.textContent = gameConfig.dancerCount
   
    if(this.eventMurderDancer){
      gameConfig.dancerCount--
      scoreQuanity.textContent = gameConfig.dancerCount
      this.eventMurderDancer = false
    }
   
    if(gameConfig.dancerCount <= 0){
      gameConfig.startGame = true
    }
    
    if(this.eventMurderPoliceman){
      this.deadPolice++
      this.eventMurderPoliceman = false
    }
      
  }
*/
  update(cubes, player, gameConfig, gameOverTitle ) {
    
    const posCubes = cubes.geometry.attributes.translate.array
    const dataCubes = cubes.geometry.data

    for (let i = 0; i < this.count; i++) {
      
      const dx = posCubes[i * 3 + 0] - player.position.x;
      const dy = posCubes[i * 3 + 1] - player.position.y;
      const dz = (posCubes[i * 3 + 2]-39.5) - player.position.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      // console.log('posCubesX', posCubes[i * 3 + 0])
      // console.log('playerX', player.position.x)
      // console.log('posCubesY', posCubes[i * 3 + 1])
      // console.log('playerY', player.position.y)
      if (dist < 0.5) {
         gameConfig.pause = true
         gameConfig.health = 0
         gameOverTitle.textContent = `Score: ${gameConfig.score}`
        }
      }
    
  cubes.geometry.attributes.health.needsUpdate = true
  }

  setCollidingToogle(data) {
    data.collidingToogle = true
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}