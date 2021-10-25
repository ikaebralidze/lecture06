// --------------N1--------------

const getMovieAge = function (movie: string): void {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then((data) =>
      console.log(
        `Movie "${data.Title}" created  ${
          new Date().getFullYear() - data.Year
        } years ago`
      )
    );
};

getMovieAge("Avatar");

// --------------N2--------------

const getMovieActor = function (movie: string) {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then((data) => {
      let x: string = data.Actors.split(", ");
      for (const i of x) {
        console.log(i.split(" ")[0]);
      }
    });
};

getMovieActor("Madagascar");

// --------------N3--------------
function getMovieCountry(movie: string) {
  fetch(`http://www.omdbapi.com/?t=${movie}&apikey=9c23e035`)
    .then((res) => res.json())
    .then(function (x) {
      return fetch(`https://restcountries.com/v3.1/name/ ${x.Country}`);
    })
    .then((res) => res.json())
    .then((x: number) =>
      console.log(
        `Movie ${movie} is from ${x[0].name.common}, where currency is ${x[0].currencies.JPY.name}`
      )
    )
    .catch((err) => console.log(err));
}

getMovieCountry("one punch man");

// --------------N4--------------

const getJson = function (url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((x) => Number(x.Runtime.split(" ")[0]));
};

const moviesTimeSum = function (
  movie1: string,
  movie2: string,
  movie3: string
): void {
  Promise.all([
    getJson(`http://www.omdbapi.com/?t=${movie1}&apikey=9c23e035`).then(
      (y: number) => Number(y)
    ),

    getJson(`http://www.omdbapi.com/?t=${movie2}&apikey=9c23e035`).then(
      (z: number) => Number(z)
    ),

    getJson(`http://www.omdbapi.com/?t=${movie3}&apikey=9c23e035`).then(
      (x: number) => Number(x)
    ),
  ])
    .then((x: Array<number>) =>
      x.reduce((acc: number, curr: number) => (acc += curr))
    )
    .then((x: number) => console.log(`${Math.floor(x / 60)}:${x % 60}`));
};

moviesTimeSum("avatar", "madagascar", "one punch man");

// --------------N5--------------

const movieName = function (url: string): Promise<number> {
  return fetch(url)
    .then((res) => res.json())
    .then((x) => x.Country.split(", ")[0]);
};
const countryPpl = function (url: string): Promise<number> {
  return fetch(url)
    .then((x) => x.json())
    .then((y) => y[0].population);
};

const ppltotals = function (
  movie1: String,
  movie2: string,
  movie3: string
): void {
  Promise.all([
    movieName(`http://www.omdbapi.com/?t=${movie1}&apikey=9c23e035`).then(
      (x) => x
    ),

    movieName(`http://www.omdbapi.com/?t=${movie2}&apikey=9c23e035`).then(
      (x) => x
    ),

    movieName(`http://www.omdbapi.com/?t=${movie3}&apikey=9c23e035`).then(
      (x) => x
    ),
  ])
    .then((x) => {
      const arr = [...x];
      return arr;
    })
    .then((x: Array<number>) => {
      return Promise.all([
        countryPpl(`https://restcountries.com/v3.1/name/ ${x[0]}`),
        countryPpl(`https://restcountries.com/v3.1/name/ ${x[1]}`),
        countryPpl(`https://restcountries.com/v3.1/name/ ${x[2]}`),
      ]);
    })
    .then((x: Array<number>) =>
      x.reduce((acc: number, cur: number) => (acc += cur))
    )
    .then((x: number) => console.log(`total amount of population = ${x}`));
};

ppltotals("Avatar", "RocknRolla", "One punch man");
