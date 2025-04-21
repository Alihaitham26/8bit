import {  getTheFlag, getTheRm } from "./utilitize";

class Cpu16bit{
    constructor(){
        this.register = new Uint16Array(16);
        this.ram = new Uint16Array(65536);
        this.pc = 0;
        this.instructions = [];
    }
    MOV(inputs){
        // MOV Rm R VALUE F
        let Rm = getTheRm(inputs);
        let f = getTheFlag(inputs);
        if(f === 0){
            let R = parseInt(inputs[1],16);
            this.register[Rm] = this.register[R];
        }else{
            let val = parseInt(inputs.slice(2,6),16);
            this.register[Rm] = val;
        }
    }
    LOD(inputs){
        // LOD Rm address F
        let Rm = getTheRm(inputs);
        let f = getTheFlag(inputs);
        if(f !== 0){
            let R = parseInt(inputs[1],16);
            this.register[Rm] = this.ram[this.register[R]];
        }else{
            let memAdr = parseInt(inputs.slice(2,6),16);
            this.register[Rm] = this.ram[memAdr];
        }
    }
    STR(inputs){
        // STR Rm address F
        let Rm = getTheRm(inputs);
        let f = getTheFlag(inputs);
        if(f !== 0){
            let R = parseInt(inputs[1],16);
            this.ram[this.register[R]] = this.register[Rm];
        }else{
            let memAdr = parseInt(inputs.slice(2,6),16);
            this.ram[memAdr] = this.register[Rm];
        }
    }
    AND(inputs){
        // AND Rm R1 R2
        let Rm = getTheRm(inputs);
        let R1 = parseInt(inputs[1],16);
        let R2 = parseInt(inputs[2],16);
        this.register[Rm] = this.register[R1] & this.register[R2];
    }
    OOR(inputs){
        // OR Rm R1 R2
        let Rm = getTheRm(inputs);
        let R1 = parseInt(inputs[1],16);
        let R2 = parseInt(inputs[2],16);
        this.register[Rm] = this.register[R1] | this.register[R2];
    }
    XOR(inputs){
        // XOR Rm R1 R2
        let Rm = getTheRm(inputs);
        let R1 = parseInt(inputs[1],16);
        let R2 = parseInt(inputs[2],16);
        this.register[Rm] = this.register[R1] ^ this.register[R2];
    }
    LSL(inputs){
        // LSL Rm R1 R2
        let Rm = getTheRm(inputs);
        let n = parseInt(inputs[1],16);
        this.register[Rm] = this.register[Rm] << n;
    }
    LSR(inputs){
        // LSR Rm R1 R2
        let Rm = getTheRm(inputs);
        let n = parseInt(inputs[1],16);
        this.register[Rm] = this.register[Rm] >> n;
    }
    ADD(inputs){
        // ADD Rm R1 R2 RC F
        let Rm = getTheRm(inputs);
        let R1 = parseInt(inputs[1],16);
        let R2 = parseInt(inputs[2],16);
        let flag = getTheFlag(inputs);
        if(flag === 0){
            this.register[Rm] = this.register[R1] + this.register[R2]
        }else{
            let Rc = inputs[3]
            let sum  = this.register[R1] + this.register[R2]
            if(sum > 65535){
                this.register[Rm] = 65535
                this.register[Rc] = sum - 65535
            }else{
                this.register[Rm] = sum
            }
        }
    }
}

export default Cpu16bit;