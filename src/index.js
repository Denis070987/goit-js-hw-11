import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const makeGallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('button');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoad);

loadBtn.setAttribute('hidden', true);

let searchValue = '';
let page = 1;
let lightBox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 100,
});

function onLoad() {
  page += 1;
  axiosRequest(searchValue, page).then(data => {
    makeGallery.insertAdjacentHTML('beforeend', creatMarkup(data.hits)),
      lightBox.refresh();
    if (data.hits.length < 39) {
      Notiflix.Notify.info(
        'Were sorry, but youve reached the end of search results.'
      );
      loadBtn.setAttribute('hidden', true);
    }
  });
}

function onSearch(evt) {
  evt.preventDefault();
  lightBox.refresh();
  searchValue = form.searchQuery.value;
  axiosRequest(searchValue)
    .then(data => {
      if (!data.total || !searchValue) {
        loadBtn.setAttribute('hidden', true);
        Notiflix.Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        (makeGallery.innerHTML = creatMarkup(data.hits)),
          lightBox.refresh(),
          Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
      }
    })
    .catch(error => console.log(error.config));
}

async function axiosRequest(name, page = 1) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=31616133-e43619194a5e3cbf561fcd52b&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const data = response.data;
  return data;
}

function creatMarkup(arr) {
  loadBtn.removeAttribute('hidden', true);
  return arr
    .map(
      item =>
        `<div class="photo-card">
   <div class="thumb">
   <a href="${item.largeImageURL}">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>
      <span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><br>
      <span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><br>
      <span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><br>
      <span>${item.downloads}</span>
    </p>
    </div>
</div>`
    )
    .join('');
}
