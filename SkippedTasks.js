selectMenu.id = "selectMenu";
label.for = "selectMenu";
label.innerHTML = "Skipped tasks";
let emptyOption = document.createElement("option");
emptyOption.innerHTML = "-------";
selectMenu.appendChild(emptyOption);

skippedTaskDiv.appendChild(label);
skippedTaskDiv.appendChild(selectMenu);
skippedTaskDiv.style.visibility = "hidden";

returnToTheMainList("Nothing here");

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
    //console.log(skippedTask);
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
    returnToTheMainList(optionValue);
}

selectMenu.addEventListener("change", () => {
    onSelectedOption(selectMenu.value);
});

function removeOption(optionID) {
    let optionToRemove = document.getElementById(optionID);
    console.log(optionToRemove);
    optionToRemove.remove();
}

function returnToTheMainList(taskContext) {
    let returnDiv = document.createElement("div");
    returnDiv.id = "returnDiv";
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
        //yesNoButtonHandler(false, taskContext);
    });

    noButton.addEventListener("click", () => {
        yesNoButtonHandler(false, taskContext);
    });

    returnDiv.appendChild(h2Text);
    returnDiv.appendChild(yesButton);
    returnDiv.appendChild(noButton);
    let body = document.querySelector("body");
    body.appendChild(returnDiv);
}

function yesNoButtonHandler(boolean, context) {
    console.log(context)
    if(boolean) {
        tasksContext.push(context);
        clearList();
        updateList(tasksContext);
        yesNoButtonHandler(false, context);
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! PROBLEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        removeOption(context);
    }
    else {
        let returnDiv = document.getElementById("returnDiv");

        if (returnDiv) {
            returnDiv.remove();
        }
    }
    
}

/*let noButton = document.getElementById("NO");
    noButton.click();*/
