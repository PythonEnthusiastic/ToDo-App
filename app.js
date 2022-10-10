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
    list_storage = JSON.parse(localStorage.getItem('list_storage'));   

    current_list = [
        list_storage[id]
    ];

    let todo_header = document.querySelector("#right-content");
    
    todo_header.querySelector('h2').innerText = `${current_list[0].listName}`;

    let list_container = document.querySelector("#todo-container");

    list_container.innerHTML = '';

    for (let task = 0; task < current_list[0].todos.length; task++) {
        list_container.innerHTML += `
            <div class="todo-task">
                <label class="check-box">
                    <input class="checkTask" type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <h3>${current_list[0].todos[task].taskName}</h3>
            </div>
        `;
    }

    displayMenu();
 }

//  function addCurrentList() {

//  }

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
                taskName: "yo angelo"
            },
            {
                taskName: "because it is"
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

    add_todo.innerHTML += `
        <div class="todo-task">
            <label class="check-box">
                <input class="checkTask" type="checkbox">
                <span class="checkmark"></span>
            </label>
            <h3>${task_input.value}</h3>
            <i class="fa-sharp fa-solid fa-trash"></i>
        </div>
    `;

    current_list[0].todos.push({
        taskName: `${task_input.value}`
    });
    save();
    console.log(current_list)
    console.log(list_storage)

    task_input.value = "";
}