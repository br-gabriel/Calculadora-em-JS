//Ao clicar em adicionar ou pressionar enter, copia o textContent
//para o novo input checkbox e cria o elemento, apagando o conteudo 
//do input de tarefa

//Caso o textContent esteja vazio não cria uma nova tarefa

//Opção de remover a tarefa com um botão "X"
//Botão para remover todas as tarefas de uma vez

'use strict';

let dataBase = [
    {'tarefa' : 'Estudar JS', 'status' : ''},
]

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>`

    document.getElementById('listaDeTarefas').appendChild(item);
}

const limparTarefas = () => {
    const listaDeTarefas = document.getElementById('listaDeTarefas');
    while (listaDeTarefas.firstChild) {
        listaDeTarefas.removeChild(listaDeTarefas.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas();
    dataBase.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        dataBase.push ({'tarefa' : texto, 'status' : ''});
        atualizarTela();

        //Limpa o texto dentro do input
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    dataBase.splice(indice, 1);
    atualizarTela();
}

const atualizarItem = (indice) => {
    dataBase[indice].status = dataBase[indice].status === '' ? 'checked' : '';
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('novaTarefa').addEventListener('keypress', inserirItem);
document.getElementById('listaDeTarefas').addEventListener('click', clickItem);

atualizarTela();