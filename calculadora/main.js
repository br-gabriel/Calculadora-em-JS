'use strict';
const display = document.getElementById('display');

//Qualquer elemento que possui o 'texto' no id será selecionado pelo querySelector
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

const calcular = () => {
    if(operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        //Se um novo número for inserido, limpa o dislpay e adiciona o novo número
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
        //Concatena o texto já existente com o texto enviado para o display por meio dos botões
        display.textContent += texto.toLocaleString('BR');
    }
}

//Envia para o atualizarDisplay o valor do botão clicado
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}

//Criação de evento para cada número e operador existente
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

//Traz o resultado da operação e impede que o botão igual faça a mesma operação novamente, com o resultado final
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
//Adiciona o evento de click no botão de igual e chama a função ativarIgual
document.getElementById('igual').addEventListener('click', ativarIgual);

//Função de limpar o display (CE)
const limparDisplay = () => display.textContent = '';

//Botão de apagar o display (CE)
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//Função de limpar o cálculo
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

//Botão de limpar o cálculo (C)
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//Função de backspace (<<)
const removerUltimoNumero = () => {
    display.textContent = display.textContent.slice(0, -1);
}

//Botão de backspace (<<)
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//Função de inverter o sinal
const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

//Botão de inverter o sinal
document.getElementById('inverterSinal').addEventListener('click', inverterSinal);

//Funções que checam se pode adicionar a vírgula no cálculo
const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

//Função de inserir o valor decimal
const inserirDecimal = () => {
    if(!existeDecimal()) {
        if(existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}

//Botao da vírgula
document.getElementById('virgula').addEventListener('click', inserirDecimal);