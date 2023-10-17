let today = new Date();
let text = document.querySelector("#review");
let btn = document.querySelector("#add-btn");
let list = document.querySelector("#list");
let url = 'https://looklikeliedns.onrender.com/review';
// let url = 'http://localhost:8000/review'

const post_request = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const get_request = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
    });
    return await response.json();
}

gg = get_request(url + '/all');
gg.then((result) => {
    result.forEach((element) => addUIItem(element.text));
});

function add_to_BD(){
    let now = today.toLocaleString();
    let txt = text.value.trim();
    if (txt === "") {
        alert("Please, enter your review");
    } else {
        txt = '[ ' +  now + ' ] ' + txt;
        post_request(url + '/create', {
            text: txt,
        });
        text.value = "";
        addUIItem(txt);
    }
}

text.addEventListener( 'keyup', event => {
    if( event.code === 'Enter' ){
        add_to_BD();
    }
});

btn.addEventListener("click", () => {
    add_to_BD();
});

function addUIItem(txt) {
    let li = document.createElement("li");
    li.innerHTML = txt;
    list.insertBefore(li, list.childNodes[0]);
}

list.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
    }
});
