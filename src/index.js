import './css/styles.css'
import axios from "axios";



const form = document.querySelector('#search-form');
// search.addEventListener('input')
const submitBtn = document.querySelector('button');

form.addEventListener('submit', onSearch);



 function onSearch(evt) {
     evt.preventDefault();
     const searchValue = form.searchQuery.value
     axiosApi(searchValue).then(data => console.log(data)).catch(err => console.log(err))
}

async function axiosApi(name) {
   
     const response = await axios.get(`https://pixabay.com/api/?key=31616133-e43619194a5e3cbf561fcd52b&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`);
    
    const data = await response.data;
    
    return data
}

function creatMarkup() {
   
}


