const form = document.getElementById("form")
const input = document.getElementById("input")
const todosList = document.getElementById("todos")

const todos = JSON.parse(localStorage.getItem("todos"))

if(todos) {
    todos.forEach(todo => {
        createTodo(todo)
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    createTodo()
})

function createTodo(todo) {
    let todoText = input.value;

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement("li")

        if(todo && todo.completed) {
            todoEl.classList.add("completed")
        }

        todoEl.innerText = todoText

        todoEl.addEventListener("click", (e) => {
            e.preventDefault()
            todoEl.classList.toggle("completed")
            updateLocalStorage();
        })
        todoEl.addEventListener("contextmenu", () => {
            todoEl.remove()
            updateLocalStorage()
        })

        todosList.appendChild(todoEl)

        input.value = "";

        updateLocalStorage()
    }
}

function updateLocalStorage() {
    todoEls = document.querySelectorAll("li");

    const todos = [];

    todoEls.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })

    localStorage.setItem("todos", JSON.stringify(todos))
}