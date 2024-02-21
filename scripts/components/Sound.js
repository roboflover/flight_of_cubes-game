import { globalAudioContext } from './constants.js'

export class Sound {
  constructor() {
   // this.kick = kick.bind(kick)

  }
  
  kick=(volume, volKick)=> {
    const oscillator = globalAudioContext.createOscillator()
    const gain = globalAudioContext.createGain();
    volume *= volKick*.02
    oscillator.connect(gain);
    gain.gain.value = 0.16;
    oscillator.type = "sine";
    oscillator.frequency.value = 100
    oscillator.frequency.linearRampToValueAtTime(400, globalAudioContext.currentTime + .1);
    oscillator.frequency.exponentialRampToValueAtTime(500, globalAudioContext.currentTime + 1);
    gain.connect(globalAudioContext.destination);
    oscillator.start(globalAudioContext.currentTime)
    oscillator.stop(globalAudioContext.currentTime + 1)
  }
  
  bass=(volume, volBass)=> {
    const oscillator = globalAudioContext.createOscillator()
    const gain = globalAudioContext.createGain();
    volume *= volBass * .02
    oscillator.connect(gain);
    gain.gain.value = volume;
    oscillator.type = "square";
    oscillator.frequency.value = 100
    oscillator.frequency.linearRampToValueAtTime(900, globalAudioContext.currentTime + .1);
    oscillator.frequency.exponentialRampToValueAtTime(10, globalAudioContext.currentTime + 1);
    gain.connect(globalAudioContext.destination);
    oscillator.start(globalAudioContext.currentTime)
    oscillator.stop(globalAudioContext.currentTime + .6)
  }
  
  reverb(volume, volReverb) {
    const oscillator = globalAudioContext.createOscillator()
    var gain = globalAudioContext.createGain();
    oscillator.connect(gain)
    volume *= 0
    gain.gain.value = volume
    oscillator.type = "wave";
    oscillator.frequency.value = 100
    //const freq = Math.floor(data.velocity.z * 1000 + 100)
    oscillator.frequency.linearRampToValueAtTime(500, globalAudioContext.currentTime + 1);
    const gainNode = globalAudioContext.createGain()
    oscillator.connect(gainNode);
    gainNode.connect(globalAudioContext.destination);
    oscillator.frequency.exponentialRampToValueAtTime(150, globalAudioContext.currentTime + 1.5)
    let synthSource = globalAudioContext.createBufferSource();
    const synthDelay = globalAudioContext.createDelay(50)
    oscillator.connect(synthDelay)
    synthDelay.connect(globalAudioContext.destination)
    synthDelay.delayTime.setValueAtTime(globalAudioContext.currentTime, globalAudioContext.currentTime + 5.5)
    synthSource.loop = true;
    synthSource.start()
    synthDelay.delayTime.value = 1*volReverb
    synthSource.connect(synthDelay)
    synthDelay.connect(globalAudioContext.destination)
    //oscillator.delayTime.setValueAtTime(2, globalAudioContext.currentTime);
    oscillator.start(globalAudioContext.currentTime)
    oscillator.stop(globalAudioContext.currentTime + 1*volReverb)
  }  
  
  bonus() {
    const oscillator = globalAudioContext.createOscillator()
    oscillator.frequency.value = 200
    oscillator.type = "sine";
    oscillator.frequency.linearRampToValueAtTime(100, globalAudioContext.currentTime + 1);
    const gainNode = globalAudioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(globalAudioContext.destination);
    oscillator.start(globalAudioContext.currentTime)
    oscillator.stop(globalAudioContext.currentTime + 1)
  }
  
  go() {
    this.bonus()
    let lengthTackt = 9;
    var arrKick = []
    var arrBass = []
    for(let i = 0; i<lengthTackt; i++){
      arrKick.push(1)
    }
    
    for(let i = 0; i<lengthTackt; i++){
      if(i % 2 === 0){
        arrBass.push(1)
      } else {
        arrBass.push(0)
      }
    }
   //console.log(arrBass)
    let ret = false
    let dispKick = this.kick.bind(this)
    let dispBass = this.bass.bind(this)
    let dispStart = this.start.bind(this);
    
    var i = 0
    var timer = setInterval(function() {
      if (i >= arrKick.length) {
        clearInterval(timer)
        console.log("The end.")
        ret = true
        //dispKick(1,1)
        //dispStart()
      } else {
        dispBass(arrBass[i++], 1.5)
        dispKick(arrKick[i++], 1.0)
       // this.kick(arr[i++], 1)
        //console.log(i + ": " + arrKick[i++])
      }
    }, 300)
    
  }
  
  start(){
    this.go()
  }
}
