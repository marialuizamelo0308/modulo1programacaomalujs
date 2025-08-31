const entrada = require('prompt-sync')({ sigint: false });

function calcular(operacao, num1, num2) {
    // Operadores Da Calculadora
    if (operacao === "+") {
        return num1 + num2;
    } else if (operacao === "-") {
        return num1 - num2;
    } else if (operacao === "*") {
        return num1 * num2;
    } else if (operacao === "/") {
        if (num2 === 0) {
            return "Erro: divisão por zero!";
        }
        return num1 / num2;
    } else {
        return "Operação inválida!"; // caso a operação seja diferente de(+,-,*,/)
    }
}

function confirmarContinuar() {
    while (true) {
        const r = entrada('Deseja realizar outra operação? (sim/nao):').toLowerCase();
        if (r === 'sim') return true; // continuar
        if (r === 'nao') return false; // encerrar
        console.log("Responda apenas com 'sim' ou 'nao'.");
    }
}

let continuar = true;
while (continuar) {
    console.log("\n=== Calculadora ===");

    // Solicita a operação até que seja válida
    let operacao;
while (true) {
    operacao = entrada("Qual operação deseja realizar? (+, -, *, /): ");

    if (operacao === "+" || operacao === "-" || operacao === "*" || operacao === "/") {
        break;
    } else {
        console.log("Operação inválida. Tente novamente.");
    }
}
// Solicita os numeros para operação
    let num1 = Number(entrada("Digite o primeiro número: "));
    let num2 = Number(entrada("Digite o segundo número: "));
// Calcula o resultado usando a função
    let resultado = calcular(operacao, num1, num2);
    console.log("Resultado: " + resultado);


    continuar = confirmarContinuar();
}

console.log("Programa encerrado."); // encerramento do programa