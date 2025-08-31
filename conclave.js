const prompt = require('prompt-sync')({ sigint: false });

function conclave() {
    let cardeais = [];

    // Cadastro dos Cardeais 
    console.log("=== Cadastro dos Cardeais ===");
    for (let i = 1; i <= 5; i++) {
        let nome = prompt(`Digite o nome do Cardeal ${i}: `);

        // escolher número entre 1 e 5 (sem repetição)
        let numero;
        do {
            numero = Number(prompt(`Escolha o número do Cardeal (1 a 5) para ${nome}: `));
            if (numero < 1 || numero > 5) {
                console.log("Número inválido! Digite apenas entre 1 e 5.");
                numero = -1;
            } else if (cardeais.some(c => c.numero === numero)) {
                console.log("Esse número já foi escolhido por outro Cardeal!");
                numero = -1;
            }
        } while (numero === -1);

        cardeais.push({ nome, numero, votos: 0 });
    }

    // Mostrar Cardeais cadastrados
    console.log("\n=== Cardeais Cadastrados ===");
    cardeais.forEach(c => console.log(`${c.numero} - ${c.nome}`));

    // Votação automática 
    let vencedor = null;
    let rodada = 1;

    while (!vencedor) {
        let totalVotos = 0;

        // Zerar votos a cada votação
        cardeais.forEach(c => c.votos = 0);

        console.log(`\n=== Conclave (Rodada ${rodada}) ===`);
        console.log("Digite 0 para encerrar essa votação.");

        // Votação aberta até o usuário digitar 0
        while (true) {
            let voto = Number(prompt("Digite o número do Cardeal (1 a 5): "));
            if (voto === 0) break;

            let escolhido = cardeais.find(c => c.numero === voto);
            if (escolhido) {
                escolhido.votos++;
                totalVotos++;
                console.log(`Voto registrado para ${escolhido.nome}!`);
            } else {
                console.log("Voto nulo/branco!");
            }
        }

        // Mostrar resultado da votação
        console.log("\nResultado da votação:");
        cardeais.forEach(c => console.log(`${c.nome} (${c.numero}) - ${c.votos} votos`));

        // Encontrar o mais votado
        let maisVotado = cardeais.reduce((a, b) => a.votos > b.votos ? a : b);

        // Verificar se atingiu 2/3 dos votos
        if (maisVotado.votos >= Math.ceil((2 / 3) * totalVotos) && totalVotos > 0) {
            vencedor = maisVotado;
        } else {
            console.log("\nNenhum Cardeal atingiu 2/3 dos votos. Uma nova votação será iniciada automaticamente!");
            rodada++;
        }
    }

    console.log(`\nHABEMUS PAPA! ${vencedor.nome} foi eleito com ${vencedor.votos} votos}!`);
}

// Executar programa
conclave();

