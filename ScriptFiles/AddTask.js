let addDiv = document.getElementById("addButton");
//let TextField = document.getElementById("TextField");

//TextField.style.visibility = "hidden";

addDiv.onclick = () => {
    console.log("clicked");
    let textField = createTextField();
    let root = document.getElementById("root");
    root.appendChild(textField);
    addDiv.style.visibility = "hidden";
};

function createTextField() {
    let TextFieldComponent = document.createElement("div");
    TextFieldComponent.id = "TextField";

    let text = document.createElement('input');
    text.type = "text";
    text.id = "text";
    TextFieldComponent.appendChild(text);

    let buttonToAdd = document.createElement("button");
    buttonToAdd.id = "add";
    buttonToAdd.innerHTML = "Add to list" ;
    buttonToAdd.addEventListener("click", AddTask);
    TextFieldComponent.appendChild(buttonToAdd);

    let buttonToHide = document.createElement("button");
    buttonToHide.id = "hide";
    buttonToHide.innerHTML = "Hide";
    buttonToHide.addEventListener("click", HideDiv);
    TextFieldComponent.appendChild(buttonToHide);

    return TextFieldComponent;
}

function AddTask() {
    let taskValue = document.getElementById("text");
    console.log(taskValue.value);

    if(taskValue.value !== "") {
        if(checkForRepeat(list, taskValue.value)) {
            tasksContext.push(taskValue.value);
            clearList(list);
            updateList(tasksContext);
        }
    }
}

function HideDiv() {
    let divToHide = document.getElementById("TextField");
    divToHide.remove();

    addDiv.style.visibility = "visible";
}