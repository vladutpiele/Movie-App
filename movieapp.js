const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1c9c066ad3e2a562aab5ecfd19b96759&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=1c9c066ad3e2a562aab5ecfd19b96759&query="'
const main = document.getElementById('main')

const form = document.getElementById('form')
const search = document.getElementById('search')

async function getMovies(url) {
    const result = await fetch(url);
    const data = await result.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        console.log(movie)
        const { title, poster_path, vote_average, overview } = movie;
        /// destructureaza obiectul 'movie' si creeaza 4 variabile :                                                                       
        /// title va fi de fapt movie.title

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3> ${title} </h3>
                <span class="${getClassByRate(vote_average)}"> ${vote_average} </span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    }
    return 'red'
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let val = search.value;
    if (val && val !== '') {
        getMovies(SEARCH_API + val)
        search.value = '';
    } else {
        window.location.reload();
    }
})

