import Cpu8bit from "./8bit-cpu.js";
import compileCode from "./compiler.js";

const cpu = new Cpu8bit(1000);

const screen = document.getElementById("screen")
cpu.ram[200] = 208

setInterval(()=>{
    let screenRam = cpu.ram.slice(-16)
    screenRam = screenRam.map((v)=>v===0?95:v)
    screen.innerText = String.fromCharCode(...screenRam)
},100)


const textarea = document.querySelector("textarea")
const runBtn = document.getElementById("runBtn")
runBtn.addEventListener("click",()=>{
    cpu.writeCode(compileCode(textarea.value))
    cpu.run()
    cpu.counter = 0
})
