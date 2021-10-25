// --------------N1--------------
const getMovieAge = function (movie) {
    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
        .then((res) => res.json())
        .then((data) => console.log(`Movie "${data.Title}" created  ${new Date().getFullYear() - data.Year} years ago`));
};
getMovieAge("Avatar");
// --------------N2--------------
const getMovieActor = function (movie) {
    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
        .then((res) => res.json())
        .then((data) => {
        let x = data.Actors.split(", ");
        for (const i of x) {
            console.log(i.split(" ")[0]);
        }
    });
};
getMovieActor("Madagascar");
// --------------N3--------------
function getMovieCountry(movie) {
    fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
        .then((res) => res.json())
        .then(function (x) {
        return fetch(`https://restcountries.com/v3.1/name/ ${x.Country}`);
    })
        .then((res) => res.json())
        .then((x) => console.log(`Movie ${movie} is from ${x[0].name.common}, where currency is ${x[0].currencies.JPY.name}`))
        .catch((err) => console.log(err));
}
getMovieCountry("one punch man");
// --------------N4--------------
const getJson = function (url) {
    return fetch(url)
        .then((res) => res.json())
        .then(function (x) {
        return Number(x.Runtime.split(" ")[0]);
    });
};
const moviesTimeSum = function (movie1, movie2, movie3) {
    Promise.all([
        getJson(`http://www.omdbapi.com/?t=${movie1}&apikey=9c23e035`).then((y) => Number(y)),
        getJson(`http://www.omdbapi.com/?t=${movie2}&apikey=9c23e035`).then((z) => Number(z)),
        getJson(`http://www.omdbapi.com/?t=${movie3}&apikey=9c23e035`).then((x) => Number(x)),
    ])
        .then((x) => x.reduce((acc, curr) => (acc += curr)))
        .then((x) => console.log(`${Math.floor(x / 60)}:${x % 60}`));
};
moviesTimeSum("avatar", "madagascar", "one punch man");
// --------------N5--------------
const movieName = function (url) {
    return fetch(url)
        .then((res) => res.json())
        .then((x) => x.Country.split(", ")[0]);
};
const countryPpl = function (url) {
    return fetch(url)
        .then((x) => x.json())
        .then((y) => y[0].population);
};
const ppltotals = function (movie1, movie2, movie3) {
    Promise.all([
        movieName(`http://www.omdbapi.com/?t=${movie1}&apikey=9c23e035`).then((x) => x),
        movieName(`http://www.omdbapi.com/?t=${movie2}&apikey=9c23e035`).then((x) => x),
        movieName(`http://www.omdbapi.com/?t=${movie3}&apikey=9c23e035`).then((x) => x),
    ])
        .then((x) => {
        const arr = [...x];
        return arr;
    })
        .then((x) => {
        return Promise.all([
            countryPpl(`https://restcountries.com/v3.1/name/ ${x[0]}`),
            countryPpl(`https://restcountries.com/v3.1/name/ ${x[1]}`),
            countryPpl(`https://restcountries.com/v3.1/name/ ${x[2]}`),
        ]);
    })
        .then((x) => x.reduce((acc, cur) => (acc += cur)))
        .then((x) => console.log(`total amount of population = ${x}`));
};
ppltotals("Avatar", "RocknRolla", "One punch man");
