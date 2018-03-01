function renderMain() {
    let mainContainer, mainRow, mainContent,
        mainUnfinishedHeader, mainApp, mainSearch,
        mainUnfinished, mainFinishedHeader,
        mainFinished, mainAddTaskBlock;

    mainApp = document.querySelector('.app');
    mainContainer = document.createElement('div');
    mainRow = document.createElement('div');
    mainContent = document.createElement('ul');
    mainUnfinishedHeader = document.createElement('ul');
    mainUnfinished = document.createElement('ul');
    mainFinishedHeader = document.createElement('ul');
    mainFinished = document.createElement('ul');
    mainContainer.className = 'container';
    mainRow.className = 'row';
    mainContent.className = 'list-group';
    mainUnfinishedHeader.className = 'unfinished-header';
    mainUnfinished.className = 'unfinished';
    mainFinishedHeader.className = 'finished-header';
    mainFinished.className = 'finished';
    mainContent.classList.add('mt-3');
    mainContent.classList.add('w-100');
    mainAddTaskBlock = renderAddTaskBlock();
    mainSearch = renderSearch();

    mainContent.appendChild(mainSearch);
    mainContent.appendChild(mainAddTaskBlock);
    mainContent.appendChild(mainUnfinishedHeader);
    mainContent.appendChild(mainUnfinished);
    mainContent.appendChild(mainFinishedHeader);
    mainContent.appendChild(mainFinished);
    mainRow.appendChild(mainContent);
    mainContainer.appendChild(mainRow);
    mainApp.appendChild(mainContainer);

    app = mainApp;
    searchEl = mainSearch;
    finished = mainFinished;
    unfinished = mainUnfinished;
    finishedHeader = mainFinishedHeader;
    unfinishedHeader = mainUnfinishedHeader;
}

function renderAddTaskBlock() {
    let title, content, textarea, addBtn, addTask;

    addTask = document.createElement('ul');
    title = document.createElement('li');
    content = document.createElement('li');
    textarea = document.createElement('textarea');
    addBtn = document.createElement('a');
    addTask.classList.add('.add-task');
    addTask.classList.add('mb-3');
    addBtn.classList.add('btn');
    addBtn.classList.add('btn-primary');
    addBtn.classList.add('float-right');
    addBtn.classList.add('mt-1');
    addBtn.href = '#';
    addBtn.innerText = 'Добавить';
    title.className = 'list-group-item';
    content.className = 'list-group-item';
    textarea.className = 'w-100';
    textarea.placeholder = 'Добавить новое задание';
    title.classList.add('active');
    content.classList.add('pb-5');
    title.innerText = 'Добавить новое задание';
    addBtn.addEventListener('click', addedTask);

    content.appendChild(textarea);
    content.appendChild(addBtn);
    addTask.appendChild(title);
    addTask.appendChild(content);

    return addTask
}


function renderSearch() {
    let searchElement, title, content, input, searchBtn, error;

    searchElement = document.createElement('ul');
    content = document.createElement('li');
    input = document.createElement('input');
    searchBtn = document.createElement('a');
    error = document.createElement('span');
    searchBtn.href = '#';
    searchBtn.innerText = 'Поиск';
    searchBtn.classList.add('btn');
    searchBtn.classList.add('btn-primary');
    searchBtn.classList.add('float-right');
    searchBtn.classList.add('mt-1');
    error.className = 'float-left';
    input.className = 'w-100';
    content.className = 'list-group-item';
    content.classList.add('pb-5');
    searchElement.className = 'search';
    searchElement.classList.add('mb-3');
    title = document.createElement('li');
    title.className = 'list-group-item';
    title.classList.add('active');
    title.innerText = 'Поиск';
    searchBtn.addEventListener('click', search);

    if (data.searchText !== undefined) {
        input.value = data.searchText;
    }

    content.appendChild(input);
    content.appendChild(searchBtn);
    content.appendChild(error);
    searchElement.appendChild(title);
    searchElement.appendChild(content);

    return searchElement;
}

function renderActionBtn(actionBlock) {
    let editBtn, deleteBtn, pencilIcon, deleteIcon;

    editBtn = document.createElement('a');
    deleteBtn = document.createElement('a');
    pencilIcon = document.createElement('i');
    deleteIcon = document.createElement('i');
    editBtn.href = '#';
    deleteBtn.href = '#';
    editBtn.className = 'edit';
    deleteBtn.className = 'delete';
    editBtn.classList.add('mr-3');
    deleteBtn.classList.add('mr-3');
    pencilIcon.className = ('fa');
    deleteIcon.className = ('fa');
    pencilIcon.classList.add('fa-pencil');
    deleteIcon.classList.add('fa-trash-o');
    editBtn.appendChild(pencilIcon);
    deleteBtn.appendChild(deleteIcon);
    editBtn.addEventListener('click', editAction);
    deleteBtn.addEventListener('click', deleteAction);
    actionBlock.appendChild(editBtn);
    actionBlock.appendChild(deleteBtn);
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