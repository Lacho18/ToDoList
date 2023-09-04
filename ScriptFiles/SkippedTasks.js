selectMenu.id = "selectMenu";
label.for = "selectMenu";
label.innerHTML = "Skipped tasks";
let emptyOption = document.createElement("option");
emptyOption.innerHTML = "-------";
selectMenu.appendChild(emptyOption);

skippedTaskDiv.appendChild(label);
skippedTaskDiv.appendChild(selectMenu);
skippedTaskDiv.style.visibility = "hidden";

function addToSkipList(value) {
    if(chekForRepeateInArray(skippedTask, value)) {
        let option = document.createElement("option");
        option.innerHTML = value;
        option.value = value;
        option.id = value;
        selectMenu.appendChild(option);
        skippedTask.push(value);
        skippedTaskDiv.style.visibility = "visible";
    }
}

function chekForRepeateInArray(array, value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] === value) {
            return false;
        }
    }
    return true;
}

function onSelectedOption(optionValue) {
    returnToTheMainList(optionValue, "returnDiv", "Do you want to send task back to the list", yesNoButtonHandler);
}

selectMenu.addEventListener("change", () => {
    onSelectedOption(selectMenu.value);
});

function removeOption(optionID) {
    let optionToRemove = document.getElementById(optionID);
    console.log(optionToRemove);
    optionToRemove.remove();
    if(selectMenu.options.length == 1) {
        skippedTaskDiv.style.visibility = "hidden";
    }
}

/*function returnToTheMainList(taskContext) {
    let returnDiv = document.createElement("div");
    returnDiv.id = "returnDiv";
    returnDiv.className = "skippedTask";
    let h2Text = document.createElement("h2");
    h2Text.innerHTML = `Do you want to send task "${taskContext}" back to the list`;
    let yesButton = document.createElement("button");
    yesButton.innerHTML = "YES";
    yesButton.style.backgroundColor = "#66ff33";
    let noButton = document.createElement("button");
    noButton.innerHTML = "NO";
    noButton.style.backgroundColor = "#e62e00";
    noButton.id = "NO"

    yesButton.addEventListener("click", () => {
        yesNoButtonHandler(true, taskContext);
    });

    noButton.addEventListener("click", () => {
        yesNoButtonHandler(false, taskContext);
    });

    returnDiv.appendChild(h2Text);
    returnDiv.appendChild(yesButton);
    returnDiv.appendChild(noButton);
    let body = document.querySelector("body");
    body.appendChild(returnDiv);
}*/

function yesNoButtonHandler(boolean, context) {
    if(boolean) {
        tasksContext.push(context);
        clearList(list);
        let returnDiv = document.getElementById("returnDiv");
        if (returnDiv) {
            returnDiv.remove();
        }
        removeOption(context);
        updateList(tasksContext);
    }
    else {
        let returnDiv = document.getElementById("returnDiv");

        if (returnDiv) {
            returnDiv.remove();
        }
        returnToTheMainList(context, "deleteDiv", "Do you want to delete this task?", deleteFromSkippedListOption);
    }
    
}

function returnToTheMainList(taskContext, divId, h2Context, buttonFunction) {
    let returnDiv = document.createElement("div");
    returnDiv.id = divId;
    returnDiv.className = "skippedTask";
    let h2Text = document.createElement("h2");
    let contextOfH2 = h2Context;

    if(contextOfH2.includes("task")) {
        let newContextOfH2 = contextOfH2.replace(new RegExp("task", "g"), "task " + taskContext);
        h2Text.innerHTML = newContextOfH2;
    }
    else {
        h2Text.innerHTML = contextOfH2;
    }
    
    let yesButton = document.createElement("button");
    yesButton.innerHTML = "YES";
    yesButton.style.backgroundColor = "#66ff33";
    let noButton = document.createElement("button");
    noButton.innerHTML = "NO";
    noButton.style.backgroundColor = "#e62e00";
    noButton.id = "NO"

    yesButton.addEventListener("click", () => {
        buttonFunction(true, taskContext);
    });

    noButton.addEventListener("click", () => {
        buttonFunction(false, taskContext);
    });

    returnDiv.appendChild(h2Text);
    returnDiv.appendChild(yesButton);
    returnDiv.appendChild(noButton);
    let body = document.querySelector("body");
    body.appendChild(returnDiv);
}

function deleteFromSkippedListOption(boolean, option) {
    if(boolean) {
        removeOption(option);
    }
    let deleteDiv = document.getElementById("deleteDiv");

    if (deleteDiv) {
        deleteDiv.remove();
    }
}
