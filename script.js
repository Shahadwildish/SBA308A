// Import necessary functions from modules
import { fetchCatImage, fetchFoxImage, searchBreed } from './api.js';
import { saveFavorite, loadFavorites } from './favorites.js';

let showCats = true;

const animalImages = [
  document.getElementById('animal-image-1'),
  document.getElementById('animal-image-2'),
  document.getElementById('animal-image-3')
];
const newImageButton = document.getElementById('new-image-button');
const toggleAnimalButton = document.getElementById('toggle-animal-button');
const searchButton = document.getElementById('search-button');
const saveFavoriteButton = document.getElementById('save-favorite-button');
const searchBreedInput = document.getElementById('search-breed');

async function loadNewImages() {
  try {
    const fetchImage = showCats ? fetchCatImage : fetchFoxImage;
    const imageUrls = await Promise.all([fetchImage(), fetchImage(), fetchImage()]);
    imageUrls.forEach((url, index) => {
      fadeOutImage(animalImages[index], () => {
        animalImages[index].src = url;
        fadeInImage(animalImages[index]);
      });
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

async function handleSearch() {
  const breed = searchBreedInput.value;
  try {
    const imageUrl = await searchBreed(breed);
    fadeOutImage(animalImages[0], () => {
      animalImages[0].src = imageUrl;
      fadeInImage(animalImages[0]);
    });
  } catch (error) {
    console.error('Error searching breed:', error);
  }
}

function fadeOutImage(element, callback) {
  element.style.opacity = 0;
  setTimeout(() => {
    callback();
  }, 500); // Match the transition duration in CSS
}

function fadeInImage(element) {
  setTimeout(() => {
    element.style.opacity = 1;
  }, 50); // Small delay to ensure the src has changed
}

newImageButton.addEventListener('click', loadNewImages);

toggleAnimalButton.addEventListener('click', () => {
  showCats = !showCats;
  toggleAnimalButton.textContent = showCats ? 'Show Foxes' : 'Show Cats';
  loadNewImages();
});

searchButton.addEventListener('click', handleSearch);

saveFavoriteButton.addEventListener('click', () => {
  animalImages.forEach(image => saveFavorite(image.src));
});

document.addEventListener('DOMContentLoaded', loadFavorites);

// Load initial images
loadNewImages();
