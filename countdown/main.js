//Alterar o formatarDigito e adicionar input datetime-local na pagina HTML
'use strict';

//Função que remove os 0's na frente do número deixando apenas os dois ultimos números
const formatarDigito = (digito) => `0${digito}`.slice(-2);

const atualizar = (tempo) => {
    const segundos = document.getElementById('segundos');
    const minutos = document.getElementById('minutos');
    const horas = document.getElementById('horas');
    const dias = document.getElementById('dias');
    
    const qtdSegundos = tempo % 60;
    const qtdMinutos = Math.floor((tempo % (60 * 60)) / 60);
    const qtdHoras = Math.floor((tempo % (60 * 60 * 24)) / (60 * 60));
    const qtdDias = Math.floor(tempo / (60 * 60 * 24));

    segundos.textContent = formatarDigito(qtdSegundos);
    minutos.textContent = formatarDigito(qtdMinutos);
    horas.textContent = formatarDigito(qtdHoras);
    dias.textContent = formatarDigito(qtdDias);
}

const contagemRegressiva = (tempo) => {
    const pararContagem = () => clearInterval(id);
    
    const contar = () => {
        if (tempo === 0) {
            pararContagem();
        }
        atualizar(tempo);
        tempo--;
    }
    
    //setInterval recebe uma callback e o tempo de execução em milisegundos para executar a função novamente
    //Para utilizar o clearInterval, é necessário enviar um id do setInterval para parar a função correta
    const id = setInterval(contar, 1000);
}

const tempoRestante = () => {
    //Data de referência do Javascript: 1 de Janeiro de 1970
    const dataEvento = new Date ('2022-03-26 17:15:00');
    const hoje = Date.now();

    //As datas em Javascript são em milisegundos
    return Math.floor((dataEvento - hoje) / 1000);
}

contagemRegressiva(tempoRestante());