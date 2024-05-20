document.addEventListener("DOMContentLoaded", function() {
    const personBlock = document.getElementById("card-info-person");
    const orydieBlock = document.getElementById("card-info-orydie");
    const bossBlock = document.getElementById("card-info-boss");
    const dopBlock = document.getElementById("card-info-dop");
    const locationBlock = document.getElementById("card-info-location");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.classList.add("popup");
    overlay.appendChild(popup);

    function createCard(item, block, type) {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const name = document.createElement("p");
        name.textContent = item.name;

        card.appendChild(image);
        card.appendChild(name);

        card.addEventListener("click", function() {
            showPopup(item, type);
        });

        block.appendChild(card);
    }

    function showPopup(item, type) {
        let description = getDescription(item, type);

        popup.innerHTML = `
            <div class="popup-content">
                <button class="close-btn">✖</button>
                <h2>${item.name}</h2>
                <div class="popup-content__info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>${description}</div>
                </div>
            </div>
        `;
        overlay.classList.add("active");

        document.querySelector(".close-btn").addEventListener("click", closePopup);
        overlay.addEventListener("click", closePopup);
    }

    function getDescription(item, type) {
        switch (type) {
            case 'character':
                return `
                    <p><strong>Пол:</strong> ${item.gender}</p>
                    <p><strong>Здоровье:</strong> ${item.health}</p>
                    <p><strong>Сила:</strong> ${item.strength}</p>
                    <p><strong>Голод:</strong> ${item.hunger}</p>
                    <p><strong>Тип оружия:</strong> ${item.weapon_type}</p>
                    <p><strong>Дистрикт:</strong> ${item.district}</p>
                `;
            case 'weapon':
                return `
                    <p><strong>Качество:</strong> ${item.quality}</p>
                    <p><strong>Сила:</strong> ${item.strength}</p>
                `;
            case 'boss':
                return `
                    <p><strong>Здоровье:</strong> ${item.health}</p>
                    <p><strong>Сила:</strong> ${item.strength}</p>
                    <p><strong>Описание:</strong> ${item.description}</p>
                `;
            case 'extra':
                return `
                    <p><strong>Сила:</strong> ${item.strength}</p>
                    <p><strong>Здоровье:</strong> ${item.health}</p>
                    <p><strong>Голод:</strong> ${item.hunger}</p>
                `;
            case 'location':
                return `
                    <p><strong>Описание:</strong> ${item.description}</p>
                `;
            default:
                return '';
        }
    }

    function closePopup() {
        overlay.classList.remove("active");
    }

    function loadJSON(callback) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.open("GET", "../JSON/cards.json", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send(null);
    }

    loadJSON(function(response) {
        const jsonData = JSON.parse(response);

        jsonData.characters.forEach(function(character) {
            createCard(character, personBlock, 'character');
        });

        jsonData.weapons.forEach(function(weapon) {
            createCard(weapon, orydieBlock, 'weapon');
        });

        jsonData.bosses.forEach(function(boss) {
            createCard(boss, bossBlock, 'boss');
        });

        jsonData.extras.forEach(function(extra) {
            createCard(extra, dopBlock, 'extra');
        });

        jsonData.locations.forEach(function(location) {
            createCard(location, locationBlock, 'location');
        });
    });
});
