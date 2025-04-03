
// Cria uma lista para armazenar os números sorteados
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
exibirMenssagemInicial();
let tentativa = 1;
let numeroSecreto = gerarNumeroAleatorio();

// Criando a função que agiliza a impletação de textos nas tags
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // Campo destinado para programar o responsive voice, para uma interação por audio com o usuário
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
// Criando função para exibir os textos iniciais
function exibirMenssagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto!');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

// Criando a função para verificar o chute passado
function verificarChute() {
    let chute = document.querySelector('input').value;

    // Se chute for igual a número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        // tentativa é maior que 1? se sim 'tentativas' senão 'tentativa"
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let menssagemTentativas = `Você descobriu o número secreto depois de ${tentativa} ${palavraTentativa}!`;
        exibirTextoNaTela('p', menssagemTentativas);
        // pega o elemento pelo id 'reiniciar' e removendo o atributo disabled desse elemento
        document.getElementById('reiniciar').removeAttribute('disabled');
    // senão
    } else {
        // se chute for maior que número secreto
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor!');
    // senão
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior!');
    }
    //somando as tentativas a cada erro e limpando o campo
    tentativa++;
    limparCampo();
    }
}

// Criando função para gerar os números aleatórios
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumeros = listaDeNumerosSorteados.length;

    // Se a quantidade de números da lista for igual ao numero limite:
    if (quantidadeDeNumeros == numeroLimite) {
        // Lista fica vazia
        listaDeNumerosSorteados = [];
    }
    // Se o número escolhido estiver na lista:
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // retorna um novo número
        return gerarNumeroAleatorio();
    // senão:    
    } else {
        // Adiciona o número escolhido na lista de números
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        // Retorna número escolhido
        return numeroEscolhido;
    }
    
}

// Criando função para limpar a caixa do número
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Criando função para reiniciar o jogo
function resertarJogo() {
    exibirMenssagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    // pega o elemento pelo id 'reiniciar' e define o atributo 'disabled' como verdadeiro
    document.getElementById('reiniciar').setAttribute('disabled', true);
}