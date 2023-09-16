let today = new Date();
let text = document.querySelector("#review");
let btn = document.querySelector("#add-btn");
let list = document.querySelector("#list");
let url = 'https://looklikeliedns.onrender.com/review';

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
    let gg = await response.json();
    return gg;
}

// async function get_rev(){
//     let response = await fetch(url + '/all');
//     return await response.json();
// }

reviews = get_request(url + '/all');
// let rev = reviews;
// console.log(rev[1].text);
// for(let i = 0; i < 5; i++){
//     addUIItem(reviews[i].text);
// }



btn.addEventListener("click", () => {
    let now = today.toLocaleString();
    let txt = text.value.trim();
    post_request(url + '/create', {
        text: txt,
    });
    if (txt === "") {
        alert("Please, enter your review");
    } else {
        txt = '[ ' +  now + ' ] ' + txt;
        text.value = "";
        addUIItem(txt);
    }
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