document.addEventListener("DOMContentLoaded", function() {
    const filmsBlock = document.getElementById("card-film-info");

    function createCard(item, block) {
        const card = document.createElement("div");
        card.classList.add("card");

        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank"; 

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const name = document.createElement("p");
        name.textContent = item.name;

        link.appendChild(image);
        card.appendChild(link);
        card.appendChild(name);

        block.appendChild(card);
    }

    function loadJSON(callback) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("GET", "../JSON/films.json", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        xhr.send(null);
    }

    loadJSON(function(response) {
        if (response.films && Array.isArray(response.films)) {
            response.films.forEach(function(film) {
                createCard(film, filmsBlock);
            });
        }
    });
});
