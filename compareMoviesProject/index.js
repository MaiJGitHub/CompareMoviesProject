//movie data
import Chart from 'chart.js/auto';
import movies from "./movie-data.json";
let defaultMovies = movies;

//local Storage Section
const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.log(err);
  }
};

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalMovies = () => getLocalStorageKey("movie") || [];

const setLocalMovies = (newMovie) => setLocalStorageKey("movie", newMovie);

const addMovie = (newMovie) => {
  setLocalMovies([newMovie, ...getLocalMovies()]);
};

const resetMovies = () => {
  localStorage.clear();
};

const initMoviesIfEmpty = () => {
  if (!getLocalMovies().length) setLocalMovies(defaultMovies);
};

/*******DOM *******/

//display all movies
const listOfAllMovies = document.getElementById("listOfAllMovies");

//helper creating each li
const createMovieCards = (
  title,
  criticScore,
  audienceScore,
  domestic,
  genre
) => {
  const li = document.createElement("li");
  const h2Title = document.createElement("h2");
  const criticScoreInfo = document.createElement("p");
  const audienceScoreInfo = document.createElement("p");
  const domesticTotalInfo = document.createElement("p");
  const genreInfo = document.createElement("p");

  li.tabIndex = "0";
  h2Title.textContent = title;
  h2Title.id = "h2List";
  criticScoreInfo.textContent = `Critic Score: ${criticScore}`;
  audienceScoreInfo.textContent = `Audience Score: ${audienceScore}`;
  domesticTotalInfo.textContent = `Domestic Total: ${domestic}`;
  genreInfo.textContent = `Genre: ${genre}`;

  li.append(
    h2Title,
    criticScoreInfo,
    audienceScoreInfo,
    domesticTotalInfo,
    genreInfo
  );
    listOfAllMovies.append(li);
};

const showDefaultMovies = () => {
  defaultMovies.forEach((movies) => {
    createMovieCards(
      movies.title,
      movies.criticScore,
      movies.audienceScore,
      movies.domestic,
      movies.genre
    );
  });
};

showDefaultMovies();

//functional form, able to add movie

const form = document.getElementById("addMoviesForm");

const createNewMovie = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const { moiveTitle, CriticScore, AudienceScore, GrossSales, genre } =
    Object.fromEntries(formData);
  createMovieCards(moiveTitle, CriticScore, AudienceScore, GrossSales, genre);
  form.reset();
};

form.addEventListener("submit", createNewMovie);