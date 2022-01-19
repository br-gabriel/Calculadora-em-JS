//Caso o textContent esteja vazio não cria uma nova tarefa
//Botão para remover todas as tarefas de uma vez
//Adicionar função ao botão

/*localStorage só armazena arquivos em string, então é necessário 
converter os dados em string por meio do comando 'JSON.stringify(dataBase)',
para receber os dados em formato JSON, devemos utilizar o comando 
'JSON.parse(localStorage.getItem('todoList'))'*/

'use strict';

//função que armazena temporariamente os dados do localStorage
let dataBase = [];

//Função que recebe os dados armazenados no localStorage
const getDados = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
//?? = Se estiver nulo, receba um array vazio

//Função que envia os dados para o localStorage
const setDados = (dataBase) => localStorage.setItem('todoList', JSON.stringify(dataBase))

const criarItem = (tarefa, status, indice) => {
    //Cria um label em HTML
    const item = document.createElement('label');

    //Adiciona a classe 'todo_item' no item criado
    item.classList.add('todo_item');

    //Atualiza o conteudo HMTL dentro do item criado, utilizando template string
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>`

    //Adiciona o item criado dentro da tag com ID 'listaDeTarefas'
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
    const dataBase = getDados();
    dataBase.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const dataBase = getDados();
        dataBase.push ({'tarefa' : texto, 'status' : ''});
        setDados(dataBase);
        atualizarTela();

        //Limpa o texto dentro do input
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const dataBase = getDados();
    dataBase.splice(indice, 1);
    setDados(dataBase);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const dataBase = getDados();
    dataBase[indice].status = dataBase[indice].status === '' ? 'checked' : '';
    setDados(dataBase);
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