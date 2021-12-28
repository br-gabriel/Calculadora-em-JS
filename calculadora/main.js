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
        const numeroAtual = parseFloat(display.textContent);
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        /*if(operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual);
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual)
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual)
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual)
        }*/
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        //Se um novo número for inserido, limpa o dislpay e adiciona o novo número
        display.textContent = texto;
        novoNumero = false;
    } else {
        //Concatena o texto já existente com o texto enviado para o display por meio dos botões
        display.textContent += texto;
    }
}

//Envia para o atualizarDisplay o valor do botão clicado
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
    }
}

//Criação de evento para cada número e operador existente
numeros.forEach(numero => numero.addEventListener('click', inserirNumero));
operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

document.getElementById('igual').addEventListener('click', calcular)