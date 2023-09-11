let btn = document.querySelector("#btn");
let input = document.querySelector("#rm-name");
let preloaderEl = document.getElementById('preloader');

btn.addEventListener("click", () => {
    let txt = input.value.trim();
    if (txt === "") {
        alert("Введите имя персонажа");
    } else {
        loadData(txt).then(setTimeout(() => {
            //let preloaderEl = document.getElementById('preloader');
            preloaderEl.classList.add('hidden');
            preloaderEl.classList.remove('visible');

        }), 1500);

    }
});


async function loadData(name) {
    let correct_url = "https://rickandmortyapi.com/api/character/?name=" + name;
    let response = await fetch(correct_url)
    // .then(response => response.json())

    if (response.ok) {

        response = await response.json();
        let charInfo = response.results[0];
        //var obj = JSON.parse(response)
        let charImage = '<img src="' + charInfo.image + '">';
        document.getElementById("character-image").innerHTML = charImage;
        document.getElementById("character-name").innerHTML = charInfo.name;

        if(charInfo.status == "Alive") {
            document.getElementById("character-status-type").style.color = '#1fd655';
            document.getElementById("character-status-type").innerHTML = charInfo.status + " - " + charInfo.species;
        } if(charInfo.status == "Dead") {
            document.getElementById("character-status-type").style.color = '#f01e2c';
            document.getElementById("character-status-type").innerHTML = charInfo.status + " - " + charInfo.species;
        } if(charInfo.status == "unknown") {
            document.getElementById("character-status-type").style.color = '#828282';
            document.getElementById("character-status-type").innerHTML = charInfo.status + "... - " + charInfo.species;
        }

        document.getElementById("character-gender").innerHTML = "Gender: " + charInfo.gender;
        document.getElementById("character-origin").innerHTML = "Last known location: "  +  charInfo.origin.name;

        let textForLink = "First episode link";
        let firstEpisodeHTML = textForLink.link(charInfo.episode[0]);
        document.getElementById("character-first-episode").innerHTML = firstEpisodeHTML + " (click)";

        console.log(firstEpisodeHTML)
    } else {
        alert("Ошибка HTTP: " + response.status);
    }


}