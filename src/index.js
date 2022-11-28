import './css/styles.css'
import axios from "axios";



const form = document.querySelector('#search-form');
const makeGallery = document.querySelector('.gallery') 
const submitBtn = document.querySelector('button');
const loadBtn = document.querySelector('.load-more')
form.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoad)

loadBtn.setAttribute('hidden', true)

let searchValue = '';
let page = 1;

function onLoad(){
  page += 1
  axiosApi(searchValue, page).then(data => {
    makeGallery.insertAdjacentHTML('beforeend',creatMarkup(data.hits))
    if (data.hits.length < 39 ) {
      loadBtn.setAttribute('hidden', true)
    }
  })
};

 function onSearch(evt) {
     evt.preventDefault();
   searchValue = form.searchQuery.value
   if (searchValue === '') {
     makeGallery.innerHTML = ''
     console.log('not')
     loadBtn.setAttribute('hidden', true)
   } else {
     loadBtn.removeAttribute('hidden', true)
     axiosApi(searchValue).then(data => makeGallery.innerHTML = creatMarkup(data.hits)).catch(error => console.log(error.config))
   }
  
};

async function axiosApi(name, page = 1) {
    const response = await axios.get(`https://pixabay.com/api/?key=31616133-e43619194a5e3cbf561fcd52b&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    const data =  response.data;
    return data
};



function creatMarkup(arr) {
  
  return arr.map(item =>
    `<div class="photo-card">
   <a href="${item.largeImageURL}"></a>
   <div class="thumb">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
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
</div>`).join('');
    
  // makeGallery.insertAdjacentHTML('beforeend', markup);
  // makeGallery.innerHTML = markup
  
  // if (searchValue === '') {
  //   makeGallery.remove()
  // }

}

