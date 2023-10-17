let list = document.querySelector("#list");
// let url = 'https://looklikeliedns.onrender.com/review';
let url = 'http://localhost:8000/product'
const get_request = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
    });
    return await response.json();
}
gg = get_request(url + '/all');
gg.then((result) => {
    result.forEach((element) => addUIItem(element));
});
function addUIItem(element) {
    let section = document.createElement("section");
    section.classList.add('section');
    let div = document.createElement("div");
    div.classList.add('current-description');
    let h2 = document.createElement("h2");
    h2.classList.add('about-pos-head');
    h2.textContent = element.title;
    let p = document.createElement("p");
    p.classList.add('short-about-pos');
    p.textContent = element.content;
    div.appendChild(h2);
    div.appendChild(p);
    let div_price = document.createElement("div");
    div_price.classList.add('price');
    let h2_price = document.createElement("h2");
    h2_price.classList.add('digit-price');
    h2_price.textContent = element.price + "$";
    div_price.appendChild(h2_price);
    let div2 = document.createElement("div");
    div2.classList.add('white-space-price');
    div_price.appendChild(div2);
    let div_text = document.createElement("div");
    let btn = document.createElement("button");
    div_text.classList.add('add-icon');
    btn.textContent = "добавить в заказ";
    div_text.appendChild(btn);
    div_price.appendChild(div_text);
    section.appendChild(div);
    section.appendChild(div_price);
    list.insertBefore(section, list.childNodes[0]);
}