function compileCode(code) {
    const instructions = [
        "",
        "LOAD",
        "WRITE",
        "STORE",
        "MOVE",
        "ADDT",
        "ADDF",
        "AND",
        "OR",
        "XOR",
        "NOT",
        "ROT",
        "JUMP",
        "HALT",
    ];

    const codeLines = code.split("\n").filter((line) => line.trim() !== "");
    const machineCode = codeLines.map((line) => {
        const [instruction, ...params] = line.split(" ");
        const instructionIndex = instructions.indexOf(instruction).toString(16);
        const paramsCode = params.join("").padStart(3, "0").slice(0, 3);
        return `${instructionIndex}${paramsCode}`;
    });
    const newCode = [];
    machineCode.forEach((code, index) => {
        newCode[index * 2] = code.slice(0, 2);
        newCode[index * 2 + 1] = code.slice(2, 4);
    });

    return newCode.join(" ");
}

export default compileCode