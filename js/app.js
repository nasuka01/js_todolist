const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

// タスクを保存する関数
function saveTodos() {
    const todos = [];
    const listItems = document.querySelectorAll("#todo-list li");

    listItems.forEach(item => {
        todos.push({
            text: item.textContent.replace("完了削除", "").trim(),
            completed: item.classList.contains("compDisplay")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

// 削除ボタンの作成
function deleteBtn(newTodo) {
    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.textContent = "削除";
    newTodo.appendChild(newDeleteBtn);
    newDeleteBtn.classList.add("deleteBtn");

    // 削除ボタンクリック時の挙動
    newDeleteBtn.addEventListener("click", function(event) {
        todoList.removeChild(event.target.parentElement);
        saveTodos(); 
    });
}

// 完了ボタンの作成
function compBtn(newTodo,spanText) {
    const newCompBtn = document.createElement("button");
    newCompBtn.textContent = "完了";
    newTodo.appendChild(newCompBtn);
    newCompBtn.classList.add("compBtn");

    newCompBtn.addEventListener("click", function() {
        spanText.classList.toggle("compDisplay");
        saveTodos();
    });
}

// リスト追加
function addTodo() {
    const newTodo = document.createElement("li");
    const spanText = document.createElement("span");    
    spanText.textContent = todoInput.value;

    todoList.appendChild(newTodo);
    newTodo.appendChild(spanText);
    todoInput.value = '';
    compBtn(newTodo,spanText);
    deleteBtn(newTodo);

    saveTodos(); // タスクが追加された後に保存
}

// ボタンのクリックイベント
addBtn.addEventListener("click", function(event) {
    
    if (todoInput.value.trim() === "") {
        event.preventDefault();
        return;
    }
    addTodo();
});

// ページ読み込み時にタスクリストを復元
window.addEventListener("load", function() {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
        savedTodos.forEach(todo => {
            const spanText = document.createElement("span");
            spanText.textContent = todo.text;
          if (todo.completed){                  　　　                         spanText.classList.add("compDisplay");

            compBtn(spanText);
            deleteBtn(spanText);

            todoList.appendChild(spanText);
           }
        });
    }
});
