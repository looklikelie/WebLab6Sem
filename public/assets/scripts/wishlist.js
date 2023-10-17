let today = new Date();
let inputt = document.querySelector("#todo");
let btn = document.querySelector("#add-btn");
let list = document.querySelector("#list");
let delAll = document.querySelector("#del-btn");
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addUIItem(txt) {
    let li = document.createElement("li");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0]);
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.width = "35px";
    delBtn.style.height = "35px";
    delBtn.style.borderRadius = "5px";
    delBtn.style.fontSize = "20px";
    delBtn.style.marginLeft = "10px";
    delBtn.style.backgroundColor = "#333336";
    delBtn.style.border = "none";


    li.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        savedTasks = savedTasks.filter((e) => e !== txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    });
}

savedTasks.forEach(addUIItem);

function add_to_LS(){
    let now = today.toLocaleString();
    let txt = inputt.value.trim();
    if (txt === "") {
        alert("Please, enter your wish...");
    } else {
        //txt = txt.bold();
        txt = '[ ' +  now + ' ] ' + txt;
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        inputt.value = "";
        addUIItem(txt);
    }
}

inputt.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ){
        add_to_LS();
    }
});

btn.addEventListener("click", () => {
    add_to_LS();
});

delAll.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});

list.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
    }
});
