require('./styles/style.css');

const img = document.querySelector('img');
const btn = document.querySelector('button');
const inp = document.querySelector('input');
const div = document.querySelector('div');

const fetcher = function buttonFn() {
  fetch(
    'https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=dogs&weirdness=10',
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => {
      img.src = response.data.images.original.url;
      return response;
    })
    .catch((error) => {
      img.alt = `NO IMAGES ${error}`;
    });
};

const fetcherSearch = function searchFn() {
  const searchString = inp.value;

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${searchString}&limit=4`,
    { mode: 'cors' }
  )
    .then((response) => response.json())
    .then((response) => {
      div.textContent = '';
      const dataArray = response.data;

      if (dataArray.length === 0) {
        div.textContent = `NO IMAGES FOUND.`;
      } else {
        dataArray.forEach((arr) => {
          const imgNew = document.createElement('img');
          imgNew.src = arr.images.original.url;

          div.appendChild(imgNew);

          return response;
        });
      }
    })
    .catch((error) => {
      const imgNew = document.createElement('img');
      imgNew.alt = `[error] NO IMAGES FOUND ${error}`;
      div.appendChild(imgNew);
    });
};

btn.addEventListener('click', fetcher);
inp.addEventListener('change', fetcherSearch);
