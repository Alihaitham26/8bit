const {Cpu8bit} = require("./8bit-cpu.js");

const cpu = new Cpu8bit()

let testResult = []

// test 1 => WRITE
cpu.WRITE(0,0b10000000);
cpu.WRITE(1,0b11111000);
testResult.push(cpu.register[0] == 0b10000000)
testResult.push(cpu.register[1] == 0b11111000)

// test 2 => STORE
cpu.WRITE(0,100)
cpu.WRITE(1,200)
cpu.STORE(0,0xf0);
cpu.STORE(1,0xff);
testResult.push(cpu.ram[0xf0] == 100)
testResult.push(cpu.ram[0xff] == 200)

// test 3 => LOAD
cpu.LOAD(5,0xf0);
cpu.LOAD(6,0xff);
testResult.push(cpu.register[5] == 100)
testResult.push(cpu.register[6] == 200)

// test 4 => MOVE
cpu.WRITE(0,0b10000000);
cpu.WRITE(1,0b11111000);
cpu.WRITE(2,0b10001001)
cpu.MOVE(0,1);
cpu.MOVE(2,0);
testResult.push(cpu.register[0] == 0b10001001)
testResult.push(cpu.register[1] == 0b10000000)

// test 5 => ADDT
cpu.WRITE(0,0b10000000);
cpu.WRITE(1,0b11111000);
cpu.WRITE(2,0b10001001) 
cpu.WRITE(3,0b01111000)
cpu.ADDT(4,0,1);
cpu.ADDT(5,2,3);
testResult.push(cpu.register[4] == 0b01111000)
testResult.push(cpu.register[5] == 0b00000001)

// test 6 => ADDF
cpu.WRITE(0,0b11011000);
cpu.WRITE(1,0b01101010);
cpu.WRITE(2,0b10001001) 
cpu.WRITE(3,0b01111000)
cpu.ADDF(4,0,1);
cpu.ADDF(5,2,3);
testResult.push(cpu.register[4] == 0b01011100)
console.log(cpu.register[4].toString(2).padStart(8,"0"))
testResult.push(cpu.register[5] == 0b001101111)

//test 7 => OR
cpu.WRITE(0xa,0b11011000);
cpu.WRITE(0xb,0b01101010);
cpu.WRITE(0xc,0b10001001) 
cpu.WRITE(0xd,0b01111000)
cpu.OR(0xe,0xa,0xb);
cpu.OR(0xf,0xc,0xd);
testResult.push(cpu.register[0xe] == 0b11111010)
testResult.push(cpu.register[0xf] == 0b11111001)

//test 8 => AND
cpu.WRITE(0xa,0b11011000);
cpu.WRITE(0xb,0b01101010);
cpu.WRITE(0xc,0b10001001) 
cpu.WRITE(0xd,0b01111000)
cpu.AND(0xe,0xa,0xb);
cpu.AND(0xf,0xc,0xd);
testResult.push(cpu.register[0xe] == 0b01001000)
testResult.push(cpu.register[0xf] == 0b00001000)

//test 9 => XOR
cpu.WRITE(0xa,0b11011000);
cpu.WRITE(0xb,0b01101010);
cpu.WRITE(0xc,0b10001001) 
cpu.WRITE(0xd,0b01111000)
cpu.XOR(0xe,0xa,0xb);
cpu.XOR(0xf,0xc,0xd);
testResult.push(cpu.register[0xe] == 0b10110010)
testResult.push(cpu.register[0xf] == 0b11110001)

//test 10 => NOT
cpu.WRITE(0xa,0b11011000);
cpu.WRITE(8,0b11111111)
cpu.NOT(0xb,0xa);
cpu.NOT(0xc,8);
testResult.push(cpu.register[0xb] == 0b00100111)
testResult.push(cpu.register[0xc] == 0b00000000)

//test 11 => ROT
cpu.WRITE(0xa,0b11011010);
cpu.WRITE(0xc,0b11101111)
cpu.ROT(0xa,3);
cpu.ROT(0xc,4);
console.log("0")
console.log(0xa.toString(2).padStart(8,"0"))
testResult.push(cpu.register[0xa] == 0b01011011)
testResult.push(cpu.register[0xc] == 0b11111110)

//test 12 => JUMP
cpu.WRITE(0x0,0b10000000);
cpu.WRITE(0x1,0b10000000);
cpu.WRITE(0x2,0b10001000);
cpu.JUMP(0x1,0xff);
testResult.push(cpu.counter == 0xff)
cpu.JUMP(0x2,0xaf);
testResult.push(cpu.counter == 0xff) 


// -.00001001 = 1/32+1/256 
testResult.forEach((r,i) => r ? console.log(`test ${i+1} passed`) : console.log(`test ${i+1} failed`))
testResult.every(r => r) ? console.log("all test passed") : console.log("test failed")

