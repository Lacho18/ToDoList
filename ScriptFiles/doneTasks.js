let menuButton = document.getElementById("menuButton");
let doneToday = document.getElementById("doneToday");
doneToday.style.visibility = "hidden";
isAnimationg = false;

let ulListForComplitedTasks = document.createElement("ul");
ulListForComplitedTasks.style.color = "white";
ulListForComplitedTasks.id = "doneTodayUlElement";

let complitedTasks = [];

function divTitle() {
    let titleText = document.createElement("p");
    let todayDate = new Date();

    let year = todayDate.getFullYear();
    let month = String(todayDate.getMonth() + 1).padStart(2, '0');
    let day = String(todayDate.getDate()).padStart(2, '0');

    let date = `${day}-${month}-${year}`;
    titleText.innerHTML = "Tasks done on " +date;
    titleText.id = "titleText";
    doneToday.appendChild(titleText);
}

function setComplitedTasks(compTasks) {
    if(compTasks.length == 0) {
        let p = document.createElement("p");
        p.innerHTML = "No tasks done today";
        p.id = "Empty";
        p.className = "doneTodayProperties";
        doneToday.appendChild(p);
        doneToday.remove(ulListForComplitedTasks);
    }
    else {
        for(let i = 0; i < compTasks.length; i++) {
            let liElementForCompTask = document.createElement("li");
            liElementForCompTask.value = compTasks[i];
            liElementForCompTask.innerHTML = compTasks[i];
            ulListForComplitedTasks.appendChild(liElementForCompTask);
        }
        let p = document.getElementById("Empty");
        
        if(p) {
            doneToday.remove(p);
        }
        ulListForComplitedTasks.className = "doneTodayProperties";
        console.log(ulListForComplitedTasks);
        doneToday.appendChild(ulListForComplitedTasks);
    }
}

function addToCompleteTasks(taskValue) {
    complitedTasks.push(taskValue);
    clearList(ulListForComplitedTasks);
    setComplitedTasks(complitedTasks);
}

divTitle();

menuButton.addEventListener("click", () => {
    let childsOfDoneTodayDiv = doneToday.children;
    let intervalID;

    if(!isAnimationg) {
        menuButton.classList.add("animationRight");
        menuButton.classList.remove("animationLeft");
        menuButton.style.left = "20%";

        doneToday.style.visibility = "visible";
        doneToday.classList.add("animationOnDivRight");
        doneToday.classList.remove("animationOnDivLeft");
        doneToday.style.width = "20%";
        doneToday.style.visibility = "visible";

        intervalID = setInterval(() => {
            for (let i = 0; i < childsOfDoneTodayDiv.length; i++) {
                childsOfDoneTodayDiv[i].style.display = "block";
            }
            clearInterval(intervalID);
        }, 200);

        isAnimationg = true;
    }
    else {
        menuButton.classList.remove("animationRight");
        menuButton.classList.add("animationLeft");
        menuButton.style.left = "-1%";

        doneToday.classList.add("animationOnDivLeft");
        doneToday.classList.remove("animationOnDivRight");
        doneToday.style.width = "0%";
        
        intervalID = setInterval(() => {
            for (let i = 0; i < childsOfDoneTodayDiv.length; i++) {
                childsOfDoneTodayDiv[i].style.display = "none";
            }
            clearInterval(intervalID);
        }, 600);

        isAnimationg = false;
    }
});
