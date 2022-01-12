//Ao clicar em adicionar ou pressionar enter, copia o textContent
//para o novo input checkbox e cria o elemento, apagando o conteudo 
//do input de tarefa

//Caso o textContent esteja vazio não cria uma nova tarefa

//Opção de remover a tarefa com um botão "X"
//Botão para remover todas as tarefas de uma vez

'use strict';

const criarItem = (tarefa) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox">
    <div>${tarefa}</div>
    <input type="button" value="X">`

    document.getElementById('listaDeTarefas').appendChild(item);
}