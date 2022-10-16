let list_storage = {};
let current_list;

window.onload = function() {
    if (!localStorage.getItem('list_storage')) {
        save()
    }

    document.querySelector("ul").innerHTML = "";

    list_storage = JSON.parse(localStorage.getItem('list_storage'));

    for (let i = 0; i < Object.keys(list_storage).length; i++) {
        let new_list = getListHTML(list_storage[Object.keys(list_storage)[i]].listName, Object.keys(list_storage)[i])
        document.querySelector("ul").innerHTML += new_list;
    }
}
    

function save() {
    localStorage.setItem('list_storage', JSON.stringify(list_storage));
}

function displayMenu() {
    let menu = document.querySelector("#left-content").style;

    if (menu.width == "60%") {
        menu.width = "0px";
    } else {
        menu.width = "60%";
    }
}

function load_list(id) {
    load_tasks(id)
    displayMenu();
 }

function load_tasks(id){
    list_storage = JSON.parse(localStorage.getItem('list_storage'));   

    current_list = [
        list_storage[id],
        id
    ];

    let todo_header = document.querySelector("#right-content");
    
    todo_header.querySelector('h2').innerText = `${current_list[0].listName}`;

    let list_container = document.querySelector("#todo-container");

    list_container.innerHTML = '';

    for (let task = 0; task < current_list[0].todos.length; task++) {
        list_container.innerHTML += `
            <div class="todo-task">
                <label class="check-box">
                    <input class="checkTask" type="checkbox" onclick="markCompleted(${current_list[0].todos[task].taskID})">
                    <span class="checkmark"></span>
                </label>
                <h3 id="${current_list[0].todos[task].taskID}">${current_list[0].todos[task].taskName}</h3>
                <div class="task-options">
                    <i class="fa-sharp fa-solid fa-pen-to-square" onclick="editButton('${current_list[0].todos[task].taskID}')"></i>
                    <i class="fa-sharp fa-solid fa-trash" onclick="deleteTask('${current_list[0].todos[task].taskID}')"></i>
                </div>
            </div>
        `;
    }
}

function deleteTask(id) {
    for (let i = current_list[0].todos.length - 1; i > -1; i--) {
        if (current_list[0].todos[i].taskID == id) {
            current_list[0].todos.splice(i, 1);
            break
        }
    }
    save();
    load_tasks(current_list[1]);
}

function eraseList(id) {
    delete list_storage[id];
    save();
    window.onload();
}

function getListHTML(name, id) {
    return `
        <div class="todo-list">
            <li id="${id}" onclick="load_list(${id})">
                <h4>${name}</h4>
            </li>
            <i class="fa-sharp fa-solid fa-trash" onclick="eraseList(${id})"></i>
        </div>
    `;
}

function store_list(name, id) {
    list_storage[id] = {
        listName: name,
        todos: [
            {
                taskName: "yo angelo",
                completed: false
            },
            {
                taskName: "because it is",
                completed: false
            }
        ]
    };
}

function addList() {
    let getName = document.querySelector("#listName");
    let check_name = getName.value ? getName.value : "Unamed";
    let random_id = Object.keys(list_storage).length + Math.round(Math.random() * 10000) / 10000;
    let new_list = getListHTML(check_name, random_id);
    
    store_list(check_name, random_id);
    save();

    document.querySelector("ul").innerHTML += new_list;
    
    getName.value = "";
}

function addTask() {
    let task_input = document.querySelector("#todoName");
    let add_todo = document.querySelector("#todo-container");
    let make_id = Math.random();

    add_todo.innerHTML += `
        <div class="todo-task">
            <label class="check-box" >
                <input class="checkTask" type="checkbox" onclick="markCompleted(${make_id})">
                <span class="checkmark"></span>
            </label>
            <h3 id="${make_id}">${task_input.value}</h3>
            <div class="task-options">
                <i class="fa-sharp fa-solid fa-pen-to-square" onclick="editButton('${make_id}')"></i>
                <i class="fa-sharp fa-solid fa-trash" onclick="deleteTask('${make_id}')"></i>
            </div>
        </div>
    `;

    current_list[0].todos.push({
        taskName: `${task_input.value}`,
        completed: false,
        taskID: make_id
    });
    save();

    task_input.value = "";
}

function markCompleted(id) {
    for (let i = 0; i < current_list[0].todos.length; i++) {
        if (current_list[0].todos[i].taskID == id) {
            current_list[0].todos[i].completed = current_list[0].todos[i].completed ? false : true;
            break
        }
    }
}

function deleteAllCompleted() {
    for (let i = current_list[0].todos.length - 1; i > -1; i--) {
        if (current_list[0].todos[i].completed == true) {
            current_list[0].todos.splice(i, 1);
        }
    }

    save();
    load_tasks(current_list[1]);
}

function editButton(id) {
    let editText = document.getElementById(id);

    if (editText.contentEditable == "true") {
        editText.contentEditable = false;
        editText.style.border = "none";

        for (let i = 0; i < current_list[0].todos.length; i++) {
            if (current_list[0].todos[i].taskID == id) {
                current_list[0].todos[i].taskName = editText.textContent;
            }
        }

        save()
    } else {
        editText.contentEditable = true;
        editText.style.border = "2px solid black";
    }
    
}