# Jogo do número seceto

## Resumo
Este jogo foi desenvolvido durante uma aula de fundamentos básicos de JavaScript. O projeto tem como objetivo gerar um número inteiro aleatório e pedir ao usúario que tente advinhar qual o número, ao longo das tentativas o programa vai dando dicas baseado nos palpites.

## Tecnologias

1. **JavaScript**
2. **HTML**
3. **CSS**

## Implementação
### Estrutura do projeto
```plaintext
    jogo-numero-secreto/
    ├── img/
    ├── app.js
    ├── index.html
    ├── stye.css
```
### Imagens
1. Imagem inicial
![Imagem inicial](https://github.com/user-attachments/assets/56d01a91-7e70-455c-958d-3774071e7cb0)
)
2. Imagem de acerto
![Imagem de acerto](https://github.com/user-attachments/assets/e1100716-d575-420c-9f64-f6f04139ac3e)
)
### Funções
1. Responsavel por agilizar a impletação de textos nas tags. Acrescentamos uma interatividade por audio com o usuário atraves do Responsive Voice.
```javascript
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
```
Responsive Voice sendo chamado no HTML
```html
<!-- restante do código(...) -->
    <script src="https://code.responsivevoice.org/responsivevoice.js"></script>
<!-- restante do código(...) -->
```
2. Verifica os palpites dados pelo usuário, informa as dicas de acordo com os palpites dados. No fim faz a somatoria das tentativas e limpa o campo de digitação a cada nova tentativa.
```javascript
function verificarChute() {
    let chute = document.querySelector('input').value;

    // Se chute for igual a número secreto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let menssagemTentativas = `Você descobriu o número secreto depois de ${tentativa} ${palavraTentativa}!`;
        exibirTextoNaTela('p', menssagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // se chute for maior que número secreto
        if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número secreto é menor!');
    } else {
        exibirTextoNaTela('p', 'O número secreto é maior!');
    }
    //somando as tentativas a cada erro e limpando o campo
    tentativa++;
    limparCampo();
    }
}
```
3. Função responsavel por gerar os números aleatórios, o número gerado é adicionado em uma lista, se o número gerado já estiver na lista gera um novo número aleatório. Assim permitindo não hava números repetidos. Ao chegar no limite estipulado do jogo a lista é zerada.
```javascript
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeNumeros = listaDeNumerosSorteados.length;

    // Se a quantidade de números da lista for igual ao numero limite:
    if (quantidadeDeNumeros == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Se o número escolhido estiver na lista:
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();  

    } else {
        // Adiciona o número escolhido na lista de números
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        // Retorna número escolhido
        return numeroEscolhido;
    }
    
}
```
4. Responsavel por reiniciar
```javascript
function resertarJogo() {
    exibirMenssagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
```
