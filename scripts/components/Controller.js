import * as THREE from '.././lib/three.module.js'
import { setupScene, scene, camera, renderer, light, directionalLight, controls } from '.././components/render.js';
import { cnfgColor, configL01 } from './constants.js'

export class Controller {
  constructor({up, down, left, right}){
   this.up = up
   this.down = down 
   this.left = left
   this.right = right
   this.timer = 0
  }
  
  update(mason, gameConfig){
   if (mason.position.y == 0 && mason.position.x == 0){
    this.timer = 0
    mason.position.y = Math.floor(Math.random()*3-1)
    mason.position.x = Math.floor(Math.random()*3-1)

   }
   
   if (this.timer >= 100) {
    gameConfig.center = 0
   } else {
    this.timer++
    gameConfig.center = 1
   }
   
  }
  
  display(mason){
   const width = 1
   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {
     
    this.up.addEventListener(
     "click",
     function() {
      mason.position.y += 1
      if(mason.position.y > width)
        mason.position.y = width
     } 
    )
    
    this.down.addEventListener(
     "click",
     function() {
      mason.position.y -= 1
      if (mason.position.y < -width)
       mason.position.y = -width
     }
    )
    
    this.left.addEventListener(
     "click",
     function() {
      mason.position.x -= width
      if (mason.position.x < -width)
       mason.position.x = -width
     }
    )
    
    this.right.addEventListener(
     "click",
     function() {
      mason.position.x += 1
      if (mason.position.x > width)
       mason.position.x = width
     }
    )
    
   } else {
    this.up.addEventListener(
      "click",
      function() {
       mason.position.y += 1
       if(mason.position.y > width)
         mason.position.y = width
      } 
     )
     
     this.down.addEventListener(
      "click",
      function() {
       mason.position.y -= 1
       if (mason.position.y < -width)
        mason.position.y = -width
      }
     )
     
     this.left.addEventListener(
      "click",
      function() {
       mason.position.x -= width
       if (mason.position.x < -width)
        mason.position.x = -width
      }
     )
     
     this.right.addEventListener(
      "click",
      function() {
       mason.position.x += 1
       if (mason.position.x > width)
        mason.position.x = width
      }
     )   
   }

  window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          mason.position.y -= 1
          if (mason.position.y < -width)
           mason.position.y = -width
          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
          mason.position.y += 1
          if (mason.position.y > width)
           mason.position.y = width
          break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          mason.position.x -= 1
          if (mason.position.x < -width)
           mason.position.x = -width
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          mason.position.x += 1
          if (mason.position.x > width)
           mason.position.x = width
          break;
        case "Enter":
          // Do something for "enter" or "return" key press.
          break;
        case "Esc": // IE/Edge specific value
        case "Escape":
          // Do something for "esc" key press.
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true
  );

  }
}
