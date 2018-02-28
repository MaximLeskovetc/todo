const finished = document.querySelector('.finished');
const unfinished = document.querySelector('.unfinished');
const addTask = document.querySelector('.add-task');
const addBtn = addTask.querySelector('a');
const finishedHeader = document.querySelector('.finished-header');
const unfinishedHeader = document.querySelector('.unfinished-header');
let is_finishedHeader = false;
let is_unfinishedHeader = false;

addBtn.addEventListener('click', addedTask);

function addedTask(ev) {
    ev.preventDefault();
    let text = addTask.querySelector('textarea');
    let value = text.value;
    if (value !== '') {
        renderUnfinishedHeader();
        renderTask(value, unfinished);
    }
    text.value = '';
}

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
    status.appendChild(render);
}

function renderActionBtn(actionBlock) {
    let editBtn, saveBtn, deleteBtn, pencilIcon, floppyIcon, deleteIcon;
    editBtn = document.createElement('a');
    saveBtn = document.createElement('a');
    deleteBtn = document.createElement('a');
    pencilIcon = document.createElement('i');
    floppyIcon = document.createElement('i');
    deleteIcon = document.createElement('i');
    editBtn.href = '#';
    saveBtn.href = '#';
    deleteBtn.href = '#';
    editBtn.className = 'edit';
    saveBtn.className = 'save';
    deleteBtn.className = 'delete';
    editBtn.classList.add('mr-3');
    saveBtn.classList.add('mr-3');
    deleteBtn.classList.add('mr-3');
    pencilIcon.className = ('fa');
    floppyIcon.className = ('fa');
    deleteIcon.className = ('fa');
    pencilIcon.classList.add('fa-pencil');
    floppyIcon.classList.add('fa-floppy-o');
    deleteIcon.classList.add('fa-trash-o');
    editBtn.appendChild(pencilIcon);
    saveBtn.appendChild(floppyIcon);
    deleteBtn.appendChild(deleteIcon);
    saveBtn.addEventListener('click', saveAction);
    editBtn.addEventListener('click', editAction);
    deleteBtn.addEventListener('click', deleteAction);
    actionBlock.appendChild(editBtn);
    actionBlock.appendChild(saveBtn);
    actionBlock.appendChild(deleteBtn);
}

function saveAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    if (task.classList.contains('.edit')) {
        let textarea = task.querySelector('textarea[name="task"]');
        let taskValue = textarea.value;
        let label = document.createElement('label');
        textarea.parentElement.appendChild(label);
        label.innerHTML = taskValue;
        textarea.remove();
        task.classList.remove('.edit');
    }
}

function editAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    if (!task.classList.contains('.edit')) {
        let label = task.querySelector('label');
        let taskValue = label.innerText;
        let textarea = document.createElement('textarea');
        let form = document.createElement('div');

        form.className = 'form-group';
        textarea.className = 'w-100';
        textarea.name = 'task';
        textarea.value = taskValue;
        form.appendChild(textarea);
        label.parentElement.appendChild(form);
        label.remove();
        task.classList.add('.edit');
    }
}

function deleteAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    task.remove();
    removeUnfinishedHeader();
}

function checkAction(ev) {
    let task = this.closest('.list-group-item');
    let label = task.querySelector('label');
    let taskValue = label.innerText;
    task.remove();
    renderFinishedHeader();
    renderUnfinishedHeader();

    if (ev.target.checked) {
        renderTask(taskValue, finished);
    } else {
        renderTask(taskValue, unfinished);
    }
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
        firstAction.innerText = 'Вернуть обратно';
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