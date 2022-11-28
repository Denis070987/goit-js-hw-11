import './css/styles.css'
import axios from "axios";



const form = document.querySelector('#search-form');
const makeGallery = document.querySelector('.gallery') 
const submitBtn = document.querySelector('button');

form.addEventListener('submit', onSearch);



 function onSearch(evt) {
     evt.preventDefault();
     const searchValue = form.searchQuery.value
     axiosApi(searchValue).then(data => creatMarkup(data.hits)).catch(error => {if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
     }
    console.log(error.config)})
}

async function axiosApi(name) {
    const response = await axios.get(`https://pixabay.com/api/?key=31616133-e43619194a5e3cbf561fcd52b&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`);
    const data =  response.data;
    return data
}

function creatMarkup(arr) {
    const markup = arr.map(item => 
        `<div class="photo-card">
   <a href="${item.largeImageURL}"></a>
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${item.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${item.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${item.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${item.downloads}</span>
    </p>
  </div>
</div>`).join('');
    
    makeGallery.innerHTML = markup
}


