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

let page = 1;
let nameSearch = "";
btnLoadMore.style.display = "none";
 

form.addEventListener("submit", onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();
  page = 1;
  nameSearch = event.target.elements.searchQuery.value.trim();
  
    divGallery.innerHTML = "";

    if (!nameSearch) {
        return;
    };
  
  try {
const response = await fetchTerm(nameSearch, page);
  const arrayPictures = createMarkupImg(response.hits);

  btnLoadMore.style.display = "block";
  divGallery.insertAdjacentHTML("beforeend", arrayPictures);

 if (response.hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      btnLoadMore.style.display = "none";
      return;
  };

  if (response.totalHits > 0) {
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
    return;
  };
  } catch (error) {
        console.log(error);
  };
  
//   fetchTerm(nameSearch, page).then(data => {
//     const arrayPictures = createMarkupImg(data.hits);
//     divGallery.insertAdjacentHTML("beforeend", arrayPictures);
//      btnLoadMore.style.display = "block";
// }).catch(error => console.log(error));
};


async function fetchTerm(name, page) {
const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
   console.log(response);
  return response.data;
};


function createMarkupImg(array) {
  return array.map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
  }) => `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>` ).join("");
};


btnLoadMore.addEventListener("click", onClick);

async function onClick() {
  page += 1;
  try {
const response = await fetchTerm(nameSearch, page);
  const arrayPictures = createMarkupImg(response.hits);
  divGallery.insertAdjacentHTML("beforeend", arrayPictures);

  if (response.hits.length === 0) {
    btnLoadMore.style.display = "none";
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    return;
  } 
  } catch (error) {
        console.log(error);
  };
  
  // fetchTerm(page).then(data => {
  //   const arrayPictures = createMarkupImg(data.hits);
  //   divGallery.insertAdjacentHTML('beforeend', arrayPictures);
  // if (data.hits > data.totalHits) {
  //   btnLoadMore.style.display = "none";
  //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  //   return;
  //   }
  // }).catch(error => console.log(error));
};


Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
});

