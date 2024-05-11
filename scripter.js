const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
let selectedGenre = "Wisdom";
let api_url = `https://api.quotable.io/random?tags=${selectedGenre}&maxLength=100`;

async function getquote(url) {
    const response = await fetch(url);
    const data = await response.json();

    quoteElement.innerHTML = data.content;
    authorElement.innerHTML = data.author;
}

getquote(api_url);

const showFavoriteContainer = () => {
    document.getElementById('mother-box').style.display = 'none';
    document.getElementById('favorite-container').style.display = 'flex';
};

const closeFavoriteContainer = () => {
    document.getElementById('mother-box').style.display = 'block';
    document.getElementById('favorite-container').style.display = 'none';
};

document.getElementById('show-list').addEventListener('click', showFavoriteContainer);
document.getElementById('close-favorite').addEventListener('click', closeFavoriteContainer);

document.getElementById('clear-button').addEventListener('click', () => {
    clearFavoritesFromLocalStorage();
    displayFavorites();
});

let favourites = [];
const list = document.getElementById('list-of-favourite-quotes');

const displayFavorites = () => {
    list.innerHTML = '';
    favourites.forEach((q, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${q.content} - ${q.author}`;
        list.appendChild(listItem);
    });
};

const saveFavoritesToLocalStorage = () => {
    localStorage.setItem('favorites', JSON.stringify(favourites));
};

const clearFavoritesFromLocalStorage = () => {
    localStorage.removeItem('favorites');
    favourites = [];
    displayFavorites();
    const heartIcon = document.getElementById('favourite').firstElementChild;
};

const addToFavorites = () => {
    const heartIcon = document.getElementById('favourite').firstElementChild;
    heartIcon.classList.remove('fa-regular');
    heartIcon.classList.add('fa-solid', 'active');
    const content = quoteElement.innerText;
    const authorName = authorElement.innerText;
    const existsInFavorites = checkExistence(content, authorName);
    
    if (!existsInFavorites && favourites.length < 10) {
        favourites.push({ content, author: authorName });
        saveFavoritesToLocalStorage();
        displayFavorites();
    } else {
        alert("Limit has been reached!(10 MAX)");
    }
};

const checkExistence = (content, authorName) => {
    return favourites.some(
        (q) => q.content === content && q.author === authorName
    );
};

document.getElementById('favourite').addEventListener('click', addToFavorites);

window.addEventListener('load', () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
        favourites = JSON.parse(storedFavorites);
        displayFavorites();
    }
});

document.querySelector(".genre-box").addEventListener("click", (event) => {
    if (event.target.classList.contains("active")) return;
    const genreDivs = document.querySelectorAll(".genre-box div");
    genreDivs.forEach((div) => {
        div.classList.remove("active");
    });
    event.target.classList.add("active");
    updateGenre(event.target.textContent.trim());
});

function updateGenre(genre) {
    selectedGenre = genre;
    const maxLength = 100;
    api_url = `https://api.quotable.io/random?tags=${selectedGenre}&maxLength=${maxLength}`;
    getquote(api_url);
}

document.getElementById('btn').addEventListener('click', (event) => {
    event.preventDefault();
    getquote(api_url);
    document.getElementById('favourite').classList.remove('active');
});

document.getElementById("favourite").addEventListener("click", function() {
    var heartIcon = document.getElementById("heartIcon");
    heartIcon.classList.add("blink"); 
    
    setTimeout(function() {
        heartIcon.classList.remove("blink");
    }, 1000);
});
