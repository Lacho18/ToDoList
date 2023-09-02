let list = document.createElement("ul");
let taskDiv = document.getElementById("Tasks");
let addButton = document.getElementById("add");
let textField = document.getElementById("text");

//Data used in SkippedTask.js file  -------------------------------------------------
let skippedTask = [];
let selectMenu = document.createElement("select");
let label = document.createElement("label");
let skippedTaskDiv = document.getElementById("skippedTasks");
//-----------------------------------------------------------------------------------

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

function updateList(tasks, specificTask) {
    console.log("Tuka sum be");
    for(let i = 0; i < tasks.length; i++) {
        let task = document.createElement("li");
        task.appendChild(taskText(tasks[i]));
        task.id = tasks[i];
        list.appendChild(task);
    }

    IgnoredTaskHandle(specificTask);
    let interval = setInterval(() => {
        addToSkipList(specificTask);
        onGreenButtonClick(specificTask);
        clearInterval(interval);
    }, 1000 * 1);
}

function taskText(text) {
    let greenButton = document.createElement("button");
    let bookmarkImage = document.createElement("img");
    bookmarkImage.src = "Images/Bookmark.png";
    greenButton.appendChild(bookmarkImage);
    greenButton.id = text+" CORRECT";
    greenButton.className = "CompleteTaskButton";
    greenButton.style.backgroundColor = "#66ff33";
    
    let redButton = document.createElement("button");
    let XImage = document.createElement("img");
    XImage.src = "Images/X.png";
    redButton.appendChild(XImage);
    redButton.id = text+" INCORRECT";
    redButton.className = "CompleteTaskButton";
    redButton.style.backgroundColor = "#e62e00";

    greenButton.addEventListener("click", () => {onGreenButtonClick(greenButton.id)});
    redButton.addEventListener("click", () => {onRedButtonClick(redButton.id);});

    let paragraf = document.createElement("p");
    paragraf.innerHTML = text;
    paragraf.appendChild(greenButton);
    paragraf.appendChild(redButton);
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

function onRedButtonClick(buttonID) {
    let textValue = buttonID;
    textValue = textValue.replace(" INCORRECT", "");

    for(let i = 0; i < tasksContext.length; i++) {
        if(textValue === tasksContext[i]) {
            
            if(textValue !== tasksContext[tasksContext.length - 1]) {
                tasksContext = Arrangement(tasksContext, i);
            }

            clearList();
            updateList(tasksContext, textValue);
            break;
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

function Arrangement(array, markedIndex) {
    let j = array[markedIndex];
    if(j != array.length - 1) {
        array.push(j);
        array.splice(markedIndex, 1);
    }

    return array;
}

function IgnoredTaskHandle(taskID) {
    let liElement = document.getElementById(taskID);
    liElement.style.backgroundColor = "rgba(89, 89, 89, 0.5)";
    liElement.style.borderRadius = "12px";
    liElement.style.opacity = "0.6";
    let button1 = document.getElementById(taskID + " CORRECT");
    let button2 = document.getElementById(taskID + " INCORRECT");
    button1.remove();
    button2.remove();
}

updateList(tasksContext);
