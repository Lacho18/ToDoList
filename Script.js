let list = document.createElement("ul");
let taskDiv = document.getElementById("Tasks");
let addButton = document.getElementById("add");
let textField = document.getElementById("text");

let tasksContext = ["Go to the gym", "Swim", "Go to the store", "Buy food for dinner"];

taskDiv.appendChild(list);

function updateList(tasks) {
    for(let i = 0; i < tasks.length; i++) {
        let task = document.createElement("li");
        task.appendChild(taskText(tasks[i]));
        task.id = tasks[i];
        list.appendChild(task);
    }
}

function taskText(text) {
    let greenButton = document.createElement("button");
    greenButton.innerHTML = "G";
    greenButton.id = text+" CORRECT";
    greenButton.className = "CompleteTaskButton";
    
    greenButton.style.b
    /*let redButton = document.createElement("button");
    redButton.innerHTML = "R";
    redButton.id = text+" INCORRECT";*/

    greenButton.addEventListener("click", () => {onGreenButtonClick(greenButton.id)});

    let paragraf = document.createElement("p");
    paragraf.innerHTML = text;
    paragraf.appendChild(greenButton);
    //paragraf.appendChild(redButton);
    return paragraf;
}

function onGreenButtonClick(buttonID) {
    let textValue = buttonID;
    textValue = textValue.replace(" CORRECT", "");
    for(let i = 0; i < tasksContext.length; i++) {
        if(tasksContext[i] === textValue) {
            tasksContext.splice(i, 1);
            clearList();
            updateList(tasksContext);
        }
    }
}

function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function checkForRepeat(ulElement, value) {
    for(let i = 0; i < ulElement.children.length; i++) {
        if(ulElement.children[i].id === value) {
            return false;
        }
    }

    return true;
}

addButton.addEventListener("click", () => {
    if(textField.value !== "") {
        if(checkForRepeat(list, textField.value)) {
            tasksContext.push(textField.value);
            clearList();
            updateList(tasksContext);
        }
    }
});

updateList(tasksContext);