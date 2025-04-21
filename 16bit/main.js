import Cpu16bit from './Cpu16bit';
import './style.css'

const cpu = new Cpu16bit();

cpu.MOV(`100f0f1`)
cpu.MOV(`20ffff2`)
cpu.ADD(`3120000`)
console.log((cpu.register[3].toString(16)))
console.log(cpu.register[0].toString(16).padStart(4,'0'))
// MOV $1 #VALUE => store the bit pattern #VALUE in the register
// MOV $1 $2     => store the bit pattern in r2 in r1
// STR $1 #ADDR  => store the value in r1 in the memory address #ADDR
// STR $1 $2     => store the value in r1 in the memory address saved in r2
// LOD $1 #ADDR  => store the value in the memory address #ADDR in r1
// LOD $1 $2     => store the value in the memory address saved in r2 in r1
// AND $1 $2 $3  => r1 = r2 AND r3
// OOR $1 $2 $3  => r1 = r2 OR r3
// XOR $1 $2 $3  => r1 = r2 XOR r3

// open it
