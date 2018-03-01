let data = load();

function addedTask(ev) {
    ev.preventDefault();
    let text = addTask.querySelector('textarea');
    let value = text.value;

    if (value !== '') {
        renderUnfinishedHeader();
        renderTask(value, unfinished);
    }

    text.value = '';
    save();
}

function save() {
    let finishedTasks = [];
    let unfinishedTasks = [];

    if (unfinished.childNodes.length !== 0 || finished.childNodes.length !== 0) {
        for (let task of unfinished.childNodes) {
            unfinishedTasks.unshift(task.querySelector('label').innerText);
        }
        for (let task of finished.childNodes) {
            finishedTasks.unshift(task.querySelector('label').innerText);
        }
    }

    localStorage.removeItem('data');
    localStorage.setItem('data', JSON.stringify({finished: finishedTasks, unfinished: unfinishedTasks}));
}

function load() {
    return JSON.parse(localStorage.getItem('data'));
}

function init() {
    addBtn.addEventListener('click', addedTask);

    for (let i = 0; i < data.finished.length; i++) {
        renderFinishedHeader();
        renderTask(data.finished[i], finished)
    }

    for (let i = 0; i < data.unfinished.length; i++) {
        renderUnfinishedHeader();
        renderTask(data.unfinished[i], unfinished)
    }
}

init();