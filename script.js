const loader = document.getElementById("loader");
const imgContainer = document.getElementById("image-container");
let count = 1;

// Unsplash API
const APIKEY = "q81cuyaNzUDBa0siRgSN9iCPrI7Z7-CMe3TH0xi1EF4";
let url = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}`;

let isLoaded = false;
let imagesLoadedCounter = 0;
let totalImages = 0;
let photoArray = new Array();

// Managing imaging counter to set infinte scrolling
function imageLoaded() {
  imagesLoadedCounter++;
  if (imagesLoadedCounter === totalImages) {
    isLoaded = true;
    loader.hidden = true;
    count = 15;
    url = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${count}`;
  }
}

// Retrieving images form unsplash API
async function getPictures() {
  try {
    const response = await fetch(url);
    photoArray = await response.json();
    createPictureElement();
  } catch (err) {
    alert("something went wrong, try again in a few minutes");
  }
}

// Creatig new image and adding to the DOM
function createPictureElement() {
  imagesLoadedCounter = 0;
  totalImages = photoArray.length;
  photoArray.forEach((img) => {
    const item = document.createElement("a");
    item.setAttribute("href", img.links.html);
    item.setAttribute("target", "_blank");
    const newImageElement = document.createElement("img");
    newImageElement.src = img.urls.regular;
    newImageElement.alt = img.alt_description;
    newImageElement.title = img.alt_description;
    newImageElement.addEventListener("load", imageLoaded);

    item.appendChild(newImageElement);
    imgContainer.appendChild(item);
  });
}

//  Scrolling functionality
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isLoaded === true
  ) {
    isLoaded = false;
    getPictures();
  }
});

getPictures();
