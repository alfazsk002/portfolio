let input = document.querySelector("#taskInput");
let btn = document.querySelector("#addBtn");
let list = document.querySelector("#taskList");

let countText = document.createElement("h4");
document.querySelector(".container").appendChild(countText);

// load saved tasks
window.onload = function(){
    let data = JSON.parse(localStorage.getItem("tasks")) || [];
    data.forEach(task => createTask(task.text, task.completed));
    updateCount();
};

// add button click
btn.addEventListener("click", addTask);

// Enter press
input.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){
    let text = input.value;

    if(text === ""){
        alert("Write something!");
        return;
    }

    createTask(text, false);
    saveTasks();
    updateCount();

    input.value = "";
}

// create task function
function createTask(text, completed){

    let li = document.createElement("li");
    li.innerText = text;

    if(completed){
        li.style.textDecoration = "line-through";
    }

    // complete toggle
    li.addEventListener("click", function(){
        li.style.textDecoration =
        li.style.textDecoration === "line-through" ? "none" : "line-through";

        saveTasks();
    });

    // delete button
    let delBtn = document.createElement("button");
    delBtn.innerText = "X";

    delBtn.addEventListener("click", function(e){
        e.stopPropagation(); // prevent line-through click
        li.remove();
        saveTasks();
        updateCount();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
}

// count update
function updateCount(){
    let total = list.children.length;
    countText.innerText = "Total Tasks: " + total;
}

// save to localStorage
function saveTasks(){
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].nodeValue,
            completed: li.style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}