const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

async function loadTodos() {
    const res = await fetch("/api/todos");
    const todos = await res.json();

    list.innerHTML = "";
    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(delBtn);
        list.appendChild(li);
    });
    
}

form.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const text = input.value.trim();
    if(!text) return;

    await fetch("/api/todos",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({text:text})
    });

    input.value = "";
    loadTodos();
})

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`,{method:"DELETE"});
    loadTodos();
}

loadTodos();