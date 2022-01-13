//Caso o textContent esteja vazio não cria uma nova tarefa
//Botão para remover todas as tarefas de uma vez
//Adicionar função ao botão
//Adicionar hover nos labels/tarefas

/*localStorage só armazena arquivos em string, então é necessário 
converter os dados em string por meio do comando 'JSON.stringify(dataBase)',
para receber os dados em formato JSON, devemos utilizar o comando 
'JSON.parse(localStorage.getItem('todoList'))'*/

'use strict';

//Função que armazena temporariamente os dados do localStorage
let dataBase = [];

//Função que recebe os dados armazenados no localStorage
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
//?? = Se estiver nulo, recebe um array vazio

//Função que envia os dados para o localStorage
const setBanco = (dataBase) => localStorage.setItem('todoList', JSON.stringify(dataBase))

const criarItem = (tarefa, status, indice) => {
    //Cria um label em HTML
    const item = document.createElement('label');

    //Adiciona a classe 'todo_item' no item criado
    item.classList.add('todo_item');

    //Atualiza o conteúdo HTML dentro do item criado, utilizando template string
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
    const dataBase = getBanco();
    dataBase.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const dataBase = getBanco();
        dataBase.push ({'tarefa' : texto, 'status' : ''});
        setBanco(dataBase);
        atualizarTela();

        //Limpa o texto dentro do input
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    //Recebe os dados do banco de dados
    const dataBase = getBanco();
    //Remove o item selecionado por meio do splice, passando 1 item como parâmetro
    dataBase.splice(indice, 1);
    //Envia a atualização para o banco de dados
    setBanco(dataBase);
    //Atualiza a tela com a alteração dos dados
    atualizarTela();
}

const atualizarItem = (indice) => {
    //Recebe os dados do banco de dados
    const dataBase = getBanco();
    //Verifica o status, se for vazio, troca para 'checked' se estiver 'checked' troca para vazio
    dataBase[indice].status = dataBase[indice].status === '' ? 'checked' : '';
    //Envia a atualização para o banco de dados
    setBanco(dataBase);
    //Atualiza a tela com a alteração dos dados
    atualizarTela();
}

const clickItem = (evento) => {
    //Seleciona o alvo que acionou o evento
    const elemento = evento.target;

    /*Se o alvo que acionou o evento for um botão, então seleciona o item acionado,
    por meio do indice e o remove*/
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
    /*Se o evento foi acionado por um checkbox, o item acionado é atualizado no DB*/
}

//Adição de eventos
document.getElementById('novaTarefa').addEventListener('keypress', inserirItem);
document.getElementById('listaDeTarefas').addEventListener('click', clickItem);

atualizarTela();