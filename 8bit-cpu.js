const outputSpan = document.getElementById("output")


class Cpu8bit {
    constructor(clockSpeed) {
        this.register = new Uint8Array(16);
        this.counter = 0x00;
        this.ram = new Uint8Array(256);
        this.instructionRegister = 0x0000
        this.clockSpeed = clockSpeed
    }
    writeCode(code){
        code.split(" ").forEach((c,i)=>{
            this.ram[i] = parseInt(c,16)
        })
    }
    run(){
        const instructions = [
            (ip)=>this.LOAD(parseInt(ip[0],16),parseInt(ip.slice(1),16)), // 1RXY
            (ip)=>this.WRITE(parseInt(ip[0],16),parseInt(ip.slice(1),16)), // 2RXY
            (ip)=>this.STORE(parseInt(ip[0],16),parseInt(ip.slice(1),16)), // 3RXY
            (ip)=>this.MOVE(parseInt(ip[1],16),parseInt(ip[2],16)), // 40XY
            (ip)=>this.ADDT(parseInt(ip[0],16),parseInt(ip[1],16),parseInt(ip[2],16)), // 5RAB
            (ip)=>this.ADDF(parseInt(ip[0],16),parseInt(ip[1],16),parseInt(ip[2],16)), // 6RAB
            (ip)=>this.AND(parseInt(ip[0],16),parseInt(ip[1],16),parseInt(ip[2],16)),  // 7RAB
            (ip)=>this.OR(parseInt(ip[0],16),parseInt(ip[1],16),parseInt(ip[2],16)),   // 8RAB
            (ip)=>this.XOR(parseInt(ip[0],16),parseInt(ip[1],16),parseInt(ip[2],16)),  // 9RAB
            (ip)=>this.NOT(parseInt(ip[1],16),parseInt(ip[2],16)), // AR0A
            (ip)=>this.ROT(parseInt(ip[0],16),parseInt(ip[2],16)), // BR0X
            (ip)=>this.JUMP(parseInt(ip[0],16),parseInt(ip.slice(1),16)), // CR0X
            (ip)=>{clearInterval(interval);console.log("program executed")} // D000
        ]
            const interval = setInterval(() => {
                this.instructionRegister = `${this.ram[this.counter].toString(16).padStart(2,"0")}${this.ram[this.counter+1].toString(16).padStart(2,"0")}`;
                this.counter += 2;
                let instructionIndex = parseInt(this.instructionRegister[0],16) - 1
                let instructionPar = this.instructionRegister.slice(1)
                instructions[instructionIndex](instructionPar)
                outputSpan.innerText = this.register[15]
                if(this.counter > 255) clearInterval(interval)
                for(let i = 0 ; i < 16 ; i++){
                    document.getElementById("r"+i).innerText = this.register[i].toString(16).padStart(2,"0")
                }
            },this.clockSpeed)
    }
    /**
     * Stores the bit pattern in memory cell XY in the register r (1RXY).
     */
    LOAD(r, xy) {
        this.register[r] = this.ram[xy];
    }

    /**
     * Stores the bit pattern XY in the register r (2RXY).
     */
    WRITE(r, xy) {
        this.register[r] = xy;
    }

    /**
     * Stores the bit pattern in register r in memory cell XY (3RXY).
     */
    STORE(r, XY) {
        this.ram[XY] = this.register[r];
    }

    /**
     * Stores the bit pattern in register a in register b (40AB).
     */
    MOVE(a, b) {
        this.register[b] = this.register[a];
    }

    /**
     * Adds the bit patterns in a and b as two's complement and stores it in r (5RAB).
     */
    ADDT(r, a, b) {
        const sum = this.register[a] + this.register[b];
        this.register[r] = sum > 256 ? sum - 256 : sum;
    }
    /**
     * Adds the bit patterns in a and b as floating point and stores it in r (6RAB).
     */
    ADDF(r, a, b) {
        const aFP = bitPatternToFloatingPoint(this.register[a]);
        const bFP = bitPatternToFloatingPoint(this.register[b]);
        const sumFP = aFP + bFP;
        this.register[r] = floatingPointToBitPattern(sumFP);
    }
    /**
     * Performs a logical OR between the bit patterns in a and b bit by bit and stores it in r (7RAB).
     */
    OR(r,a,b){
        this.register[r] = this.register[a] | this.register[b]
    }
    /**
     * Performs a logical AND between the bit patterns in a and b bit by bit and stores it in r (8RAB).
     */
    AND(r,a,b){
        this.register[r] = this.register[a] & this.register[b]
    }
    /**
     * Performs a logical XOR between the bit patterns in a and b bit by bit and stores it in r (9RAB).
     */
    XOR(r,a,b){
        this.register[r] = this.register[a] ^ this.register[b]
    }
    /**
     * Performs a logical NOT between the bit patterns in a andstores it in r (AR0A).
     */
    NOT(r,a){
        this.register[r] = ~this.register[a]
    }
    /**
     * rotate the bit pattern in r one bit to right x times (BR0X).
     */
    ROT(r,x){
        let bit = this.register[r].toString(2).padStart(8,"0")
        let rotated = bit.slice(-x) + bit.slice(0,-x)
        this.register[r] = parseInt(rotated,2)
    }
    /**
     * Jumps to the address x if the bit pattern in r is equal to bit pattern in register 0 (CR0X).
     */
    JUMP(r,x){
        if(this.register[r] == this.register[0]) this.counter = x*2 
    }
}

function bitPatternToFloatingPoint(bitPattern){
    let bit = bitPattern.toString(2).padStart(8,"0")
    let sign = bit[0] == "1" ? -1 : 1
    let exponent = (parseInt(bit.slice(1,4),2) - 4)
    let mantissa = parseInt(bit.slice(4,8),2)
    return (sign * mantissa/16 * Math.pow(2,exponent))
}
function floatingPointToBitPattern(floatingPoint){
    const signBit = floatingPoint > 0 ? 0 : 1;
    const absValue = Math.abs(floatingPoint);
    const exponent = (Math.floor(Math.log2(absValue)) + 1) ;
    const mantissa = (absValue / 2** exponent);
    return parseInt(`${signBit}${(exponent+4).toString(2).padStart(3, "0").slice(0,3)}${(mantissa).toString(2).padEnd(6,"0").slice(2,6)}`, 2);
}



// module.exports.Cpu8bit = Cpu8bit
export default Cpu8bit