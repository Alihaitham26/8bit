function getTheFlag(inputs){
    return parseInt(inputs[6],16);
}
function getTheRm(inputs){
    return parseInt(inputs[0],16);
}

// (0 signBit)(00000 exponent)(0000000000 mantissa)
// 5.5 => 5 + 0.5 


export {getTheFlag,getTheRm};