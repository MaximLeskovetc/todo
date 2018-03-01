function addedTask(ev) {
    ev.preventDefault();
    let text = this.parentElement.querySelector('textarea');
    let value = text.value;

    if (value !== '') {
        renderUnfinishedHeader();
        renderTask(value, unfinished);
    }

    text.value = '';
    save();
}

function saveAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
    let textarea = task.querySelector('textarea[name="task"]');
    let taskValue = textarea.value;
    let label = document.createElement('label');

    textarea.parentElement.appendChild(label);
    label.innerHTML = taskValue;

    if (taskValue !== '') {
        textarea.remove();

        this.firstChild.classList.add('fa-pencil');
        this.firstChild.classList.remove('fa-floppy-o');
        this.addEventListener('click', editAction);
        this.removeEventListener('click', saveAction);

        save();
    }
}

function editAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');
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

    this.firstChild.classList.remove('fa-pencil');
    this.firstChild.classList.add('fa-floppy-o');
    this.removeEventListener('click', editAction);
    this.addEventListener('click', saveAction);
}

function deleteAction(ev) {
    ev.preventDefault();
    let task = this.closest('.list-group-item');

    task.remove();
    removeUnfinishedHeader();
    save();
}

function checkAction(ev) {
    let task = this.closest('.list-group-item');
    let label = task.querySelector('label');
    let taskValue = label.innerText;

    if (ev.target.checked) {
        renderTask(taskValue, finished);
    } else {
        renderTask(taskValue, unfinished);
    }

    task.remove();
    renderFinishedHeader();
    renderUnfinishedHeader();
    save();
}