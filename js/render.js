const finished = document.querySelector('.finished');
const unfinished = document.querySelector('.unfinished');
// const finishedHeader = document.querySelector('.finished-header');
// const unfinishedHeader = document.querySelector('.unfinished-header');

const addTask = document.querySelector('.add-task');
const addBtn = addTask.querySelector('a');

let is_finishedHeader = false;
let is_unfinishedHeader = false;

function renderTask(value, status) {
    let checkedBlock, titleBlock, actionBlock, render, ul, input, label;

    ul = document.createElement('ul');
    input = document.createElement('input');
    label = document.createElement('label');
    render = document.createElement('li');
    checkedBlock = document.createElement('li');
    titleBlock = document.createElement('li');
    actionBlock = document.createElement('li');
    ul.className = 'list-inline';
    render.className = 'list-group-item';
    checkedBlock.className = 'd-inline-block';
    checkedBlock.classList.add('w-25');
    checkedBlock.classList.add('float-left');
    titleBlock.className = 'd-inline-block';
    actionBlock.className = 'd-inline-block';
    actionBlock.classList.add('float-right');
    actionBlock.classList.add('w-25');
    actionBlock.classList.add('pl-3');
    titleBlock.classList.add('w-50');
    label.className = 'name';
    label.innerText = value;
    input.type = 'checkbox';
    input.addEventListener('click', checkAction);

    if (status === finished) {
        input.checked = true;
    } else if (status === unfinished) {
        renderActionBtn(actionBlock);
        input.checked = false;
    }

    ul.appendChild(checkedBlock);
    checkedBlock.appendChild(input);
    titleBlock.appendChild(label);
    ul.appendChild(titleBlock);
    ul.appendChild(actionBlock);
    render.appendChild(ul);
    status.insertBefore(render, status.firstChild);
}

function removeFinishedHeader() {
    if (finished.childNodes.length === 0) {
        finishedHeader.innerHTML = '';
        is_finishedHeader = false;
    }
}

function removeUnfinishedHeader() {
    if (unfinished.childNodes.length === 0) {
        unfinishedHeader.innerHTML = '';
        is_unfinishedHeader = false;
    }
}

function renderFinishedHeader() {
    if (is_finishedHeader === false) {
        let title, actionRow, listAction, firstAction, secondAction;

        title = document.createElement('li');
        actionRow = document.createElement('li');
        firstAction = document.createElement('li');
        secondAction = document.createElement('li');
        listAction = document.createElement('ul');
        title.className = 'list-group-item';
        actionRow.className = 'list-group-item';
        title.classList.add('active');
        title.classList.add('mt-3');
        title.innerText = 'Завершёные';
        listAction.className = 'list-inline';
        firstAction.className = 'd-inline-block';
        secondAction.className = 'd-inline-block';
        firstAction.classList.add('w-25');
        firstAction.classList.add('pl-3');
        firstAction.innerText = 'Вернуть обратно';
        secondAction.innerText = 'Название';

        finishedHeader.appendChild(title);
        listAction.appendChild(firstAction);
        listAction.appendChild(secondAction);
        actionRow.appendChild(listAction);
        finishedHeader.appendChild(actionRow);

        is_finishedHeader = true;
    } else {
        removeFinishedHeader();
    }
}

function renderUnfinishedHeader() {
    if (is_unfinishedHeader === false) {
        let title, actionRow, listAction, firstAction, name, secondAction;

        title = document.createElement('li');
        actionRow = document.createElement('li');
        firstAction = document.createElement('li');
        secondAction = document.createElement('li');
        name = document.createElement('li');
        listAction = document.createElement('ul');
        title.className = 'list-group-item';
        actionRow.className = 'list-group-item';
        title.classList.add('active');
        name.className = 'd-inline-block';
        listAction.className = 'list-inline';
        firstAction.className = 'd-inline-block';
        secondAction.className = 'd-inline-block';
        firstAction.classList.add('w-25');
        firstAction.classList.add('pl-3');
        firstAction.innerText = 'Завершить';
        secondAction.classList.add('w-25');
        secondAction.classList.add('pl-3');
        secondAction.classList.add('float-right');
        name.innerText = 'Название';
        title.innerText = 'Активные';
        secondAction.innerText = 'Действие';

        unfinishedHeader.appendChild(title);
        listAction.appendChild(firstAction);
        listAction.appendChild(name);
        listAction.appendChild(secondAction);
        actionRow.appendChild(listAction);
        unfinishedHeader.appendChild(actionRow);

        is_unfinishedHeader = true;
    } else {
        removeUnfinishedHeader();
    }
}