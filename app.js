let list_storage = {};

function displayMenu() {
    let menu = document.querySelector("#left-content").style;

    if (menu.width == "60%") {
        menu.width = "0px";
    } else {
        menu.width = "60%";
    }
}

function load_list(id) {
    let todo_header = document.querySelector("#right-content");
    
    todo_header.innerHTML = `
        <h2>${list_storage[id].listName}</h2>
        <hr>
        <div id="todo-container">
        </div>
    `;

    let list_container = document.querySelector("#todo-container");

    for (let task = 0; task < list_storage[id].todos.length; i++) {
        list_container.innerHTML += `
            <div class="todo-task">
                <label class="check-box">
                    <input class="checkTask" type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <h3>${list_storage[id].todos[0].taskName}</h3>
            </div>
        `;
    }
 }

function getListHTML(name) {
    return `
        <li id="${Object.keys(list_storage).length}" onclick="load_list(${Object.keys(list_storage).length})">
            <h4>${name}</h4>
        </li>
    `;
}

function store_list(name) {
    list_storage[Object.keys(list_storage).length] = {
        listName: name,
        todos: [
            {
                taskName: "yo angelo"
            }
        ]
    };
}

function addList() {
    let getName = document.querySelector("#listName").value;
    let check_name = getName ? getName : "Unamed";
    let new_list = getListHTML(check_name);
    
    store_list(check_name);

    document.querySelector("ul").innerHTML += new_list;
}