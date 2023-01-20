import './css/styles.css';

import Notiflix from 'notiflix';
// console.log(Notiflix);

import axios from 'axios';
// console.log(axios);

const form = document.querySelector("#search-form");
const divGallery = document.querySelector(".gallery");
const btnLoadMore = document.querySelector(".load-more");

const KEY = "32997902-3b59b8944b64f8408d8a5fafd";
const BASE_URL = "https://pixabay.com/api/";

form.addEventListener("input", onSubmitForm);

function onSubmitForm(event) {
    event.preventDefault();
    const nameSearch = event.target.value.trim();

    divGallery.innerHTML = "";

    if (!nameSearch) {
        return;
    };

fetchTerm(nameSearch)

};


async function fetchTerm(name) {
    const page = 1;
try {
const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
   console.log(response);
    if (!response.ok) {
        throw new Error(response.statusText)
  };
    return await response.json();
    page += 1;
    
  } catch (error) {
    console.log(error);
  };
};

